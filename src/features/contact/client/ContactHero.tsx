'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, Phone, Mail, MapPin, Copy, Check } from 'lucide-react';
import { siteConfig, reviewStatsDisplay } from '@/lib/constants';

const HERO_BG = "/images/blake-window-cleaning.jpg";

export function ContactHero() {
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Lazy load: only load script when form is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load the Elfsight platform script only when visible
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const scriptSrc = 'https://elfsightcdn.com/platform.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isVisible]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(id);
    setTimeout(() => setCopiedState(null), 2000);
  };

  return (
    <div className="relative bg-[#0F172A] pt-8 pb-6 md:pb-12 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src={HERO_BG}
          alt="Clean Home Exterior"
          fill
          sizes="100vw"
          quality={65}
          className="object-cover grayscale mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center mb-12">

          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left mb-8 lg:mb-0">
            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-slate-300 text-xs lg:text-sm font-medium">{reviewStatsDisplay.averageRating} based on {reviewStatsDisplay.totalReviews} verified reviews</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 lg:mb-6">
              Contact <span className="text-[#1B9CB6]">Aquapro Cleaning</span>
            </h1>

            {/* Subtext */}
            <p className="text-base lg:text-lg font-medium text-slate-300 mb-8 lg:mb-12 max-w-lg sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              Aquapro Cleaning provides professional exterior cleaning
              services across Essex and East London. Call {siteConfig.contact.phone} or
              request a free, no-obligation quote using the form.
            </p>

            {/* Logos Section - Accreditations */}
            <div className="flex flex-col items-center lg:items-start gap-4 pt-8">
              <span className="text-slate-500 font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                Approved & Accredited By
              </span>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 items-center">
                {/* Google Guaranteed */}
                <div className="flex flex-col items-center group cursor-default">
                  <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-bold text-white">Google</span>
                  </div>
                  <div className="bg-green-700 text-[9px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-1 shadow-sm">
                    Guaranteed
                  </div>
                </div>

                {/* Smart Seal */}
                <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-lg font-black text-white italic tracking-tighter">
                    Smart
                  </span>
                  <span className="text-lg font-black text-slate-500 italic tracking-tighter">
                    Seal
                  </span>
                </div>

                {/* City & Guilds */}
                <div className="flex flex-col items-start leading-none opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex gap-0.5">
                    <span className="text-xs font-bold text-white">City&</span>
                  </div>
                  <span className="text-xs font-bold text-white">Guilds</span>
                  <div className="w-full h-[2px] bg-[#1B9CB6] mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Quote Widget */}
          <div ref={formRef} className="lg:col-span-5" id="quote-form">
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2 text-center lg:text-left">Get a Free Quote</h2>
              <p className="text-slate-500 text-sm mb-5 lg:mb-6 text-center lg:text-left">Enter your details below for a fast, fixed price.</p>

              {/* Elfsight Contact Form */}
              <div className="elfsight-app-59309e4b-fb3a-4595-86ba-1ada85aa4c3a" data-elfsight-app-lazy />

              {/* Noscript fallback for crawlers and users without JS */}
              <noscript>
                <div className="text-center py-4">
                  <p className="text-slate-600 mb-4">For a free quote, please contact us directly:</p>
                  <p className="font-bold text-lg text-slate-900 mb-2">
                    <a href={siteConfig.contact.phoneHref} className="hover:text-primary-600">{siteConfig.contact.phone}</a>
                  </p>
                  <p className="text-slate-600">
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary-600">{siteConfig.contact.email}</a>
                  </p>
                </div>
              </noscript>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1B9CB6]/20 border border-[#1B9CB6]/20 flex items-center justify-center text-[#1B9CB6] flex-shrink-0">
                <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-0.5">Call Us Now</p>
                <a href={siteConfig.contact.phoneHref} className="text-white font-bold text-sm lg:text-base hover:text-[#1B9CB6] transition-colors">{siteConfig.contact.phone}</a>
              </div>
              <button
                onClick={() => copyToClipboard(siteConfig.contact.phone, 'phone')}
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Copy phone number"
              >
                {copiedState === 'phone' ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1B9CB6]/20 border border-[#1B9CB6]/20 flex items-center justify-center text-[#1B9CB6] flex-shrink-0">
                <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-slate-500 text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-0.5">Email Us</p>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-white font-bold text-sm lg:text-base hover:text-[#1B9CB6] transition-colors truncate block">{siteConfig.contact.email}</a>
              </div>
              <button
                onClick={() => copyToClipboard(siteConfig.contact.email, 'email')}
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Copy email address"
              >
                {copiedState === 'email' ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1B9CB6]/20 border border-[#1B9CB6]/20 flex items-center justify-center text-[#1B9CB6] flex-shrink-0">
                <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-0.5">Location</p>
                <span className="text-white font-bold text-sm lg:text-base">{siteConfig.coverage}</span>
              </div>
              <button
                onClick={() => copyToClipboard(siteConfig.coverage, 'location')}
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Copy location"
              >
                {copiedState === 'location' ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactHero;
