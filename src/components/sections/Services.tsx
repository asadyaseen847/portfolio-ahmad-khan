import { useTranslations } from "next-intl";
import {
  Megaphone,
  MousePointerClick,
  Briefcase,
  Share2,
  Camera,
  Search,
  PenLine,
  Mail,
  Globe,
  Palette,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  Megaphone,
  MousePointerClick,
  Briefcase,
  Share2,
  Camera,
  Search,
  PenLine,
  Mail,
  Globe,
  Palette,
};

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          highlight={t("highlight")}
        />
        <Reveal className="mb-12 max-w-2xl text-lg text-muted">{t("intro")}</Reveal>

        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? Megaphone;
            return (
              <div
                key={s.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-2/60"
              >
                <div className="absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg-soft text-accent-2 transition-colors group-hover:text-accent-3">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold">
                  {t(`items.${s.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`items.${s.id}.desc`)}
                </p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
