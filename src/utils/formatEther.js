import { ethers } from "ethers";

export function formatEther(value) {
  return ethers.utils.formatEther(value ?? 0);
}
