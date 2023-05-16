import { Button } from "../index";
import "./BetAmountCard.css";
import { useState } from "react";
import { isValidInputValue } from "../../utils";

export function BetAmountCard() {
  const [enteredAmount, setEnteredAmount] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (isValidInputValue(value)) {
      setEnteredAmount(value);
    } else if (value === "") {
      setEnteredAmount("");
    }
  };

  return (
    <form
      className="bet-amount__card"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="amount-card__labels">
        <h2>BRUH Bet</h2>
        <h3>Min bet: 100 000 000 BRUH</h3>
        <label htmlFor="">Enter amount</label>
      </div>

      <div className="amount-card__input">
        <input type="text" value={enteredAmount} onChange={handleInputChange} />
        <button>MAX</button>
      </div>

      <div className="divider">
        <div />
        <span />
        <div />
      </div>

      <p className="profit-amount__container">
        <span>Profit:</span>
        <div>
          <span className="profit-amount">
            {Number((Number(enteredAmount) * 2).toFixed(0)).toLocaleString()}{" "}
          </span>
          <span className="bruh-text">BRUH</span>
        </div>
      </p>

      <Button className="btn-approve">Approve</Button>
    </form>
  );
}
