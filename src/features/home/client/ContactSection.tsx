'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Lock, Star, Copy, Check } from 'lucide-react';
import { siteConfig, getServiceSpecificReviews, getAllReviews, type Review } from '@/lib/constants';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 ml-2 rounded-md hover:bg-white/20 text-slate-300 hover:text-white transition-all focus:outline-none"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

interface ContactSectionProps {
  /** Service ID to show service-specific testimonial */
  serviceId?: string;
  /** Optional pre-fetched review for SSR */
  topReview?: Review;
}

// Service-specific CTA copy for stronger conversions
const SERVICE_CTA_CONFIG: Record<string, { headline: string; subheadline: string; formTitle: string; formSubtitle: string; buttonText: string }> = {
  'carpet-cleaning': {
    headline: 'Get Your Carpet Cleaning Quote',
    subheadline: 'Deep clean pricing tailored to your home. We remove what others leave behind.',
    formTitle: 'Your Free Carpet Quote',
    formSubtitle: 'Tell us about your carpets and we\'ll provide a fixed price.',
    buttonText: 'Request My Carpet Quote',
  },
  'upholstery-cleaning': {
    headline: 'Get Your Upholstery Quote',
    subheadline: 'Restore your sofas and chairs to like-new condition.',
    formTitle: 'Your Free Upholstery Quote',
    formSubtitle: 'Describe your furniture and we\'ll price it up.',
    buttonText: 'Request My Upholstery Quote',
  },
  'stain-removal': {
    headline: 'Get Your Stain Removal Quote',
    subheadline: 'Stubborn stains? We specialise in removing what others can\'t.',
    formTitle: 'Your Free Stain Removal Quote',
    formSubtitle: 'Tell us about the stain and we\'ll advise on the best solution.',
    buttonText: 'Request My Stain Quote',
  },
  'mattress-cleaning': {
    headline: 'Get Your Mattress Cleaning Quote',
    subheadline: 'Deep sanitisation for a healthier night\'s sleep.',
    formTitle: 'Your Free Mattress Quote',
    formSubtitle: 'Tell us about your mattress and we\'ll provide pricing.',
    buttonText: 'Request My Mattress Quote',
  },
  'roof-cleaning': {
    headline: 'Get Your Roof Cleaning Quote',
    subheadline: 'Protect your roof from moss and algae damage. Extend its lifespan.',
    formTitle: 'Your Free Roof Quote',
    formSubtitle: 'Describe your roof and we\'ll provide a no-obligation price.',
    buttonText: 'Request My Roof Quote',
  },
  'pressure-washing': {
    headline: 'Get Your Pressure Washing Quote',
    subheadline: 'Restore driveways, patios and paths to their original condition.',
    formTitle: 'Your Free Pressure Washing Quote',
    formSubtitle: 'Tell us what needs cleaning and we\'ll price it up.',
    buttonText: 'Request My Driveway Quote',
  },
  'gutter-cleaning': {
    headline: 'Get Your Gutter Cleaning Quote',
    subheadline: 'Prevent water damage with professionally cleared gutters.',
    formTitle: 'Your Free Gutter Quote',
    formSubtitle: 'Tell us about your property and we\'ll provide pricing.',
    buttonText: 'Request My Gutter Quote',
  },
  'window-cleaning': {
    headline: 'Get Your Window Cleaning Quote',
    subheadline: 'Crystal clear, streak-free windows inside and out.',
    formTitle: 'Your Free Window Quote',
    formSubtitle: 'Tell us about your windows and we\'ll price it up.',
    buttonText: 'Request My Window Quote',
  },
  'conservatory-cleaning': {
    headline: 'Get Your Conservatory Quote',
    subheadline: 'Restore light and clarity to your conservatory.',
    formTitle: 'Your Free Conservatory Quote',
    formSubtitle: 'Describe your conservatory and we\'ll provide pricing.',
    buttonText: 'Request My Conservatory Quote',
  },
  'solar-panel-cleaning': {
    headline: 'Get Your Solar Panel Quote',
    subheadline: 'Maximise energy output with professionally cleaned panels.',
    formTitle: 'Your Free Solar Panel Quote',
    formSubtitle: 'Tell us about your setup and we\'ll price it up.',
    buttonText: 'Request My Solar Quote',
  },
  'patio-cleaning': {
    headline: 'Get Your Patio Cleaning Quote',
    subheadline: 'Revive your outdoor space. Remove algae, moss and grime.',
    formTitle: 'Your Free Patio Quote',
    formSubtitle: 'Describe your patio and we\'ll provide a fixed price.',
    buttonText: 'Request My Patio Quote',
  },
  'render-cleaning': {
    headline: 'Get Your Render Cleaning Quote',
    subheadline: 'Restore your render to its original colour without damage.',
    formTitle: 'Your Free Render Quote',
    formSubtitle: 'Tell us about your property and we\'ll price it up.',
    buttonText: 'Request My Render Quote',
  },
};

const DEFAULT_CTA_CONFIG = {
  headline: 'Get Your Free Quote',
  subheadline: 'Professional cleaning services throughout Essex. Fully insured with a satisfaction guarantee.',
  formTitle: 'Request Your Quote',
  formSubtitle: 'Tell us what you need and we\'ll provide a fixed price.',
  buttonText: 'Request My Free Quote',
};

