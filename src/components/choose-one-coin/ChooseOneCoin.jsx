import "./ChooseOneCoin.css";
import {
  LeftCurly,
  RightCurly,
  BruhChooseCoin,
  EmptyCoin,
  BearCoin,
  PawCoin,
} from "../../images";

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
              className={selectedCoin === "bear" ? "active" : ""}
              onClick={() => setSelectedCoin("bear")}
            >
              <img src={BearCoin} alt="bear coin" />
            </button>
            <span>or</span>
            <button
              className={selectedCoin === "paw" ? "active" : ""}
              onClick={() => setSelectedCoin("paw")}
            >
              <img src={PawCoin} alt="paw coin" />
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
        src={BruhChooseCoin}
        alt="bruh choose coin"
      />
    </div>
  );
}
