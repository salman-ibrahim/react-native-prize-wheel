/**
 * Utility functions for wheel calculations
 */

/**
 * Convert degrees to radians
 */
export const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

/**
 * Convert radians to degrees
 */
export const radiansToDegrees = (radians) => {
  return (radians * 180) / Math.PI;
};

/**
 * Calculate the angle for each segment
 */
export const getSegmentAngle = (totalSegments) => {
  return (2 * Math.PI) / totalSegments;
};

/**
 * Generate SVG path for a wheel segment
 */
export const createSegmentPath = (centerX, centerY, radius, startAngle, endAngle) => {
  const x1 = centerX + radius * Math.cos(startAngle);
  const y1 = centerY + radius * Math.sin(startAngle);
  const x2 = centerX + radius * Math.cos(endAngle);
  const y2 = centerY + radius * Math.sin(endAngle);

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return `
    M ${centerX} ${centerY}
    L ${x1} ${y1}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
    Z
  `;
};

/**
 * Calculate text position for a segment
 */
export const getTextPosition = (centerX, centerY, radius, startAngle, endAngle) => {
  const midAngle = (startAngle + endAngle) / 2;
  const textRadius = radius * 0.65; // Position text at 65% of radius
  
  return {
    x: centerX + textRadius * Math.cos(midAngle),
    y: centerY + textRadius * Math.sin(midAngle),
    angle: radiansToDegrees(midAngle),
  };
};

/**
 * Calculate the rotation angle needed to land on a specific segment
 * @deprecated This function is no longer used internally. Rotation calculation
 * is now done directly in useWheelAnimation hook for better accuracy.
 * Kept for backwards compatibility with custom implementations.
 */
export const calculateTargetAngle = (segmentIndex, totalSegments, extraSpins = 5) => {
  const segmentAngle = 360 / totalSegments;
  const segmentCenterAngle = segmentIndex * segmentAngle;
  const visualOffset = segmentAngle * 0.2;
  const fullRotations = extraSpins * 360;
  return fullRotations + segmentCenterAngle + visualOffset;
};

/**
 * Normalize angle to 0-360 range
 */
export const normalizeAngle = (angle) => {
  const normalized = angle % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

/**
 * Get the segment index based on current rotation angle
 * Pointer is at top (0 degrees), wheel rotates clockwise
 */
export const getSegmentFromAngle = (angle, totalSegments) => {
  const normalizedAngle = normalizeAngle(angle);
  const segmentAngle = 360 / totalSegments;
  
  // The wheel rotates, but the pointer stays at top
  // We need to find which segment is currently under the pointer
  // Since wheel rotates clockwise, we invert the angle
  const adjustedAngle = (360 - normalizedAngle) % 360;
  
  // Calculate which segment this angle falls into
  const segmentIndex = Math.floor(adjustedAngle / segmentAngle);
  
  return segmentIndex % totalSegments;
};
