import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/lib/data";

export default function Results() {
  const t = useTranslations("results");

  return (
    <section id="results" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          highlight={t("highlight")}
        />
        <Reveal className="mb-12 max-w-2xl text-lg text-muted">{t("intro")}</Reveal>

        <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent-2/50"
            >
              <div className="font-display text-4xl font-extrabold text-gradient">
                {r.metric}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`items.${r.id}`)}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
