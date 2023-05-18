import { ethers } from "ethers";

export function formatEther(value) {
  return Number(ethers.utils.formatEther(value));
}
