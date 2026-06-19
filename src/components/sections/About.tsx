import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { stats } from "@/lib/data";

export default function About() {
  const t = useTranslations("about");
  const tStats = useTranslations("stats");

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-brand" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
            {t("eyebrow")}
          </span>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {t("aboutTitle")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {t("aboutBody")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {t("visionTitle")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {t("visionBody")}
            </p>
          </Reveal>
        </div>

        <Reveal stagger className="mt-20 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.id} className="text-center sm:text-left">
              <div className="font-display text-5xl font-extrabold sm:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} className="text-gradient" />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted">
                {tStats(s.id)}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <p className="max-w-3xl text-sm text-muted">{t("statsNote")}</p>
        </Reveal>
      </div>
    </section>
  );
}
