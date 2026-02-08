'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

const faqData = [
  {
    question: 'What areas do you cover?',
    answer:
      'Aquapro Cleaning covers all of Essex and the surrounding counties, including Greater London for commercial contracts.',
  },
  {
    question: 'How does the quoting process work?',
    answer:
      'Simply fill out the online form with your details. For most standard jobs, we can provide a price immediately or within the hour. For larger commercial projects, a site visit may be required.',
  },
  {
    question: 'Are quotes free?',
    answer: 'Yes, 100%. All quotes are free and come with no obligation to book.',
  },
  {
    question: 'Are you registered and insured?',
    answer:
      "Absolutely. Aquapro Cleaning holds full public liability insurance up to \u00A35m and employer\u2019s liability insurance. Copies of certificates are available on request.",
  },
  {
    question: 'What are your hours of operation?',
    answer:
      'Our phone lines are open Monday to Saturday, 8am to 5pm. Cleaning teams can operate outside these hours for commercial contracts to minimise disruption.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards, bank transfers (BACS), and cash. Payment is typically due upon completion of the work.',
  },
  {
    question: 'Do you take away waste?',
    answer:
      'Yes, Aquapro Cleaning removes all moss, debris, and waste resulting from the cleaning process. We are licensed waste carriers.',
  },
  {
    question: 'Do you take on commercial work?',
    answer:
      'Yes, a significant portion of our business is commercial. We work with schools, offices, property management companies, and local councils across Essex.',
  },
  {
    question: 'Are your staff certified or licensed?',
    answer:
      'All technicians are fully trained, vetted, and wear full uniform. Aquapro Cleaning is certified for working at heights and uses professional-grade equipment.',
  },
  {
    question: 'Do you work with historic or delicate buildings?',
    answer:
      "Yes. We use Soft Wash technology for delicate surfaces like render, historic stone, and older roofs, which cleans effectively without the risk of high-pressure damage.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-20 pb-8 lg:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-neutral-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Aquapro Cleaning <span className="text-primary-700">FAQ</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-20">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-neutral-200">
              <button
                className="w-full flex items-start justify-between py-6 text-left group focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-neutral-900 font-bold text-lg md:text-xl pr-6 group-hover:text-primary-700 transition-colors">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <MinusCircle className="text-primary-500 flex-shrink-0 mt-0.5" size={24} />
                ) : (
                  <PlusCircle
                    className="text-neutral-300 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-0.5"
                    size={24}
                  />
                )}
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-neutral-500 text-base leading-relaxed pr-8 pb-6">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
