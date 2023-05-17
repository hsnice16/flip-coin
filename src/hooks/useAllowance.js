import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT } from "../utils";

export function useAllowance() {
  const { address } = useAccount();

  const { data, error, isError, isSuccess, isLoading } = useContractRead({
    address: ERC_20_CONTRACT,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, COIN_FLIP_CONTRACT],
  });
  isError && console.log("contract-read-error-for-allowance", error);

  return {
    allowance: isSuccess ? data : undefined,
    isLoadingAllowance: isLoading,
  };
}
