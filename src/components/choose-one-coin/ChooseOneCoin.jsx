import "./ChooseOneCoin.css";
import { LeftCurly, RightCurly, ChooseCoin, EmptyCoin } from "../../images";

export function ChooseOneCoin({ selectedCoin, setSelectedCoin }) {
  return (
    <div className="choose-coin__card">
      <div>
        <h2 className="choose-coin__heading">
          <LeftCurly className="curly" />
          Choose one coin
          <RightCurly className="curly" />
        </h2>

        <div className="coin-option__container">
          <div>
            <button
              className={selectedCoin === "head" ? "active" : ""}
              onClick={() => setSelectedCoin("head")}
            >
              <div className="head-coin" />
            </button>
            <span>or</span>
            <button
              className={selectedCoin === "tail" ? "active" : ""}
              onClick={() => setSelectedCoin("tail")}
            >
              <div className="tail-coin" />
            </button>
          </div>
          <img
            className="empty-coin__img"
            src={EmptyCoin}
            alt="no coin selected"
          />
        </div>
      </div>

      <img
        className="choose-coin__img"
        src={ChooseCoin}
        alt="bruh choose coin"
      />
    </div>
  );
}
