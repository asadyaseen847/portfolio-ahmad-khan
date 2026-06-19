import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { skills, tools } from "@/lib/data";

export default function SkillsTools() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-border bg-bg-soft px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          highlight={t("highlight")}
        />
        <Reveal className="mb-14 max-w-2xl text-lg text-muted">{t("intro")}</Reveal>

        {/* Expertise — large, prominent chips */}
        <Reveal className="mb-6 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
            {t("skillsLabel")}
          </span>
          <span className="h-px flex-1 bg-border" />
        </Reveal>
        <Reveal stagger className="mb-16 flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-base font-semibold transition-all duration-300 hover:border-accent-2 hover:bg-accent-2 hover:text-on-accent"
            >
              <span className="font-mono text-xs text-accent-2 transition-colors group-hover:text-on-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {skill}
            </span>
          ))}
        </Reveal>

        {/* Tools */}
        <Reveal className="mb-6 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
            {t("toolsLabel")}
          </span>
          <span className="h-px flex-1 bg-border" />
        </Reveal>
      </div>

      {/* Full-bleed marquees for motion + scale */}
      <div className="space-y-4">
        <Marquee items={tools} duration={32} />
        <Marquee items={[...skills].reverse()} duration={44} />
      </div>
    </section>
  );
}
