import { useSigner } from "wagmi";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useState } from "react";
import { Contract } from "ethers";

export function useGetRefundWrite() {
  const { data: signer } = useSigner();
  const [states, setStates] = useState({
    isSuccess: false,
    isLoading: false,
  });

  const { isLoading, isSuccess } = states;

  const getRefundWrite = async () => {
    try {
      setStates((prevValue) => ({
        ...prevValue,
        isLoading: true,
        isSuccess: false,
      }));

      const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, signer);
      const tx = await contract.getRefund();
      await tx.wait();

      setStates((prevValue) => ({
        ...prevValue,
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error) {
      setStates((prevValue) => ({ ...prevValue, isLoading: false }));

      console.log("contract-write-error-for-getRefund", error);
    }
  };

  return {
    getRefundWriteLoading: isLoading,
    getRefundWrite,
    getRefundWriteSuccess: isSuccess,
  };
}
