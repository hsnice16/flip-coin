import "./Main.css";
import { BetAmountCard, ChooseOneCoin, BetHistory } from "../index";
import { HowToPlayElement } from "../../elements";
import { useState, useEffect } from "react";
import { useProvider } from "wagmi";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../../utils";
import { Contract } from "ethers";

export function Main() {
  const [selectedCoin, setSelectedCoin] = useState("head");
  const [didWin, setDidWin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const provider = useProvider();
  const [hasToCallAgain, setHasToCallAgain] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const contract = new Contract(
          COIN_FLIP_CONTRACT,
          coinFlipABI,
          provider
        );
        const _data = await contract.getLastFlipResults(20);
        setData([..._data]);
      } catch (error) {
        console.log("contract-read-error-for-getLastFlipResults", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [provider, hasToCallAgain]);

  return (
    <main className="main-container">
      <div className="main-hero__image"></div>
      {HowToPlayElement}

      <div className="bet-input__container">
        <BetAmountCard
          isTail={selectedCoin === "tail"}
          didWin={didWin}
          setDidWin={setDidWin}
          setSelectedCoin={setSelectedCoin}
          refetch={() => setHasToCallAgain((prev) => !prev)}
        />
        <ChooseOneCoin
          didWin={didWin}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </div>

      <BetHistory data={data} isLoading={isLoading} />
    </main>
  );
}
