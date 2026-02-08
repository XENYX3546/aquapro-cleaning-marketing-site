'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Mail,
  Copy,
  Check,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  Sparkles,
  Heart,
  Zap,
  Award,
} from 'lucide-react';
import { type Job, careersBenefits } from '@/lib/constants';

interface CareersApplicationModalProps {
  job: Job | null;
  onClose: () => void;
}

// Icon mapping for benefits
const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={16} />,
  Heart: <Heart size={16} />,
  Zap: <Zap size={16} />,
  Award: <Award size={16} />,
};

export function CareersApplicationModal({ job, onClose }: CareersApplicationModalProps) {
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (job) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [job]);

  if (!job) {return null;}

  const emailAddress = 'bookings@aquapro.co.uk';
  const emailSubject = `Application for ${job.title} - ${job.location}`;
  const emailBody = `Dear Hiring Team,%0D%0A%0D%0AI am writing to apply for the ${job.title} position based in ${job.location}.%0D%0A%0D%0APlease find my CV attached.%0D%0A%0D%0ABest regards,`;
  const mailtoLink = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get job-specific image
  const getJobImage = () => {
    if (job.title.toLowerCase().includes('exterior'))
      {return '/images/blake-window-cleaning.jpg';}
    if (job.title.toLowerCase().includes('interior'))
      {return '/images/blake-van-image.jpg';}
    if (job.title.toLowerCase().includes('sales'))
      {return '/images/blake-van-image.jpg';}
    return '/images/blake-van-image.jpg';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl md:rounded-2xl w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] shadow-2xl flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-slate-500 rounded-full transition-all shadow-sm hover:shadow-md hover:text-slate-900 md:top-6 md:right-6"
        >
          <X size={20} />
        </button>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Image Section */}
          <div className="h-48 md:h-64 w-full relative bg-slate-100">
            <Image
              src={getJobImage()}
              alt={job.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />

            {/* Floating Tags */}
            <div className="absolute bottom-4 left-4 md:left-8 flex gap-2">
              <span className="bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm border border-slate-100">
                {job.department}
              </span>
              <span className="bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm">
                {job.type}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Main Column */}
            <div className="flex-1 p-8 md:p-12 lg:p-16">
              {/* Header */}
              <div className="mb-8 border-b border-slate-100 pb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                  {job.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-slate-500 font-medium text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-brand-500" />
                    {job.location}
                  </div>
                  <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-brand-500" />
                    {job.salary}
                  </div>
                  <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-brand-500" />
                    {job.postedDate || 'Recently posted'}
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                {/* Description */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    About the Role
                  </h3>
                  <div className="prose prose-slate text-slate-600 leading-relaxed max-w-none">
                    <p>{job.description}</p>
                    <p className="mt-4">
                      At Aquapro, we pride ourselves on precision and reliability. In this
                      role, you will be an integral part of our {job.department.toLowerCase()}{' '}
                      team, ensuring our high standards are met for every client.
                    </p>
                  </div>
                </section>

                {/* Requirements List */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
                  <div className="bg-slate-50 rounded-xl p-1">
                    {job.requirements.map((req, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 md:px-4 border-b border-slate-100 last:border-0"
                      >
                        <div className="mt-0.5 text-brand-600">
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="text-slate-700 font-medium">{req}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Benefits Grid */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Benefits & Perks</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {careersBenefits.slice(0, 4).map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:border-brand-100 transition-colors"
                      >
                        <div className="text-brand-600 bg-brand-50 p-2 rounded-md shrink-0">
                          {iconMap[benefit.icon] || <Sparkles size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{benefit.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar Column (Desktop) */}
            <div className="hidden lg:block w-96 bg-slate-50 border-l border-slate-200 p-8 lg:p-12 shrink-0">
              <div className="sticky top-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Interested?</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    We review applications within 24 hours. Send us your CV today.
                  </p>

                  <a
                    href={mailtoLink}
                    className="w-full bg-cta hover:bg-cta-hover text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-3 shadow-lg shadow-cta/10 hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <Mail size={18} />
                    Apply via Email
                  </a>

                  <button
                    onClick={handleCopy}
                    className="w-full py-2.5 px-4 bg-transparent border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-medium rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    {copied ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                    {copied ? 'Address Copied' : 'Copy Email Address'}
                  </button>
                </div>

                {/* Recruiter Profile */}
                <div className="flex items-center gap-3 px-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
                      alt="Sarah Jenkins - Aquapro Recruitment Team"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                    <p className="text-xs text-slate-500">Recruitment Team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Footer */}
        <div className="lg:hidden p-4 bg-white border-t border-slate-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
          <a
            href={mailtoLink}
            className="w-full bg-cta hover:bg-cta-hover text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
