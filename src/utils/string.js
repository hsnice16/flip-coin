export function sliceAddress(
  address,
  visibleFrontLetters = 6,
  visibleLastLetters = 4
) {
  if (address && address.length <= visibleFrontLetters + visibleLastLetters)
    return address;
  return (
    address.slice(0, visibleFrontLetters) +
    "..." +
    address.slice(address.length - visibleLastLetters, address.length)
  );
}
