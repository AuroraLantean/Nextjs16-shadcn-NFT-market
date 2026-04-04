"use client";

import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { providerConfig } from "@/lib/wagmi";
import "@rainbow-me/rainbow-button/styles.css";
import { AddressType, darkTheme, PhantomProvider } from "@phantom/react-sdk";
import { phantomAppId } from "@/lib/initconditions";

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

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <JotaiProvider>
        <WagmiProvider config={providerConfig}>
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

type Props = {
  children: React.ReactNode;
};
export const PhantomProvider1 = ({ children }: Props) => {
  return (
    <PhantomProvider
      config={{
        providers: ["injected", "google", "apple"], //Authentication providers
        appId: phantomAppId,
        addressTypes: [
          AddressType.solana, //1st address type Phantom will seek to find in the Phantom wallet
          //AddressType.ethereum, //if the user does not have Ethereum address in his account, an error will show up
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
