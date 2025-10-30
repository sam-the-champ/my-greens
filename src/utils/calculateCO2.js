// src/utils/calculateCO2.js

export const emissionFactors = {
  food: 2.5, // kg CO₂ per kg
  transportation: 0.21, // kg CO₂ per km
  energy: 0.4, // kg CO₂ per kWh or per hour (you decide)
  shopping: 1.2, // kg CO₂ per item or per kg (approx)
};

/**
 * Calculates CO₂ emission for an activity
 * @param {string} category - 'food' | 'transportation' | 'energy' | 'shopping'
 * @param {number} quantity
 * @returns {number} kg CO₂ (rounded to 2 decimals)
 */
export const calculateCO2 = (category, quantity) => {
  const factor = emissionFactors[category];
  if (!factor || !quantity) return 0;
  return Number((quantity * factor).toFixed(2));
};

/**
 * Convert total CO2 (kg) to a 1-100 score.
 * Lower CO2 => higher score.
 * maxCO2 = configurable: defines "worst" daily CO2
 */
export const calculateCarbonScore = (totalCO2, maxCO2 = 100) => {
  const capped = Math.max(0, totalCO2);
  const raw = 1 - capped / maxCO2; // 1 -> perfect, 0 -> worst
  const clamped = Math.max(0, Math.min(1, raw));
  // scale 1..100
  return Math.max(1, Math.round(clamped * 99) + 1);
};
