'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { jobs, filterJobs, type Job, siteConfig } from '@/lib/constants';
import { CareersJobCard } from './CareersJobCard';

interface CareersJobBoardProps {
  onApply: (job: Job) => void;
  searchQuery?: string;
  locationQuery?: string;
}

export function CareersJobBoard({
  onApply,
  searchQuery = '',
  locationQuery = '',
}: CareersJobBoardProps) {
  const [filter, setFilter] = useState<'All' | 'Exterior' | 'Interior'>('All');

  const filteredJobs = filterJobs(jobs, filter, searchQuery, locationQuery);

  return (
    <section id="jobs" className="py-24 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left">
          <div className="w-full md:w-auto">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-3 block">
              Recruitment
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Current <span className="text-brand-600">Openings</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Ready to work with the best equipment in the business?
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end w-full md:w-auto">
            <button
              onClick={() => setFilter('All')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                filter === 'All'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              View All
            </button>
            <button
              onClick={() => setFilter('Exterior')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                filter === 'Exterior'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Exterior
            </button>
            <button
              onClick={() => setFilter('Interior')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                filter === 'Interior'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Interior
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <CareersJobCard key={job.id} job={job} onApply={onApply} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500">No positions found for this category.</p>
              <button
                onClick={() => setFilter('All')}
                className="text-brand-600 font-bold mt-2 hover:underline"
              >
                View all jobs
              </button>
            </div>
          )}
        </div>

        {/* Talent Network Banner */}
        <div className="relative rounded-[2.5rem] bg-[#F0F5FA] px-6 py-8 md:py-10 md:px-12 overflow-hidden">
          {/* Left Decorative Circle */}
          <div className="absolute -left-20 top-1/2 w-[30rem] h-[30rem] bg-white rounded-full -translate-y-1/2 -translate-x-1/2" />

          {/* Right Decorative Circle */}
          <div className="absolute -right-20 -bottom-20 w-[40rem] h-[40rem] bg-[#E7F0F8] rounded-full translate-x-1/4 translate-y-1/4" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatars */}
            <div className="flex items-center justify-center -space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden relative shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
                  alt="Aquapro team member"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-14 h-14 rounded-full border-[3px] border-white overflow-hidden relative z-10 shadow-md -mt-2">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Aquapro hiring manager"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden relative shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
                  alt="Aquapro team member"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Don&apos;t see the right role?
            </h3>

            <p className="text-slate-500 text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
              Call us on{' '}
              <span className="font-bold text-slate-900">{siteConfig.contact.phone}</span>,
              lines open 8am-5pm Mon-Sat.{' '}
              <br className="hidden md:inline" />
              Or email{' '}
              <span className="font-bold text-slate-900">careers@aquapro.co.uk</span>
            </p>

            <a
              href="mailto:careers@aquapro.co.uk"
              className="bg-cta hover:bg-cta-hover text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-base md:text-lg shadow-cta/20"
            >
              Join our Talent Network <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
