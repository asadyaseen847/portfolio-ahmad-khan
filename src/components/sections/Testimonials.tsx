import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          highlight={t("highlight")}
        />
        <Reveal className="mb-12 max-w-2xl text-lg text-muted">{t("intro")}</Reveal>

        <Reveal stagger className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <Quote className="mb-4 text-accent-2" size={28} />
              <blockquote className="flex-1 text-sm leading-relaxed text-fg/90">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold">{item.client}</span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={13} className="fill-accent-3 text-accent-3" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
