'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { faqData as defaultFaqData } from '@/lib/constants';

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSectionProps = {
  /** Custom FAQ data - defaults to global faqData from constants */
  faqs?: FAQItem[];
  /** Background variant */
  variant?: 'white' | 'slate';
  /** Custom tagline above the title */
  tagline?: string;
  /** Custom title - supports React nodes for styling */
  title?: React.ReactNode;
  /** Subtitle displayed under the title */
  subtitle?: string;
  /** Additional className for the section */
  className?: string;
};

export function FAQSection({
  faqs = defaultFaqData,
  variant = 'slate',
  tagline = 'Common Questions',
  title,
  subtitle = 'Wondering how it all works? These are the questions we get asked the most.',
  className = '',
}: FAQSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const bgClass = variant === 'white' ? 'bg-white' : 'bg-slate-50 border-t border-slate-200';
  const paddingClass = 'py-16 lg:py-24';

  const defaultTitle = (
    <>
      Frequently Asked <span className="text-brand-500">Questions</span>
    </>
  );

  return (
    <section className={`${paddingClass} ${bgClass} ${className}`}>
      {/* FAQPage schema is rendered at page level to avoid duplicates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
            {tagline}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title || defaultTitle}
          </h2>
          {subtitle && (
            <p className="text-slate-600 text-base md:text-lg mt-4 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-slate-200">
              <button
                className="w-full flex items-start justify-between py-6 text-left group focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-slate-900 font-bold text-lg md:text-xl pr-6 group-hover:text-brand-500 transition-colors">
                  {item.question}
                </span>
                {openIndexes.has(index) ? (
                  <MinusCircle className="text-brand-500 flex-shrink-0 mt-0.5" size={24} />
                ) : (
                  <PlusCircle className="text-slate-300 group-hover:text-brand-500 transition-colors flex-shrink-0 mt-0.5" size={24} />
                )}
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openIndexes.has(index)
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-slate-600 text-base leading-relaxed pr-8 pb-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
