import { Button } from "../index";
import "./BetAmountCard.css";
import { isValidInputValue, COIN, MINIMUM_BET } from "../../utils";
import { useAllowance } from "../../hooks";
import { useAccount } from "wagmi";
import { useMemo, useState } from "react";

export function BetAmountCard({ isTail }) {
  const [error, setError] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [, setShowBetText] = useState(false);

  const { address } = useAccount();
  // const { allowance, isLoadingAllowance } = useAllowance();
  useAllowance();
  // const userMortyBalance = useUserMortyBalance();
  // const maxBet = useMaxBet();
  // const [startListeningEvent, setStartListeningEvent] = useState(false);

  // const { approveWrite, approveWriteLoading, approveWriteSuccess } =
  //   useApproveWrite(
  //     (Number(enteredAmount) - formatEther(allowance ?? 0)) * 10 ** 18
  //   );
  // const { flipWrite, flipWriteLoading, flipWriteReturn, flipWriteSuccess } =
  //   useFlipWrite(Number(enteredAmount) * 10 ** 18, isTail);

  const formattedProfitAmount = useMemo(() => {
    return Number((Number(enteredAmount) * 2).toFixed(0)).toLocaleString();
  }, [enteredAmount]);

  const approveBtnText = useMemo(
    () => {
      // if (
      //   isLoadingAllowance ||
      //   approveWriteLoading ||
      //   flipWriteLoading ||
      //   startListeningEvent
      // )
      //   return "Waiting...";

      // if (approveWriteSuccess || showBetText) return "Bet";

      return "Approve";
    },
    [
      // isLoadingAllowance,
      // approveWriteLoading,
      // approveWriteSuccess,
      // showBetText,
      // flipWriteLoading,
      // startListeningEvent,
    ]
  );

  // const flipCompletedListener = (log) => {
  //   setStartListeningEvent(false);
  //   setShowBetText(false);
  //   console.log("flipCompletedLog", log);
  // console.log("flipWriteReturn", flipWriteReturn);
  // };
  // const unsubscribe = useListenFlipCompletedEvent(flipCompletedListener);

  // useEffect(() => {
  //   return () => unsubscribe && unsubscribe();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (flipWriteSuccess && !flipWriteLoading) {
  //     setStartListeningEvent(true);
  //   }
  // }, [flipWriteSuccess, flipWriteLoading]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    error && setError("");

    if (isValidInputValue(value)) {
      setEnteredAmount(value);
    } else if (value === "") {
      setEnteredAmount("");
    }
  };

  const handleMaxClick = () => {
    error && setError("");

    // const maxValue = Math.max(
    //   formatEther(maxBet ?? 0),
    //   formatEther(userMortyBalance ?? 0)
    // );
    // setEnteredAmount(maxValue);
  };

  const handleApproveClick = () => {
    if (Number(enteredAmount) === 0) {
      setError("Enter some amount");
      return;
    }

    if (Number(enteredAmount) < MINIMUM_BET) {
      setError("Enter minimum bet amount");
      return;
    }

    // if (isLoadingAllowance === false && allowance === undefined) {
    //   setError("Issue in getting your allowance");
    //   return;
    // }

    // if (Number(enteredAmount) > formatEther(allowance)) {
    //   approveWrite?.();
    //   return;
    // }

    setShowBetText(true);
  };

  const handleBetClick = () => {
    // flipWrite?.();
  };

  return (
    <form
      className="bet-amount__card"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="amount-card__labels">
        <h2>{COIN} Bet</h2>
        <h3>Min bet: 100 000 000 {COIN}</h3>
        <label htmlFor="">Enter amount</label>
      </div>

      <div className="amount-card__input">
        <input type="text" value={enteredAmount} onChange={handleInputChange} />
        <button onClick={handleMaxClick}>MAX</button>
      </div>

      <div className="divider">
        <div />
        <span />
        <div />
      </div>

      <p className="profit-amount__container">
        <span>Profit:</span>
        <div>
          <span className="profit-amount">{formattedProfitAmount} </span>
          <span className="bruh-text">{COIN}</span>
        </div>
      </p>

      <span className="error-text">{error}</span>
      <Button
        className="btn-approve"
        onClick={approveBtnText === "Bet" ? handleBetClick : handleApproveClick}
        disabled={approveBtnText === "Waiting..." || !address}
      >
        {approveBtnText}
      </Button>
    </form>
  );
}
