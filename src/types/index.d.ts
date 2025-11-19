import { ReactNode } from 'react';

export interface Reward {
  id: string | number;
  label: string;
  value: any;
  color?: string;
  textColor?: string;
  icon?: ReactNode;
  probability?: number;
}

export interface WheelOfFortuneProps {
  // Required
  rewards: Reward[];
  onSpinEnd: (reward: Reward) => void;
  
  // Optional - Winner selection
  winnerIndex?: number | null;
  
  // Optional - Appearance
  size?: number | 'auto';
  maxSize?: number;
  borderWidth?: number;
  borderColor?: string;
  textColor?: string;
  textSize?: number;
  
  // Optional - Behavior
  duration?: number;
  
  // Optional - Boundary/Lights
  showBoundary?: boolean;
  lightCount?: number;
  lightSize?: number;
  boundaryColor?: string;
  lightColor?: string;
  boundaryThickness?: number;
  boundaryOffset?: number;
  
  // Optional - Center interaction
  tapToSpin?: boolean;
  centerBackgroundColor?: string;
  centerTextColor?: string;
  
  // Optional - Callbacks
  onSpinStart?: () => void;
  onSpinning?: (angle: number) => void;
  disabled?: boolean;
}

export interface WheelOfFortuneRef {
  spin: () => void;
}

export interface WheelSegmentProps {
  reward: Reward;
  index: number;
  totalSegments: number;
  radius: number;
  textColor: string;
  textSize: number;
  centerX: number;
  centerY: number;
}

export interface WheelCenterProps {
  size: number;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
  disabled: boolean;
  showText: boolean;
  interactive: boolean;
}
