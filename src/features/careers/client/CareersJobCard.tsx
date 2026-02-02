'use client';

import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import { type Job } from '@/lib/constants';

interface CareersJobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export function CareersJobCard({ job, onApply }: CareersJobCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-brand-200 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 mb-2">
            {job.department}
          </span>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
            {job.title}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-brand-500" />
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-brand-500" />
          {job.type}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-brand-500" />
          {job.salary}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-brand-500" />
          {job.postedDate || 'Recently'}
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-6 line-clamp-3">{job.description}</p>

      <button
        onClick={() => onApply(job)}
        className="w-full py-2.5 px-4 bg-cta hover:bg-cta-hover text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg shadow-cta/10"
      >
        Apply Now
      </button>
    </div>
  );
}
