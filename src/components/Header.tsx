"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-[1001] w-full border-b border-[var(--ts-mid-grey)]/30 bg-white"
    >
      <div className="mx-auto flex w-full max-w-[1216px] items-center gap-4 px-4 py-4 md:gap-6 md:px-8 lg:px-8">
        {/* Logo - far left */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Mountain Collection - Accueil"
        >
          <Image
            src="/mountain-collection-logo.svg"
            alt="Mountain Collection"
            width={144}
            height={48}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Search bar - center, takes remaining space */}
        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        {/* Menu + User - far right */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="hidden rounded-full p-2 text-[var(--ts-mid-grey)] hover:bg-[var(--ts-light-grey)] md:inline-flex"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ts-mid-blue)] text-white transition-colors hover:opacity-90"
            aria-label="Mon compte"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
