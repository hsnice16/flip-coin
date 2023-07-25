import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./polyfills";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Flip Coin Game",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({ accentColor: "#26c6da" })}
      >
        <QueryClientProvider client={new QueryClient()}>
          <App />
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
