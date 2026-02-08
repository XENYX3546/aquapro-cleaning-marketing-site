'use client';

import { LeadForm } from '@/components/ui/LeadForm';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { getServiceKeywords } from '@/lib/constants';

interface ServiceMobileLeadFormProps {
  service: Service;
  location?: Location;
}

export function ServiceMobileLeadForm({ service, location }: ServiceMobileLeadFormProps) {
  const keywords = getServiceKeywords(service.slug);
  const variation = keywords.variations[4] ?? keywords.primary;

  return (
    <div className="lg:hidden px-4 pb-16 bg-slate-50">
      <div className="max-w-md mx-auto">
        <LeadForm
          id="mobile-mid-form"
          title={location ? `Get My Free ${location.name} Quote` : `Get My Free ${keywords.primary} Quote`}
          subtitle={location
            ? `Professional ${variation.toLowerCase()} ${location.name}. Fast & free quote.`
            : `Professional ${variation.toLowerCase()}. Fast & free quote.`
          }
        />
      </div>
    </div>
  );
}

export default ServiceMobileLeadForm;
