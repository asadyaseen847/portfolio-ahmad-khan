import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  className,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12", className)}>
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-brand" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
        {title}
        {highlight ? <span className="text-gradient"> {highlight}</span> : null}
      </h2>
    </Reveal>
  );
}
