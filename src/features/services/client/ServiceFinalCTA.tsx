'use client';

import Image from 'next/image';
import { LeadForm } from '@/components/ui/LeadForm';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';

const TEAM_IMAGE = "/images/blake-van-image.jpg";

interface ServiceFinalCTAProps {
  service: Service;
  location?: Location;
}

export function ServiceFinalCTA({ service, location }: ServiceFinalCTAProps) {
  return (
    <section className="relative pt-6 pb-16 overflow-hidden bg-white flex items-center justify-center lg:hidden">
      {/* Background Media with Overlay */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-0 bg-slate-950">
        <Image
          src={TEAM_IMAGE}
          alt="Aquapro Team"
          fill
          sizes="100vw"
          quality={65}
          className="object-cover object-center opacity-50"
        />
        {/* Base Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/[0.65] pointer-events-none" />

        {/* Soft Transition Gradient */}
        <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md px-4 mx-auto">
        <LeadForm
            id="final-cta"
            title={location ? `Get My Free Quote in ${location.name}` : `Get My Free ${service.shortName} Quote`}
            subtitle="Get your free, no-obligation quote today."
        />
      </div>
    </section>
  );
}

export default ServiceFinalCTA;
