import { cn } from "@/lib/utils";

export function Marquee({
  items,
  duration = 30,
  className,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}
    >
      <div
        className="flex shrink-0 items-center gap-4 pr-4 animate-marquee"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-border bg-card px-5 py-2 text-sm text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
