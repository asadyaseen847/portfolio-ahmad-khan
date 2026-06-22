import { useTranslations } from "next-intl";
import { Mail, ExternalLink } from "lucide-react";
import { PROFILE } from "@/lib/data";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="font-display text-lg font-bold">
            AHMAD<span className="text-gradient">KHAN</span>
          </p>
          <p className="mt-1 text-sm text-muted">{t("tagline")}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 hover:text-fg"
          >
            <Mail size={14} /> {PROFILE.email}
          </a>
          <a
            href={PROFILE.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-fg"
          >
            Upwork <ExternalLink size={14} />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-center text-xs text-muted sm:text-left">
        © {PROFILE.years.split(" ")[0]} {PROFILE.fullName}. {t("rights")}
      </p>
    </footer>
  );
}
