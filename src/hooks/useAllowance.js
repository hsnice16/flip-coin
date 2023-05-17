import { useAccount, useContractRead } from "wagmi";
import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT, erc20ABI } from "../utils";

export function useAllowance() {
  const { address } = useAccount();

  console.log("address", address);

  const { data, error, isError, isSuccess, isLoading } = useContractRead({
    address: ERC_20_CONTRACT,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, COIN_FLIP_CONTRACT],
  });
  isError && console.log("contract-read-error-for-allowance", error);

  console.log("data", data);
  console.log("isSuccess", isSuccess);

  return {
    allowance: isSuccess ? data : undefined,
    isLoadingAllowance: isLoading,
  };
}
