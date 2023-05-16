export function isValidInputValue(value) {
  return /^\d*\.?\d*$/.test(value);
}
