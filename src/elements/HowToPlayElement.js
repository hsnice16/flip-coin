import { COIN } from "../utils";
import { StepNumBg } from "../images";

export const HowToPlayElement = (
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
        <p>Enter the amount of {COIN} you want to bet</p>
      </div>

      <div className="play-step">
        <span>
          3
          <StepNumBg className="step-num__svg" />
        </span>
        <p>Approve {COIN}</p>
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
        <p>Receive your {COIN} prize if you win</p>
      </div>
    </div>
  </div>
);
