import { useProvider } from "wagmi";
import { coinFlipABI, COIN_FLIP_CONTRACT } from "../utils";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

export function useListenNewFlipEvent(setNewFlip) {
  const provider = useProvider();
  const [removeListener, setRemoveListener] = useState();

  useEffect(() => {
    (async () => {
      const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, provider);
      contract.on("NewFlip", (user, amount, isTail, gameId, event) => {
        setRemoveListener(event?.removeListener);
        setNewFlip((prevValue) => ({
          ...prevValue,
          gameId,
          user,
          amount,
          isTail,
        }));
      });
    })();

    return () => {
      removeListener && removeListener();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);
}
