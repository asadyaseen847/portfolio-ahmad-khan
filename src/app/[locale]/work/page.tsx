import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SiteShell from "@/components/layout/SiteShell";
import { Tag } from "@/components/ui/Tag";
import { caseStudies } from "@/lib/data";

const ACCENT: Record<string, string> = {
  blue: "var(--accent-1)",
  violet: "var(--accent-2)",
  magenta: "var(--accent-3)",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("viewAll") };
}

export default async function WorkIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");

  return (
    <SiteShell>
    <div className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-brand" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
            {t("eyebrow")}
          </span>
        </div>
        <h1 className="font-display text-5xl font-extrabold sm:text-6xl">
          {t("heading")} <span className="text-gradient">{t("highlight")}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{t("intro")}</p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {caseStudies.map((c) => (
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
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
                  {c.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
              </div>
              <div className="relative mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {c.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </SiteShell>
  );
}
