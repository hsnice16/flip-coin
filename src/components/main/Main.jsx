import { HeroImage, StepNumBg } from "../../images";
import "./Main.css";
import { BetAmountCard, ChooseOneCoin, BetHistory } from "../index";

const HowToPlayElement = (
  <div className="main-play__steps">
    <h1>How To Play</h1>
    <div className="play-steps__container">
      <div className="play-step one">
        <span>
          1
          <StepNumBg className="step-num__svg" />
        </span>
        <p>Choose heads or tails</p>
      </div>

      <div className="play-step">
        <span>
          2
          <StepNumBg className="step-num__svg" />
        </span>
        <p>Enter the amount of BRUH you want to bet</p>
      </div>

      <div className="play-step">
        <span>
          3
          <StepNumBg className="step-num__svg" />
        </span>
        <p>Approve BRUH</p>
      </div>

      <div className="play-step four">
        <span>
          4
          <StepNumBg className="step-num__svg" />
        </span>
        <p>Send a transaction</p>
      </div>

      <div className="play-step">
        <span>
          5
          <StepNumBg className="step-num__svg" />
        </span>
        <p>Receive your BRUH prize if you win</p>
      </div>
    </div>
  </div>
);

export function Main() {
  return (
    <main className="main-container">
      <HeroImage className="main-hero__image" width="100%" />
      {HowToPlayElement}

      <div className="bet-input__container">
        <BetAmountCard />
        <ChooseOneCoin />
      </div>

      <BetHistory />
    </main>
  );
}
