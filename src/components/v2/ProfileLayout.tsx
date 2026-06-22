"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail, MapPin, ArrowUpRight, ArrowLeft, Send, CheckCircle2, AlertCircle,
  Briefcase, GraduationCap, Award, Star, Globe, Clock, Check,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import {
  PROFILE, stats, services, experience, education, certifications,
  caseStudies, testimonials, skills, tools,
} from "@/lib/data";
import { cn } from "@/lib/utils";

type TabId = "about" | "resume" | "portfolio" | "contact";

export default function ProfileLayout() {
  const t = useTranslations();
  const [tab, setTab] = useState<TabId>("about");

  const tabs: { id: TabId; label: string }[] = [
    { id: "about", label: t("nav.about") },
    { id: "resume", label: t("experience.heading") },
    { id: "portfolio", label: t("nav.work") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto grid max-w-6xl gap-6 p-4 lg:grid-cols-[340px_1fr] lg:p-8">
        {/* ---------- Sidebar ---------- */}
        <aside className="self-start rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 lg:sticky lg:top-8">
          <Avatar />

          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">{PROFILE.name}</h1>
            <p className="mt-1 text-sm text-zinc-400">Digital Marketing Strategist</p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Available for work
            </span>
          </div>

          <ul className="mt-6 space-y-3 border-t border-zinc-800 pt-6 text-sm">
            <li className="flex items-center gap-3 text-zinc-400">
              <MapPin size={16} className="text-zinc-500" /> {PROFILE.location}
            </li>
            <li className="flex items-center gap-3 text-zinc-400">
              <Mail size={16} className="text-zinc-500" />
              <a href={`mailto:${PROFILE.email}`} className="hover:text-zinc-100">
                {PROFILE.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-zinc-400">
              <Clock size={16} className="text-zinc-500" /> {PROFILE.rate} · 0–4h response
            </li>
            <li className="flex items-center gap-3 text-zinc-400">
              <Globe size={16} className="text-zinc-500" /> English — Native
            </li>
          </ul>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setTab("contact")}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
            >
              <Mail size={15} /> Hire me
            </button>
            <a
              href={PROFILE.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full border border-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-600"
            >
              Upwork <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200"
            >
              <ArrowLeft size={13} /> Main site
            </Link>
            <LocaleSwitcher />
          </div>
        </aside>

        {/* ---------- Main panel ---------- */}
        <main className="min-h-[80vh] rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 lg:p-10">
          {/* Tabs */}
          <nav className="mb-8 flex flex-wrap gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                type="button"
                onClick={() => setTab(tb.id)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  tab === tb.id ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {tab === tb.id && (
                  <motion.span
                    layoutId="v2-tab"
                    className="absolute inset-0 rounded-full bg-zinc-100"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{tb.label}</span>
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "about" && <AboutTab />}
              {tab === "resume" && <ResumeTab />}
              {tab === "portfolio" && <PortfolioTab />}
              {tab === "contact" && <ContactTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function Avatar() {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/ahmad-khan.png"
          alt={PROFILE.fullName}
          onError={() => setOk(false)}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <span className="text-5xl font-bold text-zinc-600">AK</span>
        </div>
      )}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold tracking-tight">{children}</h2>
      <span className="mt-3 block h-1 w-12 rounded-full bg-zinc-100" />
    </div>
  );
}

/* ---------- About ---------- */
function AboutTab() {
  const t = useTranslations();
  return (
    <section>
      <Heading>{t("about.aboutTitle")}</Heading>
      <p className="text-zinc-400">{t("about.aboutBody")}</p>

      <h3 className="mb-3 mt-8 text-lg font-semibold">{t("about.visionTitle")}</h3>
      <p className="text-zinc-400">{t("about.visionBody")}</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-center">
            <div className="text-3xl font-extrabold">
              {s.value}
              {s.suffix}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
              {t(`stats.${s.id}`)}
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-10 text-lg font-semibold">
        {t("services.heading")} {t("services.highlight")}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((sv) => (
          <div
            key={sv.id}
            className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <Check size={18} className="mt-0.5 shrink-0 text-zinc-300" />
            <div>
              <p className="font-semibold">{t(`services.items.${sv.id}.title`)}</p>
              <p className="mt-0.5 text-sm text-zinc-500">
                {t(`services.items.${sv.id}.desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-10 text-lg font-semibold">{t("skills.skillsLabel")}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((sk) => (
          <span
            key={sk}
            className="rounded-full border border-zinc-800 bg-zinc-950 px-4 py-1.5 text-sm text-zinc-300"
          >
            {sk}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Resume ---------- */
function ResumeTab() {
  const t = useTranslations();
  return (
    <section className="space-y-12">
      <div>
        <Heading>{t("experience.heading")}</Heading>
        <div className="space-y-6 border-l border-zinc-800 pl-6">
          {experience.map((e) => (
            <div key={e.id} className="relative">
              <span className="absolute -left-[29px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-zinc-100" />
              <p className="text-xs uppercase tracking-widest text-zinc-500">{e.period}</p>
              <h3 className="mt-1 text-lg font-bold">
                {t(`experience.items.${e.id}.role`)}
                <span className="text-zinc-500"> · {e.company}</span>
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{t(`experience.items.${e.id}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <GraduationCap size={18} /> {t("certifications.educationTitle")}
          </h3>
          <div className="space-y-3">
            {education.map((ed) => (
              <div key={ed.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="font-semibold">{ed.school}</p>
                <p className="mt-1 text-sm text-zinc-400">{ed.degree}</p>
                {"period" in ed && ed.period ? (
                  <p className="mt-0.5 text-xs text-zinc-500">{ed.period}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Award size={18} /> {t("certifications.heading")} {t("certifications.highlight")}
          </h3>
          <div className="space-y-3">
            {certifications.map((c) => (
              <div key={c.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="font-semibold">{t(`certifications.items.${c.id}.title`)}</p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-zinc-500">
                  {c.provider} · {c.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">{t("skills.toolsLabel")}</h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Portfolio ---------- */
function PortfolioTab() {
  const t = useTranslations();
  return (
    <section>
      <Heading>
        {t("work.heading")} {t("work.highlight")}
      </Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        {caseStudies.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-600"
          >
            <p className="text-xs uppercase tracking-widest text-zinc-500">{c.role}</p>
            <h3 className="mt-2 flex items-start justify-between gap-2 text-lg font-bold">
              {c.title}
              <ArrowUpRight
                size={18}
                className="shrink-0 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-200"
              />
            </h3>
            <p className="mt-2 text-sm text-zinc-400">{c.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-800 px-3 py-0.5 text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <h3 className="mb-4 mt-12 flex items-center gap-2 text-lg font-semibold">
        <Briefcase size={18} /> {t("testimonials.heading")} {t("testimonials.highlight")}
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure key={item.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} size={13} className="fill-zinc-200 text-zinc-200" />
              ))}
            </div>
            <blockquote className="text-sm text-zinc-400">“{item.quote}”</blockquote>
            <figcaption className="mt-3 text-xs font-semibold text-zinc-300">
              {item.client}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function ContactTab() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const schema = z.object({
    name: z.string().min(2, t("form.required")),
    email: z.string().email(t("form.invalidEmail")),
    company: z.string().optional(),
    budget: z.string().optional(),
    message: z
      .string()
      .min(1, t("form.required"))
      .min(10, t("form.minMessage")),
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
    if (values.website) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none transition-colors placeholder:text-zinc-500 focus:border-zinc-500";

  return (
    <section>
      <Heading>
        {t("heading")} {t("highlight")}
      </Heading>
      <p className="mb-8 max-w-xl text-zinc-400">{t("lead")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input {...register("name")} placeholder={`${t("form.name")} *`} className={field} />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder={`${t("form.email")} *`}
              className={field}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input {...register("company")} placeholder={t("form.company")} className={field} />
          <input {...register("budget")} placeholder={t("form.budget")} className={field} />
        </div>
        <div>
          <textarea
            {...register("message")}
            placeholder={`${t("form.message")} *`}
            rows={5}
            className={cn(field, "resize-none")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
          )}
        </div>
        <p className="text-xs text-zinc-500">{t("form.requiredNote")}</p>
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
          className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white disabled:opacity-60"
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
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} /> {t("form.error")}
          </p>
        )}
      </form>
    </section>
  );
}
