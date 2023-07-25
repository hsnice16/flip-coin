/* eslint-disable no-undef */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { COIN_FLIP_CONTRACT, coinFlipABI } from "../utils";
import { useProvider } from "wagmi";

// const URL =
//   "https://api.studio.thegraph.com/query/39089/mortycoinflip-v1/v0.0.1";

export function useInvalidateBetHistory() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries("bet-history");
  };
}

export function useGetHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const provider = useProvider();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const contract = new Contract(
          COIN_FLIP_CONTRACT,
          coinFlipABI,
          provider
        );
        const _data = await contract.getLastFlipResults(20);
        setData(_data);
      } catch (error) {
        console.log("contract-read-error-for-getLastFlipResults", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [provider]);

  return { data, isLoading };

  // return useQuery(["bet-history"], async () => {
  //   const FLIP_COMPLETED_QUERY = `
  //   {
  //     flipCompleteds(
  //       orderBy: blockTimestamp,
  //       orderDirection: desc,
  //       first: 20
  //     ) {
  //       id
  //       player
  //       didWin
  //       isTail
  //       amount
  //       gameId
  //       blockNumber
  //       blockTimestamp
  //       transactionHash
  //     }
  //   }
  //   `;

  //   const {
  //     data: {
  //       data: { flipCompleteds },
  //     },
  //   } = await axios({
  //     url: URL,
  //     method: "POST",
  //     data: {
  //       query: FLIP_COMPLETED_QUERY,
  //     },
  //   });

  //   return flipCompleteds;
  // });
}

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
