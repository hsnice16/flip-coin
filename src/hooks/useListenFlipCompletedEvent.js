import { useContractEvent } from "wagmi";
import { coinFlipABI, COIN_FLIP_CONTRACT } from "../utils";

export function useListenFlipCompletedEvent(listener) {
  const unsubscribe = useContractEvent({
    address: COIN_FLIP_CONTRACT,
    abi: coinFlipABI,
    eventName: "FlipCompleted",
    listener,
  });

  return unsubscribe;
}
