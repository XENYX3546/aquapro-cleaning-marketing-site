'use client';

import { Container, Section, Button, Icon } from '@/components/ui';
import { ctaLinks, siteConfig } from '@/lib/constants';

export function CTASection() {
  return (
    <Section className="bg-primary-600 py-12 md:py-16">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-white">
            Get Your Free Quote
          </h2>

          <p className="mt-3 text-primary-100">
            No obligation, no hidden costs.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href={ctaLinks.quote}
              variant="secondary"
              size="lg"
            >
              Request a Quote
            </Button>
            <Button
              href={ctaLinks.call}
              variant="ghost"
              size="lg"
              className="ring-2 ring-inset ring-white text-white hover:bg-white/10"
            >
              <Icon name="phone" size={18} className="mr-2" />
              {siteConfig.contact.phone}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
