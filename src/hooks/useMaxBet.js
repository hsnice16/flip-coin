import { useProvider } from "wagmi";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useEffect, useState } from "react";
import { Contract } from "ethers";

export function useMaxBet() {
  const provider = useProvider();

  const [states, setStates] = useState({
    data: "",
    isSuccess: false,
    isError: false,
    error: "",
  });

  const { data, isError, isSuccess, error } = states;

  useEffect(() => {
    if (provider) {
      (async () => {
        try {
          setStates((prevValue) => ({
            ...prevValue,
            isError: false,
            isSuccess: false,
          }));

          const contract = new Contract(
            COIN_FLIP_CONTRACT,
            coinFlipABI,
            provider
          );
          const data = await contract.maxBet();

          setStates((prevValue) => ({ ...prevValue, isSuccess: true, data }));
        } catch (error) {
          setStates((prevValue) => ({ ...prevValue, isError: true, error }));
        }
      })();
    }
  }, [provider]);

  isError && console.log("contract-read-error-maxBet", error);
  return isSuccess ? data : undefined;
}
