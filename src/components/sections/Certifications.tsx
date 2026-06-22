import { useTranslations } from "next-intl";
import { Award, GraduationCap } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, education } from "@/lib/data";

export default function Certifications() {
  const t = useTranslations("certifications");

  return (
    <section id="certifications" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          highlight={t("highlight")}
        />

        <div className="grid gap-10 md:grid-cols-2">
          <Reveal stagger className="space-y-4">
            {certifications.map((c) => (
              <div
                key={c.id}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <Award className="mt-1 shrink-0 text-accent-2" size={22} />
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {t(`items.${c.id}.title`)}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-accent-2">
                    {c.provider} · {c.date}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`items.${c.id}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="space-y-4">
            <h3 className="mb-2 font-display text-xl font-bold">{t("educationTitle")}</h3>
            {education.map((e) => (
              <div
                key={e.id}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <GraduationCap className="mt-1 shrink-0 text-accent-3" size={22} />
                <div>
                  <h4 className="font-display text-lg font-bold">{e.school}</h4>
                  <p className="mt-1 text-sm text-muted">{e.degree}</p>
                  {"period" in e && e.period ? (
                    <p className="mt-0.5 font-mono text-xs text-muted">{e.period}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
