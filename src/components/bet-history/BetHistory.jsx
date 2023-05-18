import "./BetHistory.css";
import { sliceAddress } from "../../utils";
import { EmptyHistory } from "../../images";

// const history = [];

const history = new Array(35).fill({
  time: "5 minutes ago",
  player: "0x49EFeE36a95f783165A240E7205FF01d9577f79E",
  wager: "0.75",
  choice: "Tails",
  streak: "2 win",
  profit: "-0.75",
});

export function BetHistory() {
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
              <th className="number-col">Streak</th>
              <th className="number-col">Profit</th>
            </tr>
          </thead>

          <tbody>
            {history.length ? (
              history.map((value, index) => {
                const inWin = value.streak.toLowerCase().includes("win");

                return (
                  <tr key={value.player + "-" + index}>
                    <td>{value.time}</td>
                    <td className="address-col">
                      {sliceAddress(value.player)}
                    </td>
                    <td>{value.choice}</td>
                    <td className="number-col">{value.wager}</td>
                    <td className="number-col streak">
                      <span>
                        <span className={`circle ${inWin ? "win" : "loss"}`} />{" "}
                        {value.streak}
                      </span>
                    </td>
                    <td className={`number-col ${inWin ? "win" : "loss"}`}>
                      {value.profit}
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="empty-history__msg">
                <EmptyHistory />
                No History
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
