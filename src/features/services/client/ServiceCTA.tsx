'use client';

import { Container, Section, Button, Icon, AnimatedSection } from '@/components/ui';
import { ctaLinks, siteConfig, type Service } from '@/lib/constants';

type ServiceCTAProps = {
  service: Service;
};

export function ServiceCTA({ service }: ServiceCTAProps) {
  return (
    <Section className="bg-primary-600 relative overflow-hidden">
      <Container>
        <AnimatedSection className="max-w-2xl mx-auto text-center relative z-10" stagger>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready for Professional {service.name}?
          </h2>

          <p className="mt-4 text-lg text-primary-100">
            Get a free, no-obligation quote for your {service.name.toLowerCase()} needs.
            We serve Essex and surrounding areas.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href={ctaLinks.quote}
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Get a Free Quote
            </Button>
            <Button
              href={ctaLinks.call}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Icon name="phone" size={18} className="mr-2" />
              {siteConfig.contact.phone}
            </Button>
          </div>
        </AnimatedSection>
      </Container>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-700 rounded-full opacity-50" />
      </div>
    </Section>
  );
}
