'use client';

import { Container, Section, Icon, AnimatedSection, AnimatedDiv } from '@/components/ui';
import { type Service } from '@/lib/constants';

type ServiceBenefitsProps = {
  service: Service;
};

export function ServiceBenefits({ service }: ServiceBenefitsProps) {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefits list */}
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Why Choose Our {service.name}?
            </h2>
            <AnimatedDiv className="space-y-4" stagger>
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="check" size={14} className="text-primary-600" />
                  </div>
                  <span className="text-neutral-700">{benefit}</span>
                </div>
              ))}
            </AnimatedDiv>
          </AnimatedSection>

          {/* Features list */}
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              What&apos;s Included
            </h2>
            <AnimatedDiv className="space-y-4" stagger>
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="check" size={14} className="text-primary-600" />
                  </div>
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </AnimatedDiv>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
