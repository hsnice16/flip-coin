import { useAccount, useProvider } from "wagmi";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";

export function useGetPendingGameId(setCheckingForPendingGameId) {
  const provider = useProvider();
  const { address } = useAccount();

  const [data, setData] = useState({});

  useEffect(() => {
    if (address && provider) {
      (async () => {
        try {
          setCheckingForPendingGameId(true);
          const contract = new Contract(
            COIN_FLIP_CONTRACT,
            coinFlipABI,
            provider
          );
          const gameId = await contract.addressToFlip(address);

          let pendingNewFlip;
          if (Number(gameId) !== 0) {
            pendingNewFlip = await contract.flipToAddress(gameId);
          }

          setData({
            gameId,
            pendingNewFlip,
          });
        } catch (error) {
          console.log("contract-read-error-for-addressToFlip", error);
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, provider]);

  return data;
}
