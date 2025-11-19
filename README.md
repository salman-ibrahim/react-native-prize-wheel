# React Native Prize Wheel 🎡

A highly customizable, performant, and visually appealing wheel of fortune component for React Native applications. Perfect for games, promotions, and interactive experiences.

## Features ✨

- 🎨 **Fully Customizable** - Colors, sizes, text, and more
- 🎯 **Flexible Winner Selection** - Probability-based OR predetermined winner
- 🎮 **External Control** - Trigger spins from external buttons via ref
- 💡 **Decorative Boundary** - Optional lights/boundary around wheel
- 📱 **Cross-Platform** - Works on iOS, Android, and Web (via Expo)
- ⚡ **Performant** - Smooth 60 FPS animations using native driver
- 📦 **Lightweight** - Minimal dependencies
- 🎭 **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install react-native-prize-wheel
# or
yarn add react-native-prize-wheel
```

### Peer Dependencies

This package requires `react-native-svg`:

```bash
npm install react-native-svg
# or
yarn add react-native-svg
```

For Expo projects:
```bash
expo install react-native-svg
```

## Basic Usage

```jsx
import React from 'react';
import { View } from 'react-native';
import WheelOfFortune from 'react-native-prize-wheel';

const rewards = [
  { id: 1, label: '100 Coins', value: 100, color: '#FFD700' },
  { id: 2, label: '50 Coins', value: 50, color: '#C0C0C0' },
  { id: 3, label: '200 Coins', value: 200, color: '#FF6B6B' },
  { id: 4, label: '10 Coins', value: 10, color: '#4ECDC4' },
  { id: 5, label: '500 Coins', value: 500, color: '#95E1D3' },
  { id: 6, label: 'Try Again', value: 0, color: '#F38181' },
];

