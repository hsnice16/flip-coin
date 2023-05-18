import { useSigner } from "wagmi";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useState } from "react";
import { Contract, utils } from "ethers";

export function useFlipWrite() {
  const { data: signer } = useSigner();

  const [states, setStates] = useState({
    isError: false,
    error: "",
    isSuccess: false,
    isLoading: false,
  });

  const { isError, isSuccess, isLoading, error } = states;

  const flipWrite = async (amount, isTail) => {
    try {
      setStates((prevValue) => ({
        ...prevValue,
        isError: false,
        isSuccess: false,
        isLoading: true,
      }));

      const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, signer);
      const tx = await contract.flip(utils.parseEther(amount), isTail);
      await tx.wait();

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

  isError && console.log("contract-write-error-for-flip", error);
  return {
    flipWriteLoading: isLoading,
    flipWrite,
    flipWriteSuccess: isSuccess,
  };
}
