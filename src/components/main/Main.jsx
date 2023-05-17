import { HeroImage } from "../../images";
import "./Main.css";
import { BetAmountCard, ChooseOneCoin, BetHistory } from "../index";
import { HowToPlayElement } from "../../elements";
import { useState } from "react";

export function Main() {
  const [selectedCoin, setSelectedCoin] = useState("bear");

  return (
    <main className="main-container">
      <HeroImage className="main-hero__image" width="100%" />
      {HowToPlayElement}

      <div className="bet-input__container">
        <BetAmountCard isTail={selectedCoin === "paw"} />
        <ChooseOneCoin
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </div>

      <BetHistory />
    </main>
  );
}
