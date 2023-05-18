import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useEffect } from "react";
import { useProvider } from "wagmi";
import { Contract } from "ethers";

export function useGetHistory() {
  const provider = useProvider();

  useEffect(() => {
    (async () => {
      const contract = new Contract(COIN_FLIP_CONTRACT, coinFlipABI, provider);
      const filter = contract.filters.FlipCompleted;
      const events = await contract.queryFilter(filter, -25);
      console.log("history", events);
    })();
  }, [provider]);
}
