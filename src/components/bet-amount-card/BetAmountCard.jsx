import { Button } from "../index";
import "./BetAmountCard.css";
import {
  isValidInputValue,
  COIN,
  MINIMUM_BET,
  formatEther,
  FLIP_COMPLETED_INITIAL_VALUE,
  NEW_FLIP_INITIAL_VALUE,
} from "../../utils";
import {
  useAllowance,
  useUserMortyBalance,
  useMaxBet,
  useApproveWrite,
  useFlipWrite,
  useListenFlipCompletedEvent,
  useListenNewFlipEvent,
  useInvalidateBetHistory,
} from "../../hooks";
import { useAccount } from "wagmi";
import { useMemo, useState, useEffect } from "react";

export function BetAmountCard({ isTail, didWin, setDidWin, setSelectedCoin }) {
  const [error, setError] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [showBetText, setShowBetText] = useState(false);

  const { address } = useAccount();
  const { allowance, isLoadingAllowance } = useAllowance();
  const userMortyBalance = useUserMortyBalance();
  const maxBet = useMaxBet();

  const [flipCompleted, setFlipCompleted] = useState(
    FLIP_COMPLETED_INITIAL_VALUE
  );
  const [newFlip, setNewFlip] = useState(NEW_FLIP_INITIAL_VALUE);

  const { approveWrite, approveWriteLoading, approveWriteSuccess } =
    useApproveWrite(
      (Number(enteredAmount) - formatEther(allowance ?? 0)) * 10 ** 18
    );
  const { flipWrite, flipWriteLoading, flipWriteSuccess } = useFlipWrite();
  const invalidateBetHistory = useInvalidateBetHistory();
  const [listeningEvents, setListeningEvents] = useState(false);

  const formattedProfitAmount = useMemo(() => {
    return Number((Number(enteredAmount) * 2).toFixed(0)).toLocaleString();
  }, [enteredAmount]);

  const approveBtnText = useMemo(() => {
    if (listeningEvents) return "Checking...";

    if (isLoadingAllowance || approveWriteLoading || flipWriteLoading)
      return "Waiting...";

    if (approveWriteSuccess || showBetText) return "Bet";

    return "Approve";
  }, [
    isLoadingAllowance,
    approveWriteLoading,
    approveWriteSuccess,
    showBetText,
    flipWriteLoading,
    listeningEvents,
  ]);

  useListenFlipCompletedEvent(setFlipCompleted);
  useListenNewFlipEvent(setNewFlip);

  useEffect(() => {
    if (flipWriteSuccess && !flipWriteLoading) {
      setListeningEvents(true);
    }
  }, [flipWriteSuccess, flipWriteLoading]);

  useEffect(() => {
    if (newFlip.gameId && flipCompleted.gameId) {
      if (Number(newFlip.gameId) === Number(flipCompleted.gameId)) {
        setDidWin(flipCompleted.didWin);
        setListeningEvents(false);
        invalidateBetHistory();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFlip.gameId, flipCompleted.gameId]);

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

    const maxValue = Math.max(
      formatEther(maxBet ?? 0),
      formatEther(userMortyBalance ?? 0)
    );
    setEnteredAmount(maxValue.toFixed(2));
  };

  const handleApproveClick = async () => {
    if (Number(enteredAmount) === 0) {
      setError("Enter some amount");
      return;
    }

    if (Number(enteredAmount) < MINIMUM_BET) {
      setError("Enter minimum bet amount");
      return;
    }

    if (isLoadingAllowance === false && allowance === undefined) {
      setError("Issue in getting your allowance");
      return;
    }

    if (Number(maxBet) === 0) {
      setError(
        "There is no balance in the contract at the moment. No betting."
      );
      return;
    }

    if (Number(enteredAmount) > formatEther(maxBet)) {
      setError(
        `Not a Valid Bet. You can bet max ${Number(formatEther(maxBet)).toFixed(
          2
        )}`
      );
      return;
    }

    if (Number(enteredAmount) > formatEther(allowance)) {
      await approveWrite(enteredAmount);
      return;
    }

    setShowBetText(true);
  };

  const handleBetClick = async () => {
    await flipWrite(enteredAmount, isTail);
  };

  const handleNewBetClick = () => {
    setShowBetText(false);
    setDidWin(null);
    setNewFlip(NEW_FLIP_INITIAL_VALUE);
    setFlipCompleted(FLIP_COMPLETED_INITIAL_VALUE);
    setSelectedCoin("head");
    setEnteredAmount("");
  };

  return (
    <form
      className="bet-amount__card"
      onSubmit={(event) => event.preventDefault()}
    >
      <div
        className={`didWin-container ${
          approveBtnText !== "Checking..." ? "hide" : ""
        }`}
      >
        <div className="listening">
          <h2>Checking...</h2>
          <h3>🤞</h3>
        </div>
      </div>

      <div className={`didWin-container ${didWin === null ? "hide" : ""}`}>
        <div className={`didWin-text__container ${didWin ? "win" : ""}`}>
          <h2>You {didWin ? "Win" : "Loss"}</h2>
          {didWin && <h3>You will get the reward in your wallet</h3>}
        </div>
        <Button className="btn-approve" onClick={handleNewBetClick}>
          New Bet
        </Button>
      </div>

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
