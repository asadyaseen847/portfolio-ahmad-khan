import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProfileLayout from "@/components/v2/ProfileLayout";
import { PROFILE } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: `${PROFILE.name} — Profile`, description: t("description") };
}

export default async function V2Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProfileLayout />;
}
