import { useAccount, useProvider } from "wagmi";
import { ERC_20_CONTRACT, COIN_FLIP_CONTRACT, erc20ABI } from "../utils";
import { Contract } from "ethers";
import { useEffect } from "react";

export function useAllowance() {
  const { address } = useAccount();
  const provider = useProvider();

  console.log("address", address);

  useEffect(() => {
    (async () => {
      if (address && provider) {
        const contract = new Contract(ERC_20_CONTRACT, erc20ABI, provider);
        const allowance = await contract.allowance(address, COIN_FLIP_CONTRACT);
        console.log("allowance", allowance);
      }
    })();
  }, [address, provider]);

  // const { data, error, isError, isSuccess, isLoading } = useContractRead({
  //   address: ERC_20_CONTRACT,
  //   abi: erc20ABI,
  //   functionName: "allowance",
  //   args: [address, COIN_FLIP_CONTRACT],
  // });
  // isError && console.log("contract-read-error-for-allowance", error);

  // console.log("data", data);
  // console.log("isSuccess", isSuccess);

  // return {
  //   allowance: isSuccess ? data : undefined,
  //   isLoadingAllowance: isLoading,
  // };
}
