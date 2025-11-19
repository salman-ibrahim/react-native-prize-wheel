import React, { useMemo, useCallback, useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import WheelSegment from './WheelSegment';
import WheelCenter from './WheelCenter';
import WheelBoundary from './WheelBoundary';
import useWheelAnimation from '../hooks/useWheelAnimation';
import { generateSegmentColors } from '../utils/colors';
import { selectRewardByProbability, validateProbabilities } from '../utils/probability';

/**
 * WheelOfFortune - Main component
 * A highly customizable wheel of fortune component for React Native
 */
const WheelOfFortune = forwardRef(({
  // Required props
  rewards,
  onSpinEnd,
  
  // Optional - Winner selection
  winnerIndex = null, // Predetermined winner index (overrides probability)
  
  // Optional - Appearance
  size = 'auto',
  maxSize = 400,
  borderWidth = 0,
  borderColor = '#1A1A1A',
  textColor = '#000000',
  textSize = 16,
  
  // Optional - Behavior
  duration = 4000,
  
  // Optional - Boundary/Lights
  showBoundary = true,
  lightCount = 20,
  lightSize = 6,
  boundaryColor = '#2D3748',
  lightColor = '#FFD700',
  boundaryThickness = 12,
  boundaryOffset = 8,
  
  // Optional - Center interaction
  tapToSpin = true,
  centerBackgroundColor = '#FFFFFF',
  centerTextColor = '#000000',
  
  // Optional - Callbacks
  onSpinStart,
  onSpinning,
  disabled = false,
}, ref) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [containerSize, setContainerSize] = useState(maxSize);

  // Calculate actual size (adaptive or fixed)
  const actualSize = useMemo(() => {
    if (size === 'auto') {
      return Math.min(containerSize, maxSize); // Use container size, capped at maxSize
    }
    return size;
  }, [size, maxSize, containerSize]);

  // Handle container layout to get parent dimensions
  const handleLayout = useCallback((event) => {
    if (size === 'auto') {
      const { width, height } = event.nativeEvent.layout;
      const smallerDimension = Math.min(width, height);
      setContainerSize(smallerDimension);
    }
  }, [size]);

  // Validate rewards
  if (!rewards || rewards.length === 0) {
    console.error('WheelOfFortune: rewards prop is required and must not be empty');
    return null;
  }

  // Validate probabilities
  if (!validateProbabilities(rewards)) {
    console.error('WheelOfFortune: Invalid probability values detected');
  }

  // Generate colors for segments if not provided
  const rewardsWithColors = useMemo(() => {
    const colors = generateSegmentColors(rewards);
    return rewards.map((reward, index) => ({
      ...reward,
      color: reward.color || colors[index],
    }));
  }, [rewards]);

  // Handle spin start callback
  const handleSpinStart = useCallback(() => {
    setIsSpinning(true);

    if (onSpinStart) {
      onSpinStart();
    }
  }, [onSpinStart]);

  // Handle spin end callback
  const handleSpinEnd = useCallback((reward) => {
    setIsSpinning(false);

    if (onSpinEnd) {
      onSpinEnd(reward);
    }
  }, [onSpinEnd]);

  // Initialize animation hook
  const { spin, getRotationStyle, rotationValue } = useWheelAnimation({
    rewards: rewardsWithColors,
    duration,
    onSpinStart: handleSpinStart,
    onSpinEnd: handleSpinEnd,
    onSpinning,
  });

  // Handle spin trigger
  const handleSpin = useCallback(() => {
    if (disabled || isSpinning) {
      return;
    }

    // Use predetermined winner if provided, otherwise use probability
    let targetIndex;
    if (winnerIndex !== null && winnerIndex >= 0 && winnerIndex < rewardsWithColors.length) {
      targetIndex = winnerIndex;
    } else {
      // Fallback to probability-based selection
      const { index } = selectRewardByProbability(rewardsWithColors);
      targetIndex = index;
    }
    
    // Start spinning
    spin(targetIndex);
  }, [disabled, isSpinning, winnerIndex, rewardsWithColors, spin]);

  // Expose spin method to parent via ref
  useImperativeHandle(ref, () => ({
    spin: handleSpin,
  }), [handleSpin]);

  // Calculate dimensions
  const radius = (actualSize - borderWidth * 2) / 2;
  const centerX = actualSize / 2;
  const centerY = actualSize / 2;
  const centerSize = actualSize * 0.2;

  return (
    <View 
      style={[
        styles.container, 
        size === 'auto' 
          ? { width: '100%', aspectRatio: 1 } 
          : { width: actualSize, height: actualSize }
      ]}
      onLayout={handleLayout}
    >
      {/* Decorative boundary with lights - static, doesn't rotate */}
      {showBoundary && (
        <WheelBoundary
          size={actualSize}
          lightCount={lightCount}
          lightSize={lightSize}
          boundaryColor={boundaryColor}
          lightColor={lightColor}
          boundaryThickness={boundaryThickness}
          boundaryOffset={boundaryOffset}
        />
      )}
      
      {/* Pointer is now integrated into the center button - no separate pointer needed */}

      {/* Wheel */}
      <Animated.View style={[styles.wheelContainer, getRotationStyle(), {
      }]}>
        <Svg width={actualSize} height={actualSize}>
          {/* Border circle */}
          {borderWidth > 0 && (
            <Circle
              cx={centerX}
              cy={centerY}
              r={actualSize / 2 - borderWidth / 2}
              fill="none"
              stroke={borderColor}
              strokeWidth={borderWidth}
            />
          )}

          {/* Wheel segments */}
          <G>
            {rewardsWithColors.map((reward, index) => (
              <WheelSegment
                key={reward.id || index}
                reward={reward}
                index={index}
                totalSegments={rewardsWithColors.length}
                radius={radius}
                textColor={textColor}
                textSize={textSize}
                centerX={centerX}
                centerY={centerY}
              />
            ))}
          </G>
        </Svg>
      </Animated.View>

      {/* Center circle with pointer - always visible for design */}
      <WheelCenter
        size={centerSize}
        backgroundColor={centerBackgroundColor}
        textColor={centerTextColor}
        onPress={handleSpin}
        disabled={disabled || isSpinning}
        showText={tapToSpin}
        interactive={tapToSpin}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WheelOfFortune;
