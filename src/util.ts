export const random_range = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
export const random_bool = (weight?: number) => {
  return random_range(0, weight ? weight : 2) < 1.0;
};
export const random_choice = <T>(optionA: T, option2: T, weight?: number): T => {
  return random_bool(weight) ? optionA : option2;
};
