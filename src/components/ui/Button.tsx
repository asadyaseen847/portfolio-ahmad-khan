import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-on-accent glow-accent hover:-translate-y-0.5",
  ghost:
    "border border-border text-fg hover:border-accent-2 hover:text-fg",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  external,
  type,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
}) {
  const cls = cn(base, variants[variant], className);
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={cls}>
      {children}
    </button>
  );
}
