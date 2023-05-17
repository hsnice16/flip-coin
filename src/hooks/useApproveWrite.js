import { useContractWrite, usePrepareContractWrite, erc20ABI } from "wagmi";
import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT } from "../utils";

export function useApproveWrite(amount) {
  const { config } = usePrepareContractWrite({
    address: ERC_20_CONTRACT,
    abi: erc20ABI,
    functionName: "approve",
    args: [COIN_FLIP_CONTRACT, amount],
  });
  const { isLoading, isSuccess, isError, error, write } =
    useContractWrite(config);
  isError && console.log("contract-write-error-for-approve", error);

  return {
    approveWriteLoading: isLoading,
    approveWriteSuccess: isSuccess,
    approveWrite: write,
  };
}