// Max characters for testimonial to fit without truncation
const MAX_TESTIMONIAL_LENGTH = 120;

export function ContactSection({ serviceId, topReview }: ContactSectionProps) {
  // Get service-specific CTA config
  const ctaConfig = serviceId && SERVICE_CTA_CONFIG[serviceId]
    ? SERVICE_CTA_CONFIG[serviceId]
    : DEFAULT_CTA_CONFIG;

  // Get the top review that fits: filter by length, then pick highest scoring
  const getTopFittingReview = (reviews: Review[]): Review => {
    const fitting = reviews.filter(r => r.text.length <= MAX_TESTIMONIAL_LENGTH);
    return fitting[0] || reviews[0]; // Fallback to top review if none fit
  };

  const review = topReview
    || (serviceId ? getTopFittingReview(getServiceSpecificReviews(serviceId)) : null)
    || getTopFittingReview(getAllReviews());

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    address: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your quote request has been received. We will contact you shortly.');
    setFormState({ name: '', email: '', phone: '', postcode: '', address: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white relative">
      {/* Subtle background texture - organic scattered dots */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info Side with Background Image */}
            <div className="relative p-12 lg:p-16 text-white flex flex-col justify-between overflow-hidden min-h-[600px] lg:min-h-0">
               {/* Background Image & Overlay */}
               <div className="absolute inset-0 z-0">
                  <Image
                     src="/images/blake-van-image.jpg"
                     alt="Aquapro professional carpet cleaning"
                     fill
                     className="object-cover"
                     sizes="(max-width: 1024px) 100vw, 50vw"
                     quality={65}
                  />
                  <div className="absolute inset-0 bg-slate-900/90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
               </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{ctaConfig.headline}</h2>
                <p className="text-slate-200 text-lg mb-12 max-w-md leading-relaxed">
                  {ctaConfig.subheadline}
                </p>

                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="p-3 bg-white/10 rounded-lg mr-5 shrink-0 group-hover:bg-white/20 transition-colors">
                        <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">Call Us</p>
                      <div className="flex items-center">
                        <p className="text-xl font-bold tracking-tight">{siteConfig.contact.phone}</p>
                        <CopyButton text={siteConfig.contact.phone} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="p-3 bg-white/10 rounded-lg mr-5 shrink-0 group-hover:bg-white/20 transition-colors">
                        <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">Email Us</p>
                      <div className="flex items-center">
                        <p className="text-xl font-bold tracking-tight break-all">{siteConfig.contact.email}</p>
                        <CopyButton text={siteConfig.contact.email} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="p-3 bg-white/10 rounded-lg mr-5 shrink-0 group-hover:bg-white/20 transition-colors">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">Service Area</p>
                      <div className="flex items-center">
                        <p className="text-xl font-bold tracking-tight leading-snug">Essex & Surrounding Areas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12">
                  <div className="p-6 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
                      <div className="flex gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="w-5 h-5 text-[#FBBC05] fill-[#FBBC05]" />
                          ))}
                      </div>
                      <p className="italic text-slate-100 font-medium text-lg leading-relaxed mb-4">
                          &quot;{review.text}&quot;
                      </p>
                      <div className="flex items-start gap-3">
                          {/* Profile Image with Source Badge */}
                          <div className="relative flex-shrink-0">
                            {review.profileImage ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                  src={review.profileImage}
                                  alt={review.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${review.bg}`}>
                                {review.initial}
                              </div>
                            )}
                            {/* Source Badge */}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-[1px] shadow-sm border border-slate-100 z-10">
                              <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                              </svg>
                            </div>
                          </div>
                          <div>
                            <p className="text-white font-bold mb-1">{review.name}</p>
                            <div className="flex items-center gap-2">
                                {review.reviewer.isLocalGuide && (
                                  <>
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#4285F4" />
                                    </svg>
                                    <span className="text-sm text-blue-400 font-medium">Local Guide</span>
                                    <span className="text-slate-500">·</span>
                                  </>
                                )}
                                <span className="text-sm text-slate-300 font-medium">Verified Google Review</span>
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-12 lg:p-16 bg-white flex flex-col justify-center">
              <div className="mb-8">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">{ctaConfig.formTitle}</h3>
                 <p className="text-slate-500 text-sm">{ctaConfig.formSubtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Row 1: Full Name & Phone */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide ml-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50"
                      />
                  </div>
                  <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide ml-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Phone Number"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50"
                        />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide ml-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50"
                    />
                </div>

                {/* Row 3: Postcode & Address */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide ml-1">Postcode</label>
                      <input
                        type="text"
                        name="postcode"
                        placeholder="Postcode"
                        value={formState.postcode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50"
                      />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide ml-1">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formState.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50"
                      />
                  </div>
                </div>

                {/* Row 4: Service Details */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide ml-1">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about the service you need..."
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50 resize-none"
                   />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cta hover:bg-cta-hover text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-lg"
                >
                  {ctaConfig.buttonText}
                </button>

                <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Takes under 60 seconds</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span>No obligation quote</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
