"use client";

import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

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

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <JotaiProvider>{children}</JotaiProvider>
    </NextThemesProvider>
  );
}
