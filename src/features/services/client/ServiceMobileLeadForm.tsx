'use client';

import { LeadForm } from '@/components/ui/LeadForm';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';

interface ServiceMobileLeadFormProps {
  service: Service;
  location?: Location;
}

export function ServiceMobileLeadForm({ service, location }: ServiceMobileLeadFormProps) {
  return (
    <div className="lg:hidden px-4 pb-16 bg-slate-50">
      <div className="max-w-md mx-auto">
        <LeadForm
          id="mobile-mid-form"
          title={location ? `Get Your Quote in ${location.name}` : `Get Your ${service.shortName} Quote`}
          subtitle={location
            ? `Professional ${service.name.toLowerCase()} in ${location.name}. Fast & free quote.`
            : `Professional ${service.name.toLowerCase()}. Fast & free quote.`
          }
        />
      </div>
    </div>
  );
}

export default ServiceMobileLeadForm;
