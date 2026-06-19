"use client";

import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** stagger direct children instead of animating the wrapper */
  stagger?: boolean;
};

export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  y = 40,
  stagger = false,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.children) : el;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
