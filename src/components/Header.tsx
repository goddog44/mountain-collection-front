"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MainNav from "./MainNav";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const showSearchBar = !isHomePage;

  return (
    <header
      role="banner"
      className={`
        top-0 z-[1001] w-full pb-2
        ${isHomePage
          ? "absolute bg-transparent border-none"
          : "sticky bg-white border-b border-black/25"}
      `}
    >
      <div className="mx-auto flex w-full max-w-[1216px] items-center gap-6 px-8 py-3 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center mt-1"
          aria-label="Mountain Collection - Accueil"
        >
          <Image
            src={
              isHomePage
                ? "/images/mountain-collection-logo-white.png"
                : "/images/mountain-collection-logo.svg"
            }
            alt="Mountain Collection"
            width={150}
            height={65}
            priority
            className="h-16 w-auto md:h-20"
          />
                  </Link>

        {/* Center */}
        <div className="min-w-0 flex-1">
          {showSearchBar ? (
            <SearchBar />
          ) : (
            <MainNav variant={isHomePage ? "transparent" : "default"} />
          )}
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={`
              hidden rounded-full p-2 md:inline-flex transition-colors
              ${
                isHomePage
                  ? "text-white hover:bg-white/20"
                  : "text-[var(--ts-mid-grey)] hover:bg-[var(--ts-light-grey)]"
              }
            `}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <UserMenu variant={isHomePage ? "transparent" : "default"} />
        </div>

      </div>
    </header>
  );
}
