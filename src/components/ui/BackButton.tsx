"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

/**
 * "Back" control for case-study pages. Returns to the top of the home page.
 * Navigating (rather than browser-back) avoids scroll restoration dropping the
 * user mid-page; the "hero" target tells the nav to settle at the very top.
 */
export default function BackButton({ label }: { label: string }) {
  const router = useRouter();

  function handleClick() {
    try {
      sessionStorage.setItem("nav:scrollTarget", "hero");
    } catch {
      // sessionStorage unavailable — navigation still lands at the top.
    }
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
    >
      <ArrowLeft size={16} /> {label}
    </button>
  );
}
