import "./ChooseOneCoin.css";
import {
  LeftCurly,
  RightCurly,
  ChooseCoin,
  EmptyCoin,
  Head,
  Tail,
} from "../../images";
import { useMemo } from "react";

export function ChooseOneCoin({ selectedCoin, setSelectedCoin, didWin }) {
  const emptyCoinSrc = useMemo(() => {
    if (didWin && selectedCoin === "head") return Head;

    if (didWin && selectedCoin === "tail") return Tail;

    if (didWin === false && selectedCoin === "head") return Tail;

    if (didWin === false && selectedCoin === "tail") return Head;

    return EmptyCoin;
  }, [didWin, selectedCoin]);

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
              onClick={
                didWin === null ? () => setSelectedCoin("head") : () => {}
              }
            >
              <div className="head-coin" />
            </button>
            <span>or</span>
            <button
              className={selectedCoin === "tail" ? "active" : ""}
              onClick={
                didWin === null ? () => setSelectedCoin("tail") : () => {}
              }
            >
              <div className="tail-coin" />
            </button>
          </div>
          <img
            className="empty-coin__img"
            src={emptyCoinSrc}
            alt="no coin selected"
          />
        </div>
      </div>

      <img className="choose-coin__img" src={ChooseCoin} alt="choose coin" />
    </div>
  );
}
