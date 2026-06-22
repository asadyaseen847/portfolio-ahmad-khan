/**
 * Language-neutral content (proper nouns, numbers, links, tags).
 * Translatable prose lives in messages/<locale>.json.
 * Source of truth: docs/CONTENT.md
 */

export const PROFILE = {
  name: 'Ahmad Khan',
  fullName: 'Ahmad Ullah Khan',
  location: 'Birmingham / London, UK',
  rate: '$15/hr',
  email: 'ahmadkhan@mindwhiz.com',
  upwork: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776',
  linkedin: 'https://www.linkedin.com/',
  years: '2018 – 2026',
} as const

/** Trust signals from Upwork (numbers are language-neutral). */
export const trust = [
  { id: 'topRated', value: 'Top Rated' },
  { id: 'jss', value: '92%' },
  { id: 'earnings', value: '$4K+' },
  { id: 'jobs', value: '18' },
  { id: 'hours', value: '115' },
] as const

export const stats = [
  { id: 'clients', value: 30, suffix: '+' },
  { id: 'handles', value: 100, suffix: '+' },
  { id: 'dvc', value: 45, suffix: '+' },
  { id: 'events', value: 200, suffix: '+' },
] as const

/** icon = lucide-react icon name (resolved in the Services component). */
export const services = [
  { id: 'metaAds', icon: 'Megaphone' },
  { id: 'googlePpc', icon: 'MousePointerClick' },
  { id: 'linkedinAds', icon: 'Briefcase' },
  { id: 'smm', icon: 'Share2' },
  { id: 'instagram', icon: 'Camera' },
  { id: 'seo', icon: 'Search' },
  { id: 'content', icon: 'PenLine' },
  { id: 'emailSms', icon: 'Mail' },
  { id: 'wordpress', icon: 'Globe' },
  { id: 'design', icon: 'Palette' },
] as const

export const results = [
  { id: 'roas', metric: '7.36x' },
  { id: 'followers', metric: '48.5K' },
  { id: 'leads', metric: '5,000+' },
  { id: 'organicReach', metric: '2M+' },
  { id: 'linkedin', metric: '1,000+' },
  { id: 'seo', metric: '857' },
  { id: 'cpl', metric: '<PKR 50' },
  { id: 'youtube', metric: '10M+' },
] as const

export const experience = [
  { id: 'mindwhiz', company: 'MindWhiz', period: 'Jun 2021 — Present' },
  { id: 'metPakistan', company: 'Met Pakistan', period: 'Sep 2022 — May 2023' },
  {
    id: 'bloomwright',
    company: 'Bloomwright Realtors',
    period: 'Jan 2020 — Jun 2020',
  },
  {
    id: 'brandDigital',
    company: 'Brand and Digital',
    period: 'Oct 2019 — Apr 2021',
  },
  { id: 'brandzila', company: 'Brandzila', period: 'Jan 2019 — Dec 2019' },
] as const

export const certifications = [
  { id: 'emails', provider: 'LinkedIn Learning', date: 'Apr 2025' },
  { id: 'smStrategy', provider: 'LinkedIn Learning', date: 'Apr 2025' },
] as const

export const education = [
  {
    id: 'gcu',
    school: 'Glasgow Caledonian University — London',
    degree: 'MSc Computer Science (Business)',
  },
  {
    id: 'sargodha',
    school: 'University of Sargodha',
    degree: 'BSc Information Technology',
    period: '2015 – 2019',
  },
] as const

export const skills = [
  'Digital Marketing',
  'Social Media Management',
  'SEO',
  'Performance Marketing',
  'Google Ads',
  'Facebook Ads Manager',
  'PPC',
  'WordPress e-Commerce',
  'Instagram Marketing',
  'Paid Social',
  'Conversion Rate Optimization',
  'Content Marketing',
  'Email Marketing',
  'Go-to-Market Strategy',
  'Brand Strategy',
  'Lead Generation',
] as const

