"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import MagneticButton from "@/components/motion/MagneticButton";
import GradientBlob from "@/components/ui/GradientBlob";
import { Button } from "@/components/ui/Button";
import { trust } from "@/lib/data";

export default function Hero() {
  const t = useTranslations("hero");
  const tTrust = useTranslations("trust");
  const titles = t.raw("titles") as string[];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % titles.length), 2600);
    return () => clearInterval(id);
  }, [titles.length]);

  const ghost = t("ghost");
  const ghostRow = `${ghost} ${ghost} ${ghost} `;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      <GradientBlob className="pointer-events-none absolute inset-0 -z-10" />

      {/* Horizontally moving ghost word */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 flex items-center overflow-hidden"
      >
        <div className="flex shrink-0 animate-marquee whitespace-nowrap" style={{ ["--marquee-duration" as string]: "32s" }}>
          <span className="text-outline select-none font-display text-[46vw] font-extrabold leading-none sm:text-[22vw]">
            {ghostRow}
          </span>
          <span className="text-outline select-none font-display text-[46vw] font-extrabold leading-none sm:text-[22vw]">
            {ghostRow}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="font-display text-xl font-bold tracking-wide sm:text-2xl">
            {t("name")}
          </span>
          <span className="relative inline-flex h-7 min-w-[15ch] items-center">
            <AnimatePresence mode="wait">
              <motion.em
                key={idx}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="whitespace-nowrap font-mono text-sm not-italic text-accent-2"
              >
                {titles[idx]}
              </motion.em>
            </AnimatePresence>
          </span>
        </motion.div>

        <h1 className="relative font-display text-[15vw] font-extrabold uppercase leading-[0.85] tracking-tight sm:text-[14vw] lg:text-[12rem]">
          <SplitText text={t("headline")} by="char" />
          {/* Badge: stacks below the word on phones (no overlap), floats over
              the bottom-right of the headline from sm up. */}
          <span className="glow-ring mt-4 block w-fit rounded-full px-4 py-1.5 font-mono text-xs font-medium tracking-widest text-fg sm:absolute sm:-bottom-2 sm:right-0 sm:mt-0 sm:text-sm md:bottom-6">
            {t("badge")}
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base text-muted sm:text-lg">{t("lead")}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton>
            <Button href="#contact">
              {t("ctaPrimary")} <ArrowUpRight size={16} />
            </Button>
          </MagneticButton>
          <Button href="#work" variant="ghost">
            {t("ctaSecondary")}
          </Button>
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {trust.map((item) => (
            <div key={item.id} className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-gradient">
                {item.value}
              </span>
              <span className="text-xs uppercase tracking-wide text-muted">
                {tTrust(item.id)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#showcase"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted sm:flex"
      >
        {t("scroll")}
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
