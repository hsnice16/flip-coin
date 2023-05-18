import { useAccount, useContractRead } from "wagmi";
import { ERC_20_CONTRACT, erc20ABI } from "../utils";

export function useUserMortyBalance() {
  const { address } = useAccount();

  const { data, isSuccess, isError, error } = useContractRead({
    address: ERC_20_CONTRACT,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address],
  });
  isError && console.log("contract-read-error-for-balanceOf", error);

  return isSuccess ? data : undefined;
}
