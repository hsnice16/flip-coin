import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";

export function useFlipWrite(amount, isTail) {
  const { config } = usePrepareContractWrite({
    address: COIN_FLIP_CONTRACT,
    abi: coinFlipABI,
    functionName: "flip",
    args: [amount, isTail],
  });

  const { data, isLoading, write, isSuccess } = useContractWrite(config);
  // isError && console.log("contract-write-error-for-flip", error);

  return {
    flipWriteReturn: data,
    flipWriteLoading: isLoading,
    flipWrite: write,
    flipWriteSuccess: isSuccess,
  };
}
