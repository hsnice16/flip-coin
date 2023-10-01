import { ethers } from "ethers";

export function formatEther(value) {
  return ethers.utils.formatUnits(value ?? 0, 9);
}
