"use client";

import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** split granularity */
  by?: "word" | "char";
  delay?: number;
  start?: string;
};

/** Lightweight word/char split + staggered reveal (no premium SplitText plugin). */
export default function SplitText({
  text,
  as,
  className,
  by = "word",
  delay = 0,
  start = "top 85%",
}: Props) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLElement>(null);

  const units = by === "char" ? Array.from(text) : text.split(" ");

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const parts = el.querySelectorAll<HTMLElement>("[data-split]");
      gsap.fromTo(
        parts,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: by === "char" ? 0.02 : 0.06,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {units.map((u, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
        >
          <span data-split className="inline-block">
            {u === " " ? " " : u}
          </span>
          {by === "word" && i < units.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
