"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Animated electric gradient mesh used as a section/hero backdrop. */
export default function GradientBlob({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !ref.current) return;
      const blobs = ref.current.querySelectorAll<HTMLElement>("[data-blob]");
      blobs.forEach((b, i) => {
        gsap.to(b, {
          xPercent: i % 2 ? -18 : 18,
          yPercent: i % 2 ? 14 : -14,
          duration: 9 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{ opacity: "var(--blob-opacity)" }}
    >
      <div
        data-blob
        className="absolute left-[10%] top-[8%] h-[42vw] w-[42vw] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, var(--accent-1), transparent 60%)" }}
      />
      <div
        data-blob
        className="absolute right-[6%] top-[20%] h-[38vw] w-[38vw] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--accent-3), transparent 60%)" }}
      />
      <div
        data-blob
        className="absolute left-[40%] top-[40%] h-[30vw] w-[30vw] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--accent-2), transparent 60%)" }}
      />
    </div>
  );
}