export const tools = [
  'Figma',
  'Photoshop',
  'Illustrator',
  'Premiere Pro',
  'Adobe XD',
  'Canva',
  'VS Code',
  'Git',
  'WordPress',
  'Webflow',
  'Wix',
  'Shopify',
  'Hostinger',
  'Slack',
] as const

export const testimonials = [
  {
    id: 'aisuretech',
    client: 'AI Sure Tech',
    rating: 5,
    amount: '$525',
    quote:
      "Ahmad did an outstanding job setting up and optimizing AI Sure Tech's social media profiles and launching our initial campaign. He was professional, responsive, and clearly experienced in building our presence.",
  },
  {
    id: 'webperf',
    client: 'Website Performance Optimization',
    rating: 5,
    amount: '$1,050',
    quote:
      'Ahmad was very easy to work with and very helpful. He went above and beyond what he had to do for us and worked overtime to meet our needs.',
  },
  {
    id: 'campaigns',
    client: 'Social Media Campaigns Setup',
    rating: 5,
    amount: '$200',
    quote:
      'Ahmad was fair, reliable, and a pleasure to work with. He delivered exactly what he promised and showed great flexibility whenever we needed guidance or support.',
  },
] as const

export type CaseStudy = {
  slug: string
  title: string
  role: string
  summary: string
  description: string[]
  deliverables?: string[]
  tags: string[]
  metrics?: { value: string; label: string }[]
  link: string
  accent: 'blue' | 'violet' | 'magenta'
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'meta-ads-creative',
    title: 'Meta Ads Creative Portfolio',
    role: 'Performance Marketing Creative Designer',
    summary:
      'Performance-focused Meta ad creatives that lift CTR, engagement, and conversion across Facebook & Instagram.',
    description: [
      'I design performance-focused Meta ad creatives that help brands improve click-through rates, engagement, and conversion performance across Facebook and Instagram campaigns.',
      'The system spans static ads, carousel creatives, retargeting ads, e-commerce creatives, lead-generation ads, UGC-style concepts, and full funnel-based creative systems — each mapped to a stage of the buyer journey.',
    ],
    deliverables: [
      'Static banner ads',
      'Carousel creatives',
      'Retargeting ads',
      'E-commerce creatives',
      'Lead generation ads',
      'UGC-style concepts',
    ],
    tags: ['Meta Ads', 'Retargeting', 'UGC', 'Creative Strategy'],
    metrics: [{ value: '7.36x', label: 'ROAS for ecommerce' }],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776?p=2056833593382891520',
    accent: 'violet',
  },
  {
    slug: 'creative-brand-design',
    title: 'Creative Strategist & Visual Brand Designer',
    role: 'Creative Director & Designer',
    summary:
      'Premium visual identities and social creatives that improve positioning, engagement, and brand perception.',
    description: [
      'I help brands build premium visual identities and social media creatives that improve positioning, engagement, and brand perception.',
      'Work covers brand systems, content templates, and campaign creative produced across the full Adobe suite, Figma, and Canva.',
    ],
    tags: ['Photoshop', 'Illustrator', 'Figma', 'Premiere Pro', 'Canva'],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776?p=2056825562955870208',
    accent: 'magenta',
  },
  {
    slug: 'social-growth-cyber-travel',
    title: 'Social Media Growth — Cybersecurity & Travel',
    role: 'Social Media Manager',
    summary:
      'Organic strategies that grew a cybersecurity firm and a travel brand to meaningful, credible audiences.',
    description: [
      'Managed and executed social media strategies that achieved significant organic growth.',
      'For a cybersecurity firm, increased LinkedIn followers by 1,000+ in five months, enhancing credibility with IT decision-makers. For a travel and tourism company, grew Instagram followers to 9,000+ and achieved 2M+ monthly organic reach within six months.',
    ],
    tags: ['Content Strategy', 'Community Management', 'Organic Growth'],
    metrics: [
      { value: '1,000+', label: 'LinkedIn followers / 5 mo' },
      { value: '2M+', label: 'Monthly organic reach' },
    ],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776?p=1967997655531307008',
    accent: 'blue',
  },
  {
    slug: 'travel-hospitality-case-study',
    title: 'Travel & Hospitality — Lead Gen Case Study',
    role: 'Social Media Marketing Specialist',
    summary:
      'SEO + landing pages + content + Meta ads generating 5,000+ leads and slashing cost per lead.',
    description: [
      'Designed and implemented digital marketing campaigns for a corporate travel company, combining SEO, optimized landing pages, content strategy, and Meta ads.',
      'Generated 5,000+ qualified leads in four months while reducing cost per lead from PKR 115 to under PKR 50. Also delivered targeted restaurant campaigns securing 33 bookings in a single month.',
    ],
    tags: ['Lead Generation', 'Facebook Ads', 'CRO', 'SEO'],
    metrics: [
      { value: '5,000+', label: 'Leads in 4 months' },
      { value: '<PKR 50', label: 'Cost per lead' },
    ],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776?p=1968030024182808576',
    accent: 'blue',
  },
  {
    slug: 'tempura-halal-content',
    title: 'Social Content for TEMPURA Halal',
    role: 'Social Media Content Writer & Marketing Specialist',
    summary:
      'Scroll-stopping FB/IG content — hooks, descriptions, and CTAs — that drove engagement and orders.',
    description: [
      "Created engaging social media content for TEMPURA Halal's Facebook and Instagram to promote their food offerings.",
      'Developed attention-grabbing hooks, compelling descriptions, and clear CTAs to increase engagement and drive orders — highlighting signature dishes such as Spicy Noodles, Chilli Chicken Dry, and Chicken Karahi.',
    ],
    tags: ['Content Writing', 'AI Content', 'Social Media Marketing'],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776?p=1973848283379126272',
    accent: 'magenta',
  },
  {
    slug: 'seo-organic-growth',
    title: 'SEO Strategy for Organic Growth',
    role: 'Digital Marketing & SEO Specialist',
    summary:
      'A complete SEO program that doubled traffic with zero paid spend.',
    description: [
      'Developed and executed a complete SEO strategy to help a business grow its online presence without paid ads.',
      'Conducted in-depth keyword research, optimized on-page elements, and implemented technical SEO fixes — achieving 857 organic clicks, 24.7K impressions, and 100% growth in traffic.',
    ],
    tags: ['Keyword Research', 'Technical SEO', 'On-Page SEO'],
    metrics: [
      { value: '857', label: 'Organic clicks' },
      { value: '24.7K', label: 'Impressions' },
      { value: '100%', label: 'Traffic growth' },
    ],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776?p=1973498281259790336',
    accent: 'blue',
  },
  {
    slug: 'meta-ads-12x12',
    title: 'Meta Ads — 12x12 Writing Challenge',
    role: 'Performance Marketing Manager',
    summary:
      'A structured acquisition system on Meta to drive new member registrations for a global writing community.',
    description: [
      '12x12 Picture Book Writing Challenge is a global writing community that helps authors stay consistent through structured challenges and support.',
      'I managed Meta ads campaigns to build a structured acquisition system and drive new member registrations — membership growth as the core objective.',
    ],
    tags: ['Meta Ads', 'Acquisition', 'Membership Growth'],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776',
    accent: 'violet',
  },
  {
    slug: 'whistic-website',
    title: 'Whistic Website',
    role: 'Full Stack Developer',
    summary: 'Modern third-party risk management platform built on Craft CMS.',
    description: [
      'Whistic equips InfoSec teams to easily assess vendors and confidently share security posture from an all-in-one, AI-driven platform.',
      'Delivered front-end build and CMS implementation on Craft CMS.',
    ],
    tags: ['Craft CMS', 'Full Stack', 'Web Development'],
    link: 'https://www.upwork.com/freelancers/~01ce451dc2d6bd7776?p=1835213470412197888',
    accent: 'violet',
  },
]

export const navSections = [
  'about',
  'services',
  'work',
  'results',
  'experience',
  'skills',
  'certifications',
  'contact',
] as const
