import { useSigner } from "wagmi";
import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT, erc20ABI } from "../utils";
import { useState } from "react";
import { Contract, utils } from "ethers";

export function useApproveWrite(amount) {
  const { data: signer } = useSigner();

  const [states, setStates] = useState({
    isError: false,
    isLoading: false,
    isSuccess: false,
    error: "",
  });

  const { isError, error, isLoading, isSuccess } = states;

  const approveWrite = async (amount) => {
    try {
      setStates((prevValue) => ({
        ...prevValue,
        isError: false,
        isSuccess: false,
        isLoading: true,
      }));

      const contract = new Contract(ERC_20_CONTRACT, erc20ABI, signer);
      await contract.approve(COIN_FLIP_CONTRACT, utils.parseEther(amount));

      setStates((prevValue) => ({
        ...prevValue,
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error) {
      setStates((prevValue) => ({
        ...prevValue,
        isError: true,
        error,
        isLoading: false,
      }));
    }
  };

  isError && console.log("contract-write-error-for-approve", error);
  return {
    approveWriteLoading: isLoading,
    approveWriteSuccess: isSuccess,
    approveWrite,
  };
}
