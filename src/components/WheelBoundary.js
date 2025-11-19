import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

/**
 * WheelBoundary - Static decorative boundary with light bulbs around the wheel
 * Does not rotate - stays fixed while wheel spins
 */
const WheelBoundary = ({ 
  size = 400,
  lightCount = 24,
  lightSize = 8,
  boundaryColor = '#2D3748',
  lightColor = '#FFD700',
  boundaryThickness = 15,
  boundaryOffset = 10,
}) => {
  const lights = [];
  const boundaryRadius = size / 2 + boundaryOffset; // Compact boundary
  const totalSize = size + (boundaryOffset * 2) + (boundaryThickness * 2);
  const centerX = totalSize / 2;
  const centerY = totalSize / 2;
  
  // Create lights at equal distances around the boundary
  for (let i = 0; i < lightCount; i++) {
    const angle = (i * 2 * Math.PI) / lightCount - Math.PI / 2; // Start from top
    const x = centerX + boundaryRadius * Math.cos(angle);
    const y = centerY + boundaryRadius * Math.sin(angle);
    
    lights.push(
      <Circle
        key={`light-${i}`}
        cx={x}
        cy={y}
        r={lightSize}
        fill={`url(#lightGradient-${i})`}
      />
    );
  }

  return (
    <View style={[styles.container, { width: totalSize, height: totalSize }]}>
      <Svg width={totalSize} height={totalSize}>
        <Defs>
          {/* Gradient for glowing light effect */}
          {Array.from({ length: lightCount }).map((_, i) => (
            <RadialGradient
              key={`gradient-${i}`}
              id={`lightGradient-${i}`}
              cx="50%"
              cy="50%"
            >
              <Stop offset="0%" stopColor="#FFF" stopOpacity="1" />
              <Stop offset="40%" stopColor={lightColor} stopOpacity="1" />
              <Stop offset="100%" stopColor={lightColor} stopOpacity="0.3" />
            </RadialGradient>
          ))}
          
          {/* Inner shadow gradient for depth */}
          <RadialGradient
            id="innerShadow"
            cx="50%"
            cy="50%"
          >
            <Stop offset="0%" stopColor="#000" stopOpacity="0" />
            <Stop offset="85%" stopColor="#000" stopOpacity="0" />
            <Stop offset="95%" stopColor="#000" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#000" stopOpacity="0.5" />
          </RadialGradient>
        </Defs>
        
        {/* Main boundary ring */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={boundaryRadius}
          fill="none"
          stroke={boundaryColor}
          strokeWidth={boundaryThickness}
          opacity={0.8}
        />
        
        {/* Inner shadow circle - creates depth */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={boundaryRadius - boundaryThickness / 2}
          fill="url(#innerShadow)"
          stroke="none"
        />
        
        {/* Light bulbs - rendered on top */}
        {lights}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0, // Behind the wheel
  },
});

export default React.memo(WheelBoundary);
