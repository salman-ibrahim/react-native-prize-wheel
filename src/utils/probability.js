/**
 * Utility functions for probability-based reward selection
 */

/**
 * Select a reward based on probability weights
 * If no probabilities are specified, all rewards have equal chance
 */
export const selectRewardByProbability = (rewards) => {
  // Calculate total weight
  const totalWeight = rewards.reduce((sum, reward) => {
    const probability = reward.probability !== undefined ? reward.probability : 1;
    return sum + probability;
  }, 0);
  
  // If total weight is 0, all probabilities are 0 - select randomly
  if (totalWeight === 0) {
    const randomIndex = Math.floor(Math.random() * rewards.length);
    return {
      reward: rewards[randomIndex],
      index: randomIndex,
    };
  }
  
  // Generate random number between 0 and totalWeight
  const random = Math.random() * totalWeight;
  
  // Find the reward that corresponds to this random number
  let cumulativeWeight = 0;
  for (let i = 0; i < rewards.length; i++) {
    const reward = rewards[i];
    const probability = reward.probability !== undefined ? reward.probability : 1;
    cumulativeWeight += probability;
    
    if (random <= cumulativeWeight) {
      return {
        reward,
        index: i,
      };
    }
  }
  
  // Fallback (should never reach here)
  return {
    reward: rewards[0],
    index: 0,
  };
};

/**
 * Validate probability weights
 * Returns true if all probabilities are valid numbers >= 0
 */
export const validateProbabilities = (rewards) => {
  return rewards.every(reward => {
    if (reward.probability === undefined) return true;
    return typeof reward.probability === 'number' && reward.probability >= 0;
  });
};

/**
 * Normalize probabilities to sum to 1 (for display purposes)
 */
export const normalizeProbabilities = (rewards) => {
  const totalWeight = rewards.reduce((sum, reward) => {
    const probability = reward.probability !== undefined ? reward.probability : 1;
    return sum + probability;
  }, 0);
  
  // If total weight is 0, distribute equally
  if (totalWeight === 0) {
    return rewards.map(reward => ({
      ...reward,
      normalizedProbability: 1 / rewards.length,
    }));
  }
  
  return rewards.map(reward => {
    const probability = reward.probability !== undefined ? reward.probability : 1;
    return {
      ...reward,
      normalizedProbability: probability / totalWeight,
    };
  });
};

/**
 * Get probability percentage for display
 */
export const getProbabilityPercentage = (reward, rewards) => {
  const normalized = normalizeProbabilities(rewards);
  const found = normalized.find(r => r.id === reward.id);
  return found ? (found.normalizedProbability * 100).toFixed(2) : '0.00';
};
