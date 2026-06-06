import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vasudev AI Academy | Cohort #02: Build With AI — Websites, Apps & Agents',
  description:
    'Join Cohort #02 at Vasudev AI Academy — a hands-on 7-day bootcamp where you go from AI User to AI Builder. Build websites, AI apps, agents & automations using the latest AI tools. Limited seats — join the waitlist now.',
  keywords: [
    'Build with AI bootcamp',
    'AI bootcamp India',
    'Cohort 2 Vasudev AI',
    'vibe coding workshop',
    'AI agents course',
    'AI automation bootcamp',
    'learn AI tools 2025',
    'Vasudev AI Academy',
  ],
  openGraph: {
    title: 'Cohort #02: Build With AI | Vasudev AI Academy',
    description:
      'Go from AI User to AI Builder in 7 days. Build real websites, apps, AI agents & automations. Join the Cohort #02 waitlist at Vasudev AI Academy.',
    type: 'website',
  },
};

export default function Cohort2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
