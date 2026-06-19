import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} />

        <div className="relative mt-8 border-l border-border pl-8 sm:pl-12">
          {experience.map((e) => (
            <Reveal key={e.id} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[37px] top-1.5 grid h-4 w-4 place-items-center sm:-left-[53px]">
                <span className="h-3 w-3 rounded-full bg-gradient-brand" />
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-accent-2">
                {e.period}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold">
                {t(`items.${e.id}.role`)}
                <span className="text-muted"> · {e.company}</span>
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                {t(`items.${e.id}.desc`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
