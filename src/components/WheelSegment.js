import React from 'react';
import { G, Path, Text as SvgText } from 'react-native-svg';
import { 
  createSegmentPath, 
  getTextPosition, 
  getSegmentAngle,
  degreesToRadians 
} from '../utils/calculations';
import { getContrastingTextColor } from '../utils/colors';

/**
 * WheelSegment - Renders a single segment of the wheel
 */
const WheelSegment = ({ 
  reward, 
  index, 
  totalSegments, 
  radius, 
  textColor, 
  textSize,
  centerX,
  centerY,
}) => {
  const segmentAngle = getSegmentAngle(totalSegments);
  const startAngle = index * segmentAngle - Math.PI / 2; // Start from top
  const endAngle = (index + 1) * segmentAngle - Math.PI / 2;
  
  // Generate path for this segment
  const path = createSegmentPath(centerX, centerY, radius, startAngle, endAngle);
  
  // Calculate text position
  const textPosition = getTextPosition(centerX, centerY, radius, startAngle, endAngle);
  
  // Determine text color
  const finalTextColor = reward.textColor || 
                         textColor || 
                         getContrastingTextColor(reward.color || '#FFFFFF');
  
  return (
    <G>
      {/* Segment background */}
      <Path
        d={path}
        fill={reward.color || '#CCCCCC'}
        stroke="none"
      />
      
      {/* Segment text */}
      <SvgText
        x={textPosition.x}
        y={textPosition.y}
        fill={finalTextColor}
        fontSize={textSize}
        fontWeight="700"
        textAnchor="middle"
        alignmentBaseline="middle"
        rotation={textPosition.angle}
        origin={`${textPosition.x}, ${textPosition.y}`}
      >
        {reward.label}
      </SvgText>
    </G>
  );
};

export default React.memo(WheelSegment);
