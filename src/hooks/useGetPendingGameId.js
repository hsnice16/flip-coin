import { useAccount, useProvider } from "wagmi";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";

export function useGetPendingGameId(setCheckingForPendingGameId) {
  const provider = useProvider();
  const { address } = useAccount();

  const [states, setStates] = useState({ isSuccess: false, data: "" });
  const { isSuccess, data } = states;

  useEffect(() => {
    if (address && provider) {
      (async () => {
        try {
          setCheckingForPendingGameId(true);
          setStates((prevValue) => ({ ...prevValue, isSuccess: false }));

          const contract = new Contract(
            COIN_FLIP_CONTRACT,
            coinFlipABI,
            provider
          );
          const data = await contract.addressToFlip(address);

          setStates((prevValue) => ({ ...prevValue, isSuccess: true, data }));
        } catch (error) {
          console.log("contract-read-error-for-addressToFlip", error);
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, provider]);

  return isSuccess ? data : undefined;
}
