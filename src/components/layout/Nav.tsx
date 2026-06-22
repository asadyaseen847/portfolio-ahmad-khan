"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { navSections } from "@/lib/data";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

const PENDING_KEY = "nav:scrollTarget";

type Lenis = { scrollTo: (t: HTMLElement, o?: object) => void };
function getLenis(): Lenis | undefined {
  return (window as unknown as { lenis?: Lenis }).lenis;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const lenis = getLenis();
  // Animated smooth scroll (Lenis when available, native fallback otherwise).
  if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the last section whose top has passed below the nav.
  // Only meaningful on the home page, where the sections actually exist.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      const probe = 140; // px from viewport top, just under the fixed nav
      let current = "";
      for (const id of navSections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Arriving on the home page from another route (e.g. /work): scroll to the
  // requested section. Nav links carry the target in the URL hash (`/#contact`);
  // the back button passes "hero" via sessionStorage. Either way we scroll here.
  //
  // The home page reflows after the first paint — the ImageShowcase images load
  // and push every later section (about, skills, …) further down. A single
  // scroll therefore lands too high and ends up near the hero. So we scroll once
  // the section exists, then RE-ASSERT a few times as layout settles, until the
  // section is actually parked under the nav.
  useEffect(() => {
    if (!isHome) return;
    const target =
      sessionStorage.getItem(PENDING_KEY) ||
      decodeURIComponent(window.location.hash.replace("#", ""));
    if (!target) return;
    sessionStorage.removeItem(PENDING_KEY);

    let cancelled = false;
    const timers: number[] = [];
    const cleanups: (() => void)[] = [];
    const NAV_OFFSET = 80;

    const scrollOnce = () => {
      const el = document.getElementById(target);
      if (!el) return false;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.0 });
      else el.scrollIntoView({ behavior: "smooth" });
      return true;
    };

    // Wait (up to ~2s) for the section to mount, then scroll.
    let waited = 0;
    const waitThenScroll = () => {
      if (cancelled) return;
      if (scrollOnce()) {
        // Re-assert AFTER the initial animation settles: if the section isn't
        // parked under the nav (page reflowed, or scroll got reset to the top),
        // scroll to it again. Timed past the ~1s animation to avoid restarting
        // it mid-flight.
        const reassert = () => {
          if (cancelled) return;
          const el = document.getElementById(target);
          if (el && Math.abs(el.getBoundingClientRect().top - NAV_OFFSET) > 40) {
            scrollOnce();
          }
        };
        [1150, 1700, 2400].forEach((ms) => {
          timers.push(window.setTimeout(reassert, ms));
        });
        // …and once more after images finish loading (covers slow reflows).
        if (document.readyState !== "complete") {
          const onLoad = () => window.setTimeout(reassert, 100);
          window.addEventListener("load", onLoad, { once: true });
          cleanups.push(() => window.removeEventListener("load", onLoad));
        }
        return;
      }
      if (waited++ < 120) {
        const id = window.setTimeout(waitThenScroll, 16);
        timers.push(id);
      }
    };

    const start = window.setTimeout(waitThenScroll, 50);
    timers.push(start);

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
      cleanups.forEach((fn) => fn());
    };
  }, [isHome]);

  // We always handle nav clicks ourselves so the URL reflects the destination
  // section (e.g. `/#contact`) without ever stacking hashes (`/#a#b`).
  // - Home logo ("hero"): go to the top, no hash.
  // - On home: smooth-scroll in place and write a single clean hash.
  // - On other pages: navigate to `/#id` (URL shows the section); the arrival
  //   effect above reads the hash and smooth-scrolls once home mounts.
  //   scroll: false stops Next doing an instant jump so our scroll stays smooth.
  const go = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const isHero = id === "hero";
      if (isHome) {
        scrollToId(id);
        history.replaceState(
          null,
          "",
          isHero ? window.location.pathname : `${window.location.pathname}#${id}`
        );
      } else if (isHero) {
        router.push("/");
      } else {
        router.push(`/#${id}`, { scroll: false });
      }
    },
    [isHome, router]
  );

  const activeId = isHome ? active : "";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
          onClick={(e) => go(e, "hero")}
        >
          AHMAD<span className="text-gradient">KHAN</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map((id) => (
            <li key={id}>
              <a
                href={`/#${id}`}
                onClick={(e) => go(e, id)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                  activeId === id ? "text-fg" : "text-muted hover:text-fg"
                )}
              >
                {t(id)}
                {activeId === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg lg:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {navSections.map((id) => (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    onClick={(e) => go(e, id)}
                    className={cn(
                      "block py-3 text-sm font-medium uppercase tracking-wide transition-colors",
                      activeId === id ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
