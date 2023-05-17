import { formatEther as ether } from "viem";

export function formatEther(value) {
  return Number(ether(value));
}
