import { useSigner } from "wagmi";
import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT, erc20ABI } from "../utils";
import { useState } from "react";
import { Contract, utils } from "ethers";

export function useApproveWrite(amount) {
  const { data: signer } = useSigner();
  const [states, setStates] = useState({
    isLoading: false,
    isSuccess: false,
  });

  const { isLoading, isSuccess } = states;

  const approveWrite = async (amount) => {
    try {
      setStates((prevValue) => ({
        ...prevValue,
        isSuccess: false,
        isLoading: true,
      }));

      const contract = new Contract(ERC_20_CONTRACT, erc20ABI, signer);
      const tx = await contract.approve(
        COIN_FLIP_CONTRACT,
        utils.parseEther(amount)
      );
      await tx.wait();

      setStates((prevValue) => ({
        ...prevValue,
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error) {
      setStates((prevValue) => ({
        ...prevValue,
        isLoading: false,
      }));

      console.log("contract-write-error-for-approve", error);
    }
  };

  return {
    approveWriteLoading: isLoading,
    approveWriteSuccess: isSuccess,
    approveWrite,
  };
}
