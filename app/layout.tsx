import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Provider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoinPlus",
  description: "EVM And Solana Dapp + High Frequency Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col`}>
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen w-full max-w-7xl flex-col items-center bg-zinc-50 dark:bg-black px-6 pb-10 sm:px-10 overflow-hidden">
            <NavBar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
