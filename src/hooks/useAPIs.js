/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetPendingNewFlip(gameId) {
  return useQuery(["pending-new-flip", gameId], async () => {
    // GraphQL query with a filter for a specific gameId
    const NEW_FLIP_QUERY = `
    {
      newFlips(where: { gameId: "${BigInt(gameId ?? "").toString()}" }) {
        id
        user
        amount
        isTail
        gameId
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
    `;

    const {
      data: {
        data: { newFlips },
      },
    } = await axios({
      url: "https://api.studio.thegraph.com/query/39089/errorcoinflip/v0.0.1",
      method: "POST",
      data: {
        query: NEW_FLIP_QUERY,
      },
    });

    return newFlips[0];
  });
}
