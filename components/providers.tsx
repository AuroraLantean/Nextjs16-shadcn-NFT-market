"use client";

import { Provider as JotaiProvider, useAtom } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { rainbowkitConfig, wagmiConfig } from "@/lib/wagmi";
import "@rainbow-me/rainbow-button/styles.css";
import {
  AddressType,
  darkTheme,
  PhantomProvider,
  useDisconnect,
  useModal,
  usePhantom,
} from "@phantom/react-sdk";
import { walletMenuOpenAtom } from "@/lib/jotaiStates";
import { phantomAppId } from "@/lib/utils";
import { Button } from "./ui/button";

/*import {
  RainbowButtonProvider,
  rainbowConnector,
} from "@rainbow-me/rainbow-button";*/

//import { createConfig, WagmiConfig } from 'wagmi';
/*export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
type Props = {
  children: React.ReactNode;
};
export const JotaiProviders = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};*/

const queryClient = new QueryClient();

/*  const wagmiInitialState = cookieToInitialState(getConfig(),
    (await headers()).get('cookie'),
)*/
const config = wagmiConfig;
//const config = rainbowkitConfig;
export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <JotaiProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <PhantomProvider1>{children}</PhantomProvider1>
          </QueryClientProvider>
        </WagmiProvider>
      </JotaiProvider>
    </NextThemesProvider>
  );
}
/**       
            <RainbowKitProvider>{children}</RainbowKitProvider>
 */
export function PhantomButton() {
  //setPrevOpen: (open: boolean) => void
  const { open, close, isOpened } = useModal();
  const { isConnected, user } = usePhantom();
  const { disconnect, isDisconnecting } = useDisconnect();
  const [_walletMenuOpen, setWalletMenuOpen] = useAtom(walletMenuOpenAtom);
  //          <p>Connected</p>
  //          {JSON.stringify(user?.addresses)}
  return (
    <div>
      {isConnected ? (
        <Button
          type="button"
          size="lg"
          className="ml-2 h-12"
          onClick={() => {
            setWalletMenuOpen(false);
            disconnect();
          }}
          disabled={isDisconnecting}
        >
          <span className="font-bold w-60">Disconnect Phantom</span>
        </Button>
      ) : (
        <Button
          type="button"
          size="lg"
          className="ml-2 h-12"
          onClick={() => {
            setWalletMenuOpen(false);
            open();
          }}
        >
          <span className="font-bold w-60">Phantom</span>
        </Button>
      )}
    </div>
  );
}
type Props = {
  children: React.ReactNode;
};
export const PhantomProvider1 = ({ children }: Props) => {
  return (
    <PhantomProvider
      config={{
        providers: ["google", "apple", "injected"], // Enabled auth methods
        appId: phantomAppId,
        addressTypes: [
          AddressType.ethereum,
          AddressType.solana,
          AddressType.bitcoinSegwit,
          AddressType.sui,
        ],
        authOptions: {
          redirectUrl: "https://yourapp.com/auth/callback", // Must be whitelisted in Phantom Portal
        },
      }}
      theme={darkTheme}
      appIcon="https://phantom-portal20240925173430423400000001.s3.ca-central-1.amazonaws.com/icons/c1f401a8-e4a2-4910-963a-d75f4be7b879.png"
      appName="PhantomApp1"
    >
      {children}
    </PhantomProvider>
  );
};
