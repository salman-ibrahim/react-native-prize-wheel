import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Svg, { Circle, Text as SvgText, Polygon } from 'react-native-svg';

/**
 * WheelCenter - Renders the center button/circle of the wheel with integrated pointer
 */
const WheelCenter = ({ 
  size = 60, 
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
  onPress, 
  disabled = false,
  showText = true,
  interactive = true,
}) => {
  const pointerHeight = size * 0.4; // Pointer extends upward
  const pointerWidth = size * 0.3;
  
  const content = (
    <>
      {/* Pointer - absolutely positioned behind the circle */}
      <Svg 
        width={pointerWidth} 
        height={pointerHeight}
        style={{
          position: 'absolute',
          top: -pointerHeight + 5, // Extends upward, slightly overlapping circle
          left: (size - pointerWidth) / 2,
          zIndex: 0,
        }}
      >
        <Polygon
          points={`${pointerWidth / 2},0 0,${pointerHeight} ${pointerWidth},${pointerHeight}`}
          fill={backgroundColor}
          stroke="none"
        />
      </Svg>
      
      {/* Center circle - on top of pointer */}
      <Svg 
        width={size} 
        height={size}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
          zIndex: 1,
        }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={backgroundColor}
          stroke="none"
        />
        
        {/* Optional text */}
        {showText && (
          <SvgText
            x={size / 2}
            y={size / 2}
            fill={textColor}
            fontSize={size * 0.28}
            fontWeight="700"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {disabled ? 'WAIT' : 'SPIN'}
          </SvgText>
        )}
      </Svg>
    </>
  );
  
  // If interactive, wrap in TouchableOpacity
  if (interactive) {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {content}
      </TouchableOpacity>
    );
  }
  
  // Otherwise, just a View (non-interactive)
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default React.memo(WheelCenter);