function App() {
  const handleSpinEnd = (reward) => {
    console.log('Won:', reward);
    alert(`You won ${reward.label}!`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WheelOfFortune
        rewards={rewards}
        onSpinEnd={handleSpinEnd}
      />
    </View>
  );
}

export default App;
```

## Advanced Usage

### With Probability Weights

```jsx
const rewards = [
  { id: 1, label: '100 Coins', value: 100, probability: 2 },    // 2x more likely
  { id: 2, label: '50 Coins', value: 50, probability: 3 },      // 3x more likely
  { id: 3, label: '500 Coins', value: 500, probability: 0.5 },  // Rare (0.5x)
  { id: 4, label: '10 Coins', value: 10, probability: 4 },      // 4x more likely
];

<WheelOfFortune
  rewards={rewards}
  onSpinEnd={handleSpinEnd}
/>
```

### With Adaptive Sizing (Recommended)

The wheel automatically fills its parent container width and maintains a 1:1 aspect ratio:

```jsx
<View style={{ width: '80%' }}>
  <WheelOfFortune
    rewards={rewards}
    onSpinEnd={handleSpinEnd}
    // size="auto" is default - fills parent width with square aspect ratio
    // maxSize={400} is default - prevents wheel from being too large
  />
</View>
```

Or set a fixed size:

```jsx
<WheelOfFortune
  rewards={rewards}
  onSpinEnd={handleSpinEnd}
  size={300}  // Fixed 300x300 pixels
/>
```

### With Predetermined Winner (Server-Controlled)

```jsx
const [winnerIndex, setWinnerIndex] = useState(null);

// Fetch winner from backend
const fetchWinner = async () => {
  const response = await api.getSpinWinner();
  setWinnerIndex(response.winnerIndex); // 0 = first reward, 1 = second, etc.
};

<WheelOfFortune
  rewards={rewards}
  onSpinEnd={handleSpinEnd}
  winnerIndex={winnerIndex}  // Overrides probability
/>
```

### With External Spin Button

```jsx
import { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const wheelRef = useRef(null);

<WheelOfFortune
  ref={wheelRef}
  rewards={rewards}
  onSpinEnd={handleSpinEnd}
  tapToSpin={false}  // Disable tap-to-spin, use external button
/>

<TouchableOpacity onPress={() => wheelRef.current?.spin()}>
  <Text>Spin the Wheel!</Text>
</TouchableOpacity>
```

### Custom Styling

```jsx
<WheelOfFortune
  rewards={rewards}
  onSpinEnd={handleSpinEnd}
  size={400}
  borderWidth={15}
  borderColor="#2C3E50"
  textSize={18}
  textColor="#FFFFFF"
  duration={5000}
  centerBackgroundColor="#E74C3C"
  centerTextColor="#FFFFFF"
  showBoundary={true}
  lightCount={24}
  lightColor="#FFD700"
/>
```

### With Callbacks

```jsx
<WheelOfFortune
  rewards={rewards}
  onSpinEnd={(reward) => {
    console.log('Spin ended:', reward);
    // Update user balance, show modal, etc.
  }}
  onSpinStart={() => {
    console.log('Spin started!');
    // Disable other UI elements, play sound, etc.
  }}
  onSpinning={(angle) => {
    console.log('Current angle:', angle);
    // Track spinning progress
  }}
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `rewards` | `Reward[]` | Array of reward objects |
| `onSpinEnd` | `(reward: Reward) => void` | Callback when spin completes |

### Optional Props - Winner Selection

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `winnerIndex` | `number \| null` | `null` | Predetermined winner index (0-based). Overrides probability when set. |

### Optional Props - Appearance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| 'auto'` | `'auto'` | Wheel diameter in pixels, or `'auto'` to fill parent width (maintains 1:1 aspect ratio) |
| `maxSize` | `number` | `400` | Maximum size when using `size='auto'` |
| `borderWidth` | `number` | `0` | Border thickness around wheel |
| `borderColor` | `string` | `'#1A1A1A'` | Border color around wheel |
| `textColor` | `string` | `'#000000'` | Default text color for segments |
| `textSize` | `number` | `16` | Font size for segment text |

### Optional Props - Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `4000` | Spin duration in milliseconds |
| `disabled` | `boolean` | `false` | Disable spinning |

### Optional Props - Boundary/Lights

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showBoundary` | `boolean` | `true` | Show decorative boundary with lights |
| `lightCount` | `number` | `20` | Number of lights around boundary |
| `lightSize` | `number` | `6` | Size of each light |
| `boundaryColor` | `string` | `'#2D3748'` | Color of boundary ring |
| `lightColor` | `string` | `'#FFD700'` | Color of lights |
| `boundaryThickness` | `number` | `12` | Thickness of boundary ring |
| `boundaryOffset` | `number` | `8` | Space between wheel and boundary |

### Optional Props - Center Interaction

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tapToSpin` | `boolean` | `true` | Enable tap-to-spin on center. Set to `false` when using external button. |
| `centerBackgroundColor` | `string` | `'#FFFFFF'` | Background color of center circle |
| `centerTextColor` | `string` | `'#000000'` | Text color of center ("SPIN"/"WAIT") |

### Optional Props - Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onSpinStart` | `() => void` | Called when spin starts |
| `onSpinning` | `(angle: number) => void` | Called during spinning with current angle |

## Reward Object

```typescript
interface Reward {
  id: string | number;        // Unique identifier
  label: string;              // Display text on segment
  value: any;                 // Reward value (coins, items, etc.)
  color?: string;             // Segment color (auto-generated if not provided)
  textColor?: string;         // Override default text color
  icon?: ReactNode;           // Optional icon/image (future feature)
  probability?: number;       // Weight for winning (default: 1). Ignored if winnerIndex is set.
}
```

## Ref Methods

When using `ref`, the following methods are available:

```typescript
interface WheelOfFortuneRef {
  spin: () => void;  // Trigger a spin programmatically
}
```

## Examples

### Disable After Spin

```jsx
const [canSpin, setCanSpin] = useState(true);

<WheelOfFortune
  rewards={rewards}
  onSpinEnd={(reward) => {
    handleReward(reward);
    setCanSpin(false);
    // Re-enable after cooldown
    setTimeout(() => setCanSpin(true), 60000);
  }}
  disabled={!canSpin}
/>
```

## Advanced: Custom Implementation

You can use the exported utilities and hooks to build custom wheel implementations:

```jsx
import { 
  useWheelAnimation, 
  WheelSegment, 
  selectRewardByProbability 
} from 'react-native-prize-wheel';

// Build your custom wheel component
```

## Performance Tips

1. Use `useMemo` for rewards array if it's dynamically generated
2. Keep reward count reasonable (6-12 segments optimal)
3. Use `useNativeDriver: true` (enabled by default)
4. Avoid heavy computations in callbacks

## Troubleshooting

### Wheel not rendering
- Ensure `react-native-svg` is installed
- Check that rewards array is not empty
- Verify all required props are provided

### Animation not smooth
- Ensure `useNativeDriver: true` is enabled (default)
- Reduce wheel size if on low-end devices
- Check for heavy operations in callbacks


## Contributing

Contributions are welcome! Please open an issue or submit a PR.

## License

MIT

