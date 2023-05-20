import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { useProvider } from "wagmi";

export function useGetRefundDelay() {
  const provider = useProvider();
  const [states, setStates] = useState({ isSuccess: false, data: "" });
  const { isSuccess, data } = states;

  useEffect(() => {
    if (provider) {
      (async () => {
        try {
          setStates((prevValue) => ({ ...prevValue, isSuccess: false }));

          const contract = new Contract(
            COIN_FLIP_CONTRACT,
            coinFlipABI,
            provider
          );
          const data = await contract.refundDelay();

          setStates((prevValue) => ({ ...prevValue, data, isSuccess: true }));
        } catch (error) {
          console.log("contract-read-error-for-refundDelay", error);
        }
      })();
    }
  }, [provider]);

  return isSuccess ? data : undefined;
}
