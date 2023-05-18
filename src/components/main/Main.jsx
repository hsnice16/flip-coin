import "./Main.css";
import { BetAmountCard, ChooseOneCoin, BetHistory } from "../index";
import { HowToPlayElement } from "../../elements";
import { useState } from "react";

export function Main() {
  const [selectedCoin, setSelectedCoin] = useState("bear");

  return (
    <main className="main-container">
      <div className="main-hero__image"></div>
      {HowToPlayElement}

      <div className="bet-input__container">
        <BetAmountCard isTail={selectedCoin === "tail"} />
        <ChooseOneCoin
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </div>

      <BetHistory />
    </main>
  );
}
