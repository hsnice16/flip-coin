import { Button } from "../index";
import "./BetAmountCard.css";
import { SpinningCoin } from "../../images";
import {
  isValidInputValue,
  formatEther,
  COIN,
  NEW_FLIP_INITIAL_VALUE,
  FLIP_COMPLETED_INITIAL_VALUE,
} from "../../utils";
import {
  useUserMortyBalance,
  useAllowance,
  useMaxBet,
  useFlipWrite,
  useApproveWrite,
  useListenFlipCompletedEvent,
  useListenNewFlipEvent,
  useCheckForPause,
  useMinBet,
  useGetRefundDelay,
  useGetRefundWrite,
  useGetPendingGameId,
} from "../../hooks";
import { useAccount } from "wagmi";
import { useMemo, useState, useEffect } from "react";

export function BetAmountCard({
  isTail,
  didWin,
  setDidWin,
  setSelectedCoin,
  refetch,
}) {
  const [error, setError] = useState("");
  const [showBetText, setShowBetText] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [isLastBetStillPending, setIsLastBetStillPending] = useState(false);
  const [checkingForPendingGameId, setCheckingForPendingGameId] =
    useState(true);

  const [flipCompleted, setFlipCompleted] = useState(
    FLIP_COMPLETED_INITIAL_VALUE
  );

  const [showRefundCard, setShowRefundCard] = useState(false);
  const [listeningEvents, setListeningEvents] = useState(false);
  const [newFlip, setNewFlip] = useState(NEW_FLIP_INITIAL_VALUE);
  const [pendingBetTimestamp, setPendingBetTimestamp] = useState(null);

  const maxBet = useMaxBet();
  const minBet = useMinBet();
  const MINIMUM_BET = minBet ? formatEther(minBet) : "...";
  const { address } = useAccount();
  const userMortyBalance = useUserMortyBalance();
  const { allowance, isLoadingAllowance } = useAllowance();

  const { pause } = useCheckForPause();
  const refundDelay = useGetRefundDelay();
  const { gameId, pendingNewFlip } = useGetPendingGameId(
    setCheckingForPendingGameId
  );

  const { approveWrite, approveWriteLoading, approveWriteSuccess } =
    useApproveWrite(
      (Number(enteredAmount) - Number(formatEther(allowance))) * 10 ** 18
    );

  const { getRefundWrite, getRefundWriteLoading, getRefundWriteSuccess } =
    useGetRefundWrite();
  const { flipWrite, flipWriteLoading, flipWriteSuccess } = useFlipWrite();

  const formattedProfitAmount = useMemo(() => {
    return Number((Number(enteredAmount) * 2).toFixed(0)).toLocaleString();
  }, [enteredAmount]);
  const formattedUserAmount = useMemo(() => {
    return userMortyBalance !== undefined
      ? Number(
          Number(formatEther(userMortyBalance)).toFixed(0)
        ).toLocaleString()
      : "...";
  }, [userMortyBalance]);

  const approveBtnText = useMemo(() => {
    if (listeningEvents || isLastBetStillPending) return "Checking...";

    if (isLoadingAllowance || approveWriteLoading || flipWriteLoading)
      return "Waiting...";

    if (approveWriteSuccess || showBetText) return "Bet";

    return "Approve";
  }, [
    isLastBetStillPending,
    approveWriteLoading,
    isLoadingAllowance,
    showBetText,
    listeningEvents,
    flipWriteLoading,
    approveWriteSuccess,
  ]);

  useListenNewFlipEvent(setNewFlip);
  useListenFlipCompletedEvent(setFlipCompleted);

  useEffect(() => {
    if (flipWriteSuccess && !flipWriteLoading) {
      setListeningEvents(true);
    }
  }, [flipWriteSuccess, flipWriteLoading]);

  useEffect(() => {
    if (getRefundWriteSuccess && !getRefundWriteLoading) {
      setShowRefundCard(false);
      setIsLastBetStillPending(false);
    }
  }, [getRefundWriteLoading, getRefundWriteSuccess]);

  useEffect(() => {
    if (newFlip.gameId && flipCompleted.gameId) {
      if (Number(newFlip.gameId) === Number(flipCompleted.gameId)) {
        setDidWin(flipCompleted.didWin);
        setListeningEvents(false);
        setPendingBetTimestamp(null);
        setIsLastBetStillPending(false);
        setCheckingForPendingGameId(false);
        refetch();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFlip.gameId, flipCompleted.gameId]);

  useEffect(() => {
    if (gameId && Number(gameId) !== 0 && checkingForPendingGameId) {
      setIsLastBetStillPending(true);
    }
  }, [gameId, checkingForPendingGameId]);

  useEffect(() => {
    if (gameId && Number(gameId) !== 0 && pendingNewFlip) {
      setSelectedCoin(pendingNewFlip.isTail ? "tail" : "head");
      setNewFlip({
        gameId: gameId,
        user: pendingNewFlip.user,
        isTail: pendingNewFlip.isTail,
        amount: pendingNewFlip.userBet,
      });
      setPendingBetTimestamp(pendingNewFlip.time);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, pendingNewFlip]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pendingBetTimestamp) {
        const diffBtwDatesInSec = Math.floor(
          (new Date() - new Date(pendingBetTimestamp * 1000)) / 1000
        );

        if (diffBtwDatesInSec >= refundDelay) {
          clearInterval(intervalId);
          setShowRefundCard(true);
          setPendingBetTimestamp(null);
          setIsLastBetStillPending(false);
        }
      }

      clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pendingBetTimestamp, refundDelay]);

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

    const maxBetInEth = formatEther(maxBet);
    const userMortyBalanceInEth = formatEther(userMortyBalance);

    if (Number(maxBetInEth) > Number(userMortyBalanceInEth)) {
      setEnteredAmount(userMortyBalanceInEth);
    } else {
      setEnteredAmount(maxBetInEth);
    }
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

    if (Number(enteredAmount) > Number(formatEther(maxBet))) {
      setError(`Not a Valid Bet. You can bet max ${formatEther(maxBet)}`);
      return;
    }

    if (Number(enteredAmount) > Number(formatEther(allowance))) {
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

  const handleGetRefundClick = async () => {
    getRefundWrite();
  };

  return (
    <form
      className="bet-amount__card"
      onSubmit={(event) => event.preventDefault()}
    >
      {pause && (
        <div className="pause">
          <h2>Under Construction</h2>
          <h3>Not taking any new Bets at the moment</h3>
        </div>
      )}

      <div
        className={`didWin-container ${
          approveBtnText !== "Checking..." ? "hide" : ""
        }`}
      >
        <div className="listening">
          <h2>
            {isLastBetStillPending
              ? "Last bet still pending..."
              : "Tossing the coin..."}
          </h2>
          {isLastBetStillPending && (
            <h3 className="pending-bet__amt">
              You bet for {formatEther(newFlip.amount)}
            </h3>
          )}
          <img
            className="spinning-coin"
            src={SpinningCoin}
            alt="spinning coin gif"
          />
        </div>
      </div>

      <div
        className={`didWin-container ${showRefundCard === false ? "hide" : ""}`}
      >
        <div className={`didWin-text__container ${didWin ? "win" : ""}`}>
          <h2>Oops!</h2>
          <h3>You can get your refund back</h3>
        </div>
        <Button className="btn-approve" onClick={handleGetRefundClick}>
          {getRefundWriteLoading ? "Refunding..." : "Get Refund"}
        </Button>
      </div>

      <div className={`didWin-container ${didWin === null ? "hide" : ""}`}>
        <div className={`didWin-text__container ${didWin ? "win" : ""}`}>
          <h2>You {didWin ? "Win" : "Lost"}</h2>
          {didWin && <h3>You will get the reward in your wallet</h3>}
        </div>
        <Button className="btn-approve" onClick={handleNewBetClick}>
          New Bet
        </Button>
      </div>

      <div className="amount-card__labels">
        <h2>{COIN} Bet</h2>
        <h3>
          Balance:
          <span>
            <span className="profit-amount">{formattedUserAmount}</span> {COIN}
          </span>
        </h3>
        <h3>
          Min bet:
          <span>
            <span className="profit-amount">{MINIMUM_BET}</span> {COIN}
          </span>
        </h3>
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
        disabled={
          approveBtnText === "Waiting..." ||
          !address ||
          pause ||
          (gameId && Number(gameId) !== 0) ||
          !minBet
        }
      >
        {approveBtnText}
      </Button>
    </form>
  );
}
