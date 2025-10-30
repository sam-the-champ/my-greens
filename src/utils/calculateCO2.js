export const emissionFactors = {
  food: 2.5,
  transportation: 0.21,
  energy: 0.4,
  shopping: 1.2,
};

const calculateCO2 = (category, quantity) => {
  const factor = emissionFactors[category];
  if (!factor || !quantity) return 0;
  return Number((quantity * factor).toFixed(2));
};

export default calculateCO2;
