import "./Main.css";
import { BetAmountCard, ChooseOneCoin, BetHistory } from "../index";
import { HowToPlayElement } from "../../elements";
import { useState } from "react";

export function Main() {
  const [selectedCoin, setSelectedCoin] = useState("head");
  const [didWin, setDidWin] = useState(null);

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
        />
        <ChooseOneCoin
          didWin={didWin}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </div>

      <BetHistory />
    </main>
  );
}
