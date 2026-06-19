"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import GradientBlob from "@/components/ui/GradientBlob";
import { PROFILE } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const schema = z.object({
    name: z.string().min(2, t("form.required")),
    email: z.string().email(t("form.invalidEmail")),
    company: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(10, t("form.required")),
    // honeypot
    website: z.string().max(0).optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    if (values.website) return; // bot caught
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-border bg-bg-soft px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-accent-2";

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <GradientBlob className="pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-brand" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
            {t("eyebrow")}
          </span>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            {t("heading")} <span className="text-gradient">{t("highlight")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">{t("lead")}</p>
        </Reveal>

        <Reveal className="mt-12 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  {...register("name")}
                  placeholder={t("form.name")}
                  className={field}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-accent-3">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={t("form.email")}
                  className={field}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-accent-3">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input {...register("company")} placeholder={t("form.company")} className={field} />
              <input {...register("budget")} placeholder={t("form.budget")} className={field} />
            </div>
            <div>
              <textarea
                {...register("message")}
                placeholder={t("form.message")}
                rows={5}
                className={cn(field, "resize-none")}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-accent-3">{errors.message.message}</p>
              )}
            </div>

            {/* honeypot */}
            <input
              {...register("website")}
              tabIndex={-1}
              autoComplete="off"
              className="absolute left-[-9999px] h-0 w-0"
              aria-hidden
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3 text-sm font-semibold text-on-accent glow-accent transition-all hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "sending" ? t("form.sending") : t("form.send")}
              <Send size={15} />
            </button>

            {status === "ok" && (
              <p className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={16} /> {t("form.success")}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-accent-3">
                <AlertCircle size={16} /> {t("form.error")}
              </p>
            )}
          </form>

          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border bg-card p-7">
            <p className="text-sm text-muted">{t("orEmail")}</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 font-display text-lg font-bold hover:text-gradient"
            >
              <Mail size={18} /> {PROFILE.email}
            </a>
            <a
              href={PROFILE.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
            >
              Upwork profile <ArrowUpRight size={14} />
            </a>
            <div className="mt-2 border-t border-border pt-4 text-sm text-muted">
              <p>{PROFILE.location}</p>
              <p className="mt-1">{PROFILE.rate} · 0–4h response</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
