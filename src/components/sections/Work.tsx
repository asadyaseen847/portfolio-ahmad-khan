import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { caseStudies } from "@/lib/data";

const ACCENT: Record<string, string> = {
  blue: "var(--accent-1)",
  violet: "var(--accent-2)",
  magenta: "var(--accent-3)",
};

export default function Work() {
  const t = useTranslations("work");

  return (
    <section id="work" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          highlight={t("highlight")}
        />
        <Reveal className="mb-12 max-w-2xl text-lg text-muted">{t("intro")}</Reveal>

        <Reveal stagger className="grid gap-5 md:grid-cols-2">
          {caseStudies.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-60"
                style={{ background: ACCENT[c.accent] }}
              />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-widest text-accent-2">
                  {c.role}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
              </div>

              <div className="relative mt-6">
                {c.metrics && c.metrics.length > 0 && (
                  <div className="mb-5 flex flex-wrap gap-6">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-2xl font-bold text-gradient">
                          {m.value}
                        </div>
                        <div className="text-[11px] uppercase tracking-wide text-muted">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {c.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-fg">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent-2"
          >
            {t("viewAll")} <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
