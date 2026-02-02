'use client';

import { useState } from 'react';
import { LandingLayout } from '@/components/layout';
import { type Job } from '@/lib/constants';
import {
  CareersHero,
  CareersBenefits,
  CareersJobBoard,
  CareersApplicationModal,
} from '@/features/careers/client';
import { ContactSection } from '@/features/home/client';

export function CareersPageClient() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <LandingLayout>
      {/* Hero Section with Search */}
      <CareersHero onJobSelect={setSelectedJob} />

      {/* Benefits Section */}
      <CareersBenefits />

      {/* Job Board */}
      <CareersJobBoard onApply={setSelectedJob} />

      {/* Contact Section */}
      <ContactSection />

      {/* Application Modal */}
      <CareersApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </LandingLayout>
  );
}
