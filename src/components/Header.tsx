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

  // Show the search bar on all pages except the homepage
  const showSearchBar = pathname !== "/";

  return (
    <header
      role="banner"
      className="sticky top-0 z-[1001] w-full pb-2 border-b-1 border-black/25 bg-white"
    >
      <div className="mx-auto flex w-full max-w-[1216px] items-center gap-6 px-4 py-3 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center mt-1"
          aria-label="Mountain Collection - Accueil"
        >
          <Image
            src="images/mountain-collection-logo.svg"
            alt="Mountain Collection"
            width={144}
            height={48}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Center: Nav (homepage) or SearchBar (other pages) */}
        <div className="min-w-0 flex-1">
          {showSearchBar ? (
            <SearchBar />
          ) : (
            <MainNav />
          )}
        </div>

        {/* Right: Menu hamburger + User */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="hidden rounded-full p-2 text-[var(--ts-mid-grey)] hover:bg-[var(--ts-light-grey)] md:inline-flex"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <UserMenu />
        </div>

      </div>
    </header>
  );
}