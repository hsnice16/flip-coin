import { useProvider } from "wagmi";
import { coinFlipABI, COIN_FLIP_CONTRACT } from "../utils";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

export function useListenFlipCompletedEvent(setFlipCompleted) {
  const provider = useProvider();
  const [removeListener, setRemoveListener] = useState();

  useEffect(() => {
    (async () => {
      const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, provider);
      contract.on(
        "FlipCompleted",
        (player, didWin, isTail, amount, gameId, event) => {
          setRemoveListener(event?.removeListener);
          setFlipCompleted((prevValue) => ({
            ...prevValue,
            gameId,
            isTail,
            player,
            didWin,
            amount,
          }));
        }
      );
    })();

    return () => {
      removeListener && removeListener();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);
}
