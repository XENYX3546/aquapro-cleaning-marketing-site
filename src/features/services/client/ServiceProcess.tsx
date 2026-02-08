'use client';

import { Container, Section, AnimatedSection, AnimatedDiv } from '@/components/ui';
import { type Service } from '@/lib/constants';

type ServiceProcessProps = {
  service: Service;
};

export function ServiceProcess({ service }: ServiceProcessProps) {
  return (
    <Section className="bg-neutral-50">
      <Container>
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Our simple {service.shortName.toLowerCase()} cleaning process
          </p>
        </AnimatedSection>

        <AnimatedDiv className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger>
          {service.process.map((step) => (
            <div
              key={step.step}
              className="relative bg-white rounded-xl p-6 border border-neutral-200"
            >
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                {step.step}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </AnimatedDiv>
      </Container>
    </Section>
  );
}
