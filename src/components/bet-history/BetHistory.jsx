import "./BetHistory.css";
import { sliceAddress, getTimeDurationToShow, formatEther } from "../../utils";
import { EmptyHistory } from "../../images";
import { useEffect, useState } from "react";

export function BetHistory({ data, isLoading }) {
  return (
    <div className="bet-history__container">
      <h3>Bet History</h3>

      <div className="history-info__container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Player</th>
              <th>Choice</th>
              <th className="number-col">Wager</th>
              <th className="number-col">Profit</th>
            </tr>
          </thead>

          <tbody>
            {(data ?? []).length ? (
              data.map((entry) => {
                const { gameId } = entry;
                return <TableRow key={formatEther(gameId)} entry={entry} />;
              })
            ) : (
              <div className="empty-history__msg">
                {isLoading ? (
                  "Getting the History..."
                ) : (
                  <>
                    <EmptyHistory />
                    No History
                  </>
                )}
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ entry }) {
  const { timestamp: blockTimestamp, didWin, isTail, player, amount } = entry;

  const formattedAmount = formatEther(amount);
  const wager = didWin
    ? Math.floor(Number(formattedAmount) / 2).toFixed(2)
    : Number(formattedAmount).toFixed(2);

  const [timeDurationToShow, setTimeDurationToShow] = useState(
    getTimeDurationToShow(blockTimestamp * 1000)
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimeDurationToShow(getTimeDurationToShow(blockTimestamp * 1000)),
      3000
    );

    return () => clearInterval(intervalId);
  }, [blockTimestamp]);

  return (
    <tr>
      <td>{timeDurationToShow}</td>
      <td className="address-col">{sliceAddress(player)}</td>
      <td>{isTail ? "Tails" : "Heads"}</td>
      <td className="number-col">{wager}</td>
      <td className={`number-col ${didWin ? "win" : "loss"}`}>
        {didWin ? "+" : "-"}
        {wager}
      </td>
    </tr>
  );
}
