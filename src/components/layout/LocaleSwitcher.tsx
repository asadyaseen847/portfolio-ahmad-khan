"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  ru: "Русский",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("a11y");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: string) {
    // preserve the current route and params when changing locale
    router.replace(
      // @ts-expect-error -- pathname + params typing across dynamic routes
      { pathname, params },
      { locale: next }
    );
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("changeLanguage")}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium uppercase text-fg transition-colors hover:border-accent-2"
      >
        <Globe size={14} />
        {locale}
        <ChevronDown size={12} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-bg-elevated p-1 shadow-xl">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-fg transition-colors hover:bg-card"
              >
                {LABELS[l]}
                {l === locale && <Check size={14} className="text-accent-2" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
