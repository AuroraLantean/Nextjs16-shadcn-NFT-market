"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

import { ModeToggle } from "./dark-mode";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="">
      <div className="main-container inner">
        <Link href="/">
          <Image
            src="/bitcoin.svg"
            alt="CoinPlus logo"
            width={72}
            height={40}
          />
        </Link>

        <nav>
          <Link
            href="/"
            className={cn("nav-link", {
              "is-active": pathname === "/",
              "is-home": true,
            })}
          >
            Home
          </Link>

          <p>Search Modal</p>

          <Link
            href="/coins"
            className={cn("nav-link", {
              "is-active": pathname === "/coins",
            })}
          >
            All Coins
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
