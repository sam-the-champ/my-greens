// src/utils/calculateCO2.js

/**
 * Estimate CO₂ emissions based on category and quantity.
 * Emission factors are based on average global data (kg CO₂ per unit).
 */

export const emissionFactors = {
  food: 2.5, // kg CO₂ per kg of food
  transportation: 0.21, // kg CO₂ per km (average car)
  energy: 0.4, // kg CO₂ per kWh (electricity usage)
  shopping: 1.2, // kg CO₂ per item (approx)
};

/**
 * Calculates CO₂ emission for a given activity
 * @param {string} category - Activity category (food, transportation, energy, shopping)
 * @param {number} quantity - Quantity of activity
 * @returns {number} - Estimated CO₂ emission (in kg)
 */
export const calculateCO2 = (category, quantity) => {
  const factor = emissionFactors[category];
  if (!factor || !quantity) return 0;
  return Number((quantity * factor).toFixed(2));
};
