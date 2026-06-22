"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import Tilt3D from "@/components/motion/Tilt3D";
import { Button } from "@/components/ui/Button";
import { PROFILE } from "@/lib/data";

export default function ImageShowcase() {
  const t = useTranslations("hero");
  const tTrust = useTranslations("trust");

  return (
    <section id="showcase" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* 3D portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="order-1"
        >
          <Tilt3D className="relative mx-auto w-full max-w-xs sm:max-w-lg" max={12}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                aria-hidden
                className="absolute inset-6 rounded-[2.5rem] bg-gradient-brand opacity-30 blur-3xl"
                style={{ transform: "translateZ(-60px)" }}
              />
              <div
                className="relative aspect-video overflow-hidden rounded-[2rem] border border-border bg-bg-soft/50 backdrop-blur-sm"
                style={{ transform: "translateZ(40px)" }}
              >
                <Image
                  src="/images/ahmad-khan.png"
                  alt={PROFILE.fullName}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-contain"
                />
              </div>
              <div
                className="glow-ring absolute -bottom-5 -left-4 rounded-2xl border border-border bg-bg-elevated px-4 py-3"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="font-display text-xl font-bold text-gradient">92%</div>
                <div className="text-[10px] uppercase tracking-wide text-muted">
                  {tTrust("jss")}
                </div>
              </div>
              <div
                className="absolute -right-3 -top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-xs font-semibold"
                style={{ transform: "translateZ(70px)" }}
              >
                <Star size={12} className="fill-accent-2 text-accent-2" />
                {tTrust("topRated")}
              </div>
            </motion.div>
          </Tilt3D>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-brand" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
              {PROFILE.fullName}
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            {(t.raw("titles") as string[])[1] ?? "Creative Director"}{" "}
            <span className="text-gradient">&amp;</span>{" "}
            {(t.raw("titles") as string[])[0] ?? "Digital Strategist"}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted">{t("sub")}</p>

          <div className="mt-8">
            <Button href="#contact">
              {t("ctaPrimary")} <ArrowUpRight size={16} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
