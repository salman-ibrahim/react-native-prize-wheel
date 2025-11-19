/**
 * React Native Prize Wheel
 * A highly customizable, performant wheel of fortune component
 */

import WheelOfFortune from './components/WheelOfFortune';

// Export utilities for advanced usage
export { generateSegmentColors, getContrastingTextColor } from './utils/colors';
export { selectRewardByProbability, validateProbabilities } from './utils/probability';
export { calculateTargetAngle, getSegmentFromAngle } from './utils/calculations';

// Export hooks for custom implementations
export { default as useWheelAnimation } from './hooks/useWheelAnimation';

// Export sub-components for custom wheel implementations
export { default as WheelSegment } from './components/WheelSegment';
export { default as WheelCenter } from './components/WheelCenter';
export { default as WheelBoundary } from './components/WheelBoundary';

// Main export
export default WheelOfFortune;
