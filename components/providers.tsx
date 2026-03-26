"use client";

import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { rainbowkitConfig, wagmiConfig } from "@/lib/wagmi";
import "@rainbow-me/rainbow-button/styles.css";
import {
  RainbowButtonProvider,
  rainbowConnector,
} from "@rainbow-me/rainbow-button";

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
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </JotaiProvider>
    </NextThemesProvider>
  );
}
/**       
            <RainbowKitProvider>{children}</RainbowKitProvider>
 */
