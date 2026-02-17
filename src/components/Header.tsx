"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MainNav from "./MainNav";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const showSearchBar = !isHomePage;

  // ── Scroll-triggered sticky on homepage ──────────────────────────────────
  // Becomes sticky+white once the hero SearchBar scrolls out of view
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const onScroll = () => {
      // Hero section is ~70vh. We trigger once user scrolls past ~500px
      // (adjust to match where your SearchBarHome sits in the hero)
      setIsScrolled(window.scrollY > 480);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  // On the homepage, once scrolled the header becomes sticky+white with SearchBar
  const isSticky = isHomePage && isScrolled;

  return (
    <header
      role="banner"
      className={[
        "top-0 z-[1001] w-full pb-2 transition-all duration-300",
        // Homepage not-scrolled: absolute transparent
        isHomePage && !isScrolled
          ? "absolute bg-transparent border-none"
          : "",
        // Homepage scrolled OR non-homepage: sticky white
        isSticky || !isHomePage
          ? "sticky bg-white border-b border-black/10 shadow-sm"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
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
              isHomePage && !isScrolled
                ? "/images/mountain-collection-logo-white.png"
                : "/images/mountain-collection-logo.svg"
            }
            alt="Mountain Collection"
            width={150}
            height={65}
            priority
            className="h-10 w-auto md:h-20"
          />
        </Link>

        {/* Center */}
        <div className="min-w-0 flex-1 flex justify-center">
          {/* Non-homepage: always show SearchBar */}
          {showSearchBar && <SearchBar />}

          {/* Homepage not-scrolled: show MainNav */}
          {isHomePage && !isScrolled && (
            <MainNav variant="transparent" />
          )}

          {/* Homepage scrolled: show compact SearchBar */}
          {isHomePage && isScrolled && (
            <SearchBar />
          )}
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={[
              "hidden rounded-full p-2 md:inline-flex transition-colors",
              isHomePage && !isScrolled
                ? "text-white hover:bg-white/20"
                : "text-[var(--ts-mid-grey)] hover:bg-[var(--ts-light-grey)]",
            ].join(" ")}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <UserMenu
            variant={isHomePage && !isScrolled ? "transparent" : "default"}
          />
        </div>

      </div>
    </header>
  );
}

