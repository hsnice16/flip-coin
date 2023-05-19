import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL =
  "https://api.studio.thegraph.com/query/39089/mortycoinflip-v1/v0.0.1";

export function useInvalidateBetHistory() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries("bet-history");
  };
}

export function useGetHistory() {
  return useQuery(["bet-history"], async () => {
    // GraphQL query with a filter for a specific gameId
    const FLIP_COMPLETED_QUERY = `
    {
      flipCompleteds(
        orderBy: blockTimestamp,
        orderDirection: desc,
        first: 20
      ) {
        id
        player
        didWin
        isTail
        amount
        gameId
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
    `;

    const {
      data: {
        data: { flipCompleteds },
      },
    } = await axios({
      url: URL,
      method: "POST",
      data: {
        query: FLIP_COMPLETED_QUERY,
      },
    });

    return flipCompleteds;
  });
}
