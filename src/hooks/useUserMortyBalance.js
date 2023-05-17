import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { ERC_20_CONTRACT } from "../utils";

export function useUserMortyBalance() {
  const { address } = useAccount();

  const { data, error, isError, isSuccess } = useContractRead({
    address: ERC_20_CONTRACT,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address],
  });
  // isError && console.log("contract-read-error-for-balanceOf", error);

  return isSuccess ? data : undefined;
}
