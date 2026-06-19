import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SiteShell from "@/components/layout/SiteShell";
import { Tag } from "@/components/ui/Tag";
import { routing } from "@/i18n/routing";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const t = await getTranslations("work");

  return (
    <SiteShell>
    <article className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} /> {t("back")}
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent-2">
          {study.role}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-5 text-lg text-muted">{study.summary}</p>

        {study.metrics && study.metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl font-extrabold text-gradient">
                  {m.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-display text-xl font-bold">{t("overview")}</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
            {study.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {study.deliverables && study.deliverables.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold">{t("deliverables")}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {study.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-fg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <a
          href={study.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3 text-sm font-semibold text-on-accent glow-accent transition-transform hover:-translate-y-0.5"
        >
          {t("viewOnUpwork")} <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
    </SiteShell>
  );
}
