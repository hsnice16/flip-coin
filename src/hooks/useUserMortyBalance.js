import { useAccount, useProvider } from "wagmi";
import { ERC_20_CONTRACT, erc20ABI } from "../utils";
import { useEffect, useState } from "react";
import { Contract } from "ethers";

export function useUserMortyBalance() {
  const { address } = useAccount();
  const provider = useProvider();

  const [states, setStates] = useState({
    data: "",
    isSuccess: false,
    isError: false,
    error: "",
  });

  const { data, isError, isSuccess, error } = states;

  useEffect(() => {
    if (address && provider) {
    }
    (async () => {
      try {
        setStates((prevValue) => ({
          ...prevValue,
          isError: false,
          isSuccess: false,
        }));

        const contract = new Contract(ERC_20_CONTRACT, erc20ABI, provider);
        const data = await contract.balanceOf(address);

        setStates((prevValue) => ({ ...prevValue, isSuccess: true, data }));
      } catch (error) {
        setStates((prevValue) => ({ ...prevValue, isError: true, error }));
      }
    })();
  }, [address, provider]);

  isError && console.log("contract-read-error-for-balanceOf", error);
  return isSuccess ? data : undefined;
}
