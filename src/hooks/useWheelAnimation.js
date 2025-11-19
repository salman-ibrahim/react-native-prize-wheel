import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { calculateTargetAngle, getSegmentFromAngle } from '../utils/calculations';

/**
 * Custom hook for managing wheel animation
 */
const useWheelAnimation = ({ 
  rewards, 
  duration = 4000, 
  onSpinStart, 
  onSpinEnd,
  onSpinning,
}) => {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const isSpinning = useRef(false);
  const currentRotation = useRef(0);

  /**
   * Start the wheel spin animation
   */
  const spin = useCallback((targetRewardIndex) => {
    if (isSpinning.current) {
      return;
    }

    isSpinning.current = true;
    
    // Callback for spin start
    if (onSpinStart) {
      onSpinStart();
    }

    // Get current rotation normalized to 0-360
    const currentAngle = currentRotation.current % 360;
    
    // Calculate segment angles
    const segmentAngle = 360 / rewards.length;
    
    // Work backwards from getSegmentFromAngle logic:
    // getSegmentFromAngle does: segmentIndex = floor((360 - angle) / segmentAngle)
    // We want: floor((360 - finalAngle) / segmentAngle) = targetRewardIndex
    // So: targetRewardIndex * segmentAngle <= (360 - finalAngle) < (targetRewardIndex + 1) * segmentAngle
    // Therefore: 360 - (targetRewardIndex + 1) * segmentAngle < finalAngle <= 360 - targetRewardIndex * segmentAngle
    
    // We want to land in the middle of the segment for clarity
    // Middle of range: finalAngle = 360 - (targetRewardIndex * segmentAngle + segmentAngle/2)
    const idealAngle = 360 - (targetRewardIndex * segmentAngle + segmentAngle / 2);
    
    // Add visual offset to position pointer clearly within segment (not on boundary)
    const visualOffset = segmentAngle * 0.15; // 15% into segment
    let targetFinalAngle = idealAngle + visualOffset;
    
    // Normalize to 0-360
    if (targetFinalAngle < 0) targetFinalAngle += 360;
    if (targetFinalAngle >= 360) targetFinalAngle -= 360;
    
    // Calculate how much to rotate from current position
    const minFullRotations = 5 * 360;
    let rotationNeeded = targetFinalAngle - currentAngle;
    
    // Ensure we rotate forward (clockwise)
    if (rotationNeeded <= 0) {
      rotationNeeded += 360;
    }
    
    // Add the minimum full rotations for effect
    const totalRotation = minFullRotations + rotationNeeded;
    
    // Set starting point
    rotationValue.setValue(currentRotation.current);

    // Set up animation listener for onSpinning callback
    let animationListener = null;
    if (onSpinning) {
      animationListener = rotationValue.addListener(({ value }) => {
        onSpinning(value);
      });
    }

    // Animate to target angle
    Animated.timing(rotationValue, {
      toValue: currentRotation.current + totalRotation,
      duration: duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        // Remove listener
        if (animationListener !== null) {
          rotationValue.removeListener(animationListener);
        }

        // Update current rotation
        currentRotation.current = currentRotation.current + totalRotation;
        
        // Calculate final segment
        const finalAngle = currentRotation.current % 360;
        const finalSegmentIndex = getSegmentFromAngle(finalAngle, rewards.length);
        
        // Callback for spin end
        if (onSpinEnd) {
          onSpinEnd(rewards[finalSegmentIndex]);
        }

        isSpinning.current = false;
      }
    });
  }, [rewards, duration, onSpinStart, onSpinEnd, onSpinning, rotationValue]);

  /**
   * Get interpolated rotation style
   */
  const getRotationStyle = useCallback(() => {
    return {
      transform: [
        {
          rotate: rotationValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    };
  }, [rotationValue]);

  /**
   * Check if wheel is currently spinning
   */
  const getIsSpinning = useCallback(() => {
    return isSpinning.current;
  }, []);

  /**
   * Reset wheel to initial position
   */
  const reset = useCallback(() => {
    rotationValue.setValue(0);
    currentRotation.current = 0;
    isSpinning.current = false;
  }, [rotationValue]);

  return {
    spin,
    getRotationStyle,
    getIsSpinning,
    reset,
    rotationValue,
  };
};

export default useWheelAnimation;
