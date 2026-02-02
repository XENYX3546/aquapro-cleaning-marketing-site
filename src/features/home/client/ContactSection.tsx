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

// Max characters for testimonial to fit without truncation
const MAX_TESTIMONIAL_LENGTH = 120;

export function ContactSection({ serviceId, topReview }: ContactSectionProps) {
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
    <section id="contact" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info Side with Background Image */}
            <div className="relative p-12 lg:p-16 text-white flex flex-col justify-between overflow-hidden min-h-[600px] lg:min-h-0">
               {/* Background Image & Overlay */}
               <div className="absolute inset-0 z-0">
                  <Image
                     src="/images/blake-carpet-cleaning.jpg"
                     alt="Aquapro professional carpet cleaning"
                     fill
                     className="object-cover"
                     sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-slate-900/90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
               </div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Get My Free Quote</h3>
                <p className="text-slate-200 text-lg mb-12 max-w-md leading-relaxed">
                  Simply fill out the form or contact us directly. We aim to respond to all enquiries within 24 hours.
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
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 text-[#FBBC05] fill-[#FBBC05]" />
                            ))}
                        </div>
                        <div className="bg-white p-1.5 rounded-full shadow-sm">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                        </div>
                      </div>
                      <p className="italic text-slate-100 font-medium text-lg leading-relaxed mb-4">
                          &quot;{review.text}&quot;
                      </p>
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
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                              </div>
                              <span className="text-sm text-slate-300 font-medium">Verified Google Review</span>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-12 lg:p-16 bg-white flex flex-col justify-center">
              <div className="mb-8">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Request a Quote</h3>
                 <p className="text-slate-500 text-sm">Enter your details below for a fast, fixed price.</p>
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
                  Get My Free Quote
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
