import { useContractRead } from "wagmi";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";

export function useMaxBet() {
  const { data, error, isError, isSuccess } = useContractRead({
    address: COIN_FLIP_CONTRACT,
    abi: coinFlipABI,
    functionName: "maxBet",
  });
  // isError && console.log("contract-read-error-maxBet", error);

  return isSuccess ? data : undefined;
}
