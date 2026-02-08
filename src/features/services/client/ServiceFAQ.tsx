'use client';

import { useState } from 'react';
import { Container, Section, Icon, AnimatedSection } from '@/components/ui';
import { cn } from '@/lib/utils';
import { type Service } from '@/lib/constants';

type ServiceFAQProps = {
  service: Service;
};

export function ServiceFAQ({ service }: ServiceFAQProps) {
  return (
    <Section className="bg-white">
      <Container>
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Common questions about our {service.name.toLowerCase()} service
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {service.faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-neutral-900">{question}</span>
        <Icon
          name={isOpen ? 'chevron-down' : 'chevron-right'}
          size={20}
          className="text-neutral-400 flex-shrink-0 ml-4"
        />
      </button>
      <div className={cn('collapsible', isOpen && 'is-open')}>
        <div>
          <p className="pb-5 text-neutral-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}
