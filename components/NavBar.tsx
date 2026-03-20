import { ArrowUpZA, Search, Sprout, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/button";
import ChainsDropdown from "./ChainsDropdown";
import { ModeToggle } from "./dark-mode";
import { MenuDropdown } from "./MenuDropdown";

const NavBar = () => {
  //bg-background/95 for opacity
  //supports-backdrop-filter:bg-background for background image
  // z-50 to stay ontop of everything
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 supports-backdrop-filter:bg-background z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-13 justify-between">
          <div className="flex items-center">
            {/*Logo */}
            <Link href="/">
              <Image
                src="/bitcoin.svg"
                alt="CoinPlus logo"
                width={72}
                height={40}
              />
            </Link>

            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              CoinPlus
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/*Navbar mobile menu */}
            <div className="flex sm:hidden items-center space-x-4">
              <MenuDropdown />
            </div>

            {/*Navbar components */}
            <div className="hidden sm:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/search">
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline">Search</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/swap">
                  <Sprout className="w-4 h-4" />
                  <span className="hidden md:inline">Swap</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/allcoins">
                  <ArrowUpZA className="w-4 h-4" />
                  <span className="hidden md:inline">Coins</span>
                </Link>
              </Button>

              <ChainsDropdown />

              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/">
                  <Wallet className="w-4 h-4" />
                  <span className="hidden md:inline">Wallet</span>
                </Link>
              </Button>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
