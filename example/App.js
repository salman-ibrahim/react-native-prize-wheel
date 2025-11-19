import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import WheelOfFortune from '../src';

/**
 * Example App demonstrating the React Native Prize Wheel component
 */
export default function App() {
  const [canSpin, setCanSpin] = useState(true);
  const [lastWin, setLastWin] = useState(null);

  // Define rewards with different probabilities
  const rewards = [
    { 
      id: 1, 
      label: '100 Coins', 
      value: 100, 
      color: '#FFD700',
      probability: 2 
    },
    { 
      id: 2, 
      label: '50 Coins', 
      value: 50, 
      color: '#C0C0C0',
      probability: 3 
    },
    { 
      id: 3, 
      label: '200 Coins', 
      value: 200, 
      color: '#FF6B6B',
      probability: 1.5 
    },
    { 
      id: 4, 
      label: '10 Coins', 
      value: 10, 
      color: '#4ECDC4',
      probability: 4 
    },
    { 
      id: 5, 
      label: '500 Coins', 
      value: 500, 
      color: '#95E1D3',
      probability: 0.3 
    },
    { 
      id: 6, 
      label: 'Try Again', 
      value: 0, 
      color: '#F38181',
      probability: 2 
    },
    { 
      id: 7, 
      label: '25 Coins', 
      value: 25, 
      color: '#A8E6CF',
      probability: 3 
    },
    { 
      id: 8, 
      label: '75 Coins', 
      value: 75, 
      color: '#FFDAB9',
      probability: 2 
    },
  ];

  const handleSpinStart = () => {
    console.log('Spin started!');
  };

  const handleSpinEnd = (reward) => {
    console.log('Spin ended! Won:', reward);
    setLastWin(reward);
    setCanSpin(false);
    
    // Show alert with result
    Alert.alert(
      reward.value > 0 ? 'Congratulations! 🎉' : 'Try Again!',
      reward.value > 0 
        ? `You won ${reward.label}!` 
        : 'Better luck next time!',
      [
        {
          text: 'Spin Again',
          onPress: () => setCanSpin(true)
        }
      ]
    );
  };

  const handleSpinning = (angle) => {
    // Track spinning progress
    // console.log('Current angle:', angle);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Prize Wheel</Text>
          <Text style={styles.subtitle}>Example App</Text>
        </View>

        <View style={styles.wheelContainer}>
          <WheelOfFortune
            rewards={rewards}
            onSpinEnd={handleSpinEnd}
            onSpinStart={handleSpinStart}
            onSpinning={handleSpinning}
            size={350}
            borderWidth={12}
            borderColor="#2C3E50"
            backgroundColor="#ECF0F1"
            textSize={18}
            pointerStyle="triangle"
            pointerColor="#E74C3C"
            pointerSize={35}
            duration={4000}
            enableHaptic
            disabled={!canSpin}
          />
        </View>

        {lastWin && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Last Win: {lastWin.label}
            </Text>
          </View>
        )}

        {!canSpin && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Tap "Spin Again" in the alert to try again!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Simple Text component for the example
const Text = ({ style, children }) => {
  return <View style={style}><>{children}</></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  wheelContainer: {
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27AE60',
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E8F8F5',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#16A085',
    textAlign: 'center',
  },
});
