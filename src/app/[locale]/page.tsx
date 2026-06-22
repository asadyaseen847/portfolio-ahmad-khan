import { setRequestLocale } from "next-intl/server";
import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/sections/Hero";
import ImageShowcase from "@/components/sections/ImageShowcase";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Results from "@/components/sections/Results";
import Experience from "@/components/sections/Experience";
import SkillsTools from "@/components/sections/SkillsTools";
import Testimonials from "@/components/sections/Testimonials";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SiteShell>
      <Hero />
      <ImageShowcase />
      <About />
      <Services />
      <Work />
      <Results />
      <Experience />
      <SkillsTools />
      <Testimonials />
      <Certifications />
      <Contact />
    </SiteShell>
  );
}
