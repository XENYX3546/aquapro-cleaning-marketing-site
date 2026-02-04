'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Star, Clock, ChevronRight } from 'lucide-react';
import { jobs, type Job, ctaLinks, reviewStatsDisplay } from '@/lib/constants';

interface CareersHeroProps {
  onJobSelect: (job: Job) => void;
}

export function CareersHero({ onJobSelect }: CareersHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter jobs for the dropdown based on search query
  const jobSuggestions = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      searchQuery === '' ||
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query)
    );
  });

  const handleSearchClick = () => {
    const jobsSection = document.getElementById('jobs');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJobSelect = (job: Job) => {
    onJobSelect(job);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[#0F172A] pt-8 pb-32 md:pb-36 lg:pb-40 overflow-visible">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blake-van-image.jpg"
            alt="Aquapro professional carpet cleaning"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={65}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/95 to-[#0F172A]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left mb-8 lg:mb-0">
            {/* Star Rating Trust Signal */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-slate-300 text-xs lg:text-sm font-medium">
                {reviewStatsDisplay.averageRating} based on {reviewStatsDisplay.totalReviews} verified reviews
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 lg:mb-6">
              Complete Exterior & <span className="text-brand-500">Interior Cleaning Solutions</span>
            </h1>

            <p className="text-base lg:text-lg font-medium text-slate-300 mb-8 lg:mb-12 max-w-lg sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              Join Essex&apos;s fastest-growing cleaning company. We restore homes and
              businesses to their original shine, from roofs to carpets.
            </p>

            {/* Audience Tabs */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center lg:justify-start gap-6 sm:gap-8">
              {/* Job Seekers Group */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 tracking-widest uppercase block">
                  For Job Seekers
                </span>
                <button
                  onClick={handleSearchClick}
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-slate-100 transition-colors shadow-lg shadow-white/5"
                >
                  View Open Positions
                </button>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-16 bg-slate-700" />

              {/* Businesses Group */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 tracking-widest uppercase block">
                  For Clients
                </span>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={ctaLinks.quote}
                    className="bg-transparent border-2 border-slate-700 text-white px-6 py-3.5 rounded-full font-bold text-base md:text-lg hover:bg-slate-800 hover:border-slate-600 transition-all"
                  >
                    Get a Free Quote
                  </Link>
                  <Link
                    href="/services"
                    className="bg-transparent border-2 border-slate-700 text-white px-6 py-3.5 rounded-full font-bold text-base md:text-lg hover:bg-slate-800 hover:border-slate-600 transition-all"
                  >
                    Our Services
                  </Link>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute bottom-0 left-0 w-full z-20 translate-y-1/2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[2rem] shadow-2xl p-5 md:p-4 flex flex-col lg:flex-row items-center gap-4 lg:gap-2 border border-slate-100 relative">
              {/* Keyword Input */}
              <div className="flex-1 w-full relative group h-14 md:h-16 flex items-center px-4 md:px-6 z-30 border-b lg:border-b-0 border-slate-100">
                <Search
                  className="text-slate-500 group-focus-within:text-cta transition-colors mr-4 shrink-0"
                  size={24}
                />
                <div className="relative w-full h-full flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    placeholder="Find your role (e.g. Technician)"
                    className="w-full h-full bg-transparent text-slate-900 placeholder:text-slate-500 text-lg font-medium outline-none truncate"
                    autoComplete="off"
                  />

                  {/* Dropdown Menu */}
                  {isDropdownOpen && jobSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-[calc(100%+3.5rem)] -ml-14 md:w-[calc(100%+3rem)] md:-ml-14 bg-white rounded-2xl shadow-xl border border-slate-100 mt-4 py-2 overflow-hidden z-50 max-h-96 overflow-y-auto">
                      <div className="px-6 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-between items-center bg-slate-50/50">
                        <span>Available Roles</span>
                        <span className="text-slate-300">{jobSuggestions.length} found</span>
                      </div>
                      {jobSuggestions.map((job) => (
                        <button
                          key={job.id}
                          onClick={() => handleJobSelect(job)}
                          className="w-full text-left px-6 py-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-all flex items-center justify-between group"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-slate-700 group-hover:text-brand-600 transition-colors text-base mb-1 truncate">
                              {job.title}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                              <span className="flex items-center gap-1">
                                <MapPin size={12} /> {job.location}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {job.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-brand-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 pl-2">
                            <span className="text-xs font-bold mr-1 hidden sm:inline">View</span>
                            <ChevronRight size={16} />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-slate-200" />
              </div>

              {/* Location Input */}
              <div className="flex-1 w-full relative group h-14 md:h-16 flex items-center px-4 md:px-6 z-20 border-b lg:border-b-0 border-slate-100">
                <MapPin
                  className="text-slate-500 group-focus-within:text-cta transition-colors mr-4 shrink-0"
                  size={24}
                />
                <div className="flex flex-col justify-center w-full">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide hidden md:block">
                    City or Postcode
                  </span>
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Essex, CM3"
                    className="w-full bg-transparent text-slate-900 text-base md:text-lg font-bold outline-none placeholder:text-slate-500 truncate"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearchClick}
                className="w-full lg:w-auto px-10 py-4 bg-cta hover:bg-cta-hover text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl whitespace-nowrap shadow-cta/20 z-20"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for Floating Search Bar */}
      <div className="h-32 md:h-20 bg-slate-50" />
    </>
  );
}
