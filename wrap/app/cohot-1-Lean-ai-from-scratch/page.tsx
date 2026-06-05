'use client';

import React from 'react';
import Navbar from './_components/Navbar';
import HeroSection from './_components/HeroSection';
import WorkshopStats from './_components/WorkshopStats';
import WorkshopHighlights from './_components/WorkshopHighlights';
import WhatWeCovered from './_components/WhatWeCovered';
import TopPerformers from './_components/TopPerformers';
import ParticipantFeedback from './_components/ParticipantFeedback';
import FeedbackInsights from './_components/FeedbackInsights';
import CertificateSection from './_components/CertificateSection';
import ResourcesHub from './_components/ResourcesHub';
import FounderSection from './_components/FounderSection';
import NextWorkshopSection from './_components/NextWorkshopSection';
import CommunitySection from './_components/CommunitySection';
import FAQ from './_components/FAQ';
import Footer from './_components/Footer';

export default function WorkshopShowcasePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#07130d] font-sans selection:bg-emerald-500/10 selection:text-[#0b3d2b] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <WorkshopStats />
      <WorkshopHighlights />
      <WhatWeCovered />
      <TopPerformers />
      <ParticipantFeedback />
      <FeedbackInsights />
      <CertificateSection />
      <ResourcesHub />
      <FounderSection />
      <NextWorkshopSection />
      <CommunitySection />
      <FAQ />
      <Footer />
    </div>
  );
}
