'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { siteConfig, ctaLinks, services } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  Brush,
  Sofa,
  Sparkles,
  Home,
  Droplets,
  CloudRain,
  AppWindow,
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open + signal to other components
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.dataset.mobileMenuOpen = 'true';
    } else {
      document.body.style.overflow = 'unset';
      delete document.body.dataset.mobileMenuOpen;
    }
    return () => {
      document.body.style.overflow = 'unset';
      delete document.body.dataset.mobileMenuOpen;
    };
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownRef.current.offsetParent !== null
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const interiorServices = services.filter((s) =>
    ['carpet-cleaning', 'upholstery-cleaning', 'stain-removal'].includes(s.id)
  );
  const exteriorServices = services.filter((s) =>
    ['roof-cleaning', 'pressure-washing', 'gutter-cleaning', 'window-cleaning'].includes(s.id)
  );

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-white/10">
      {/* Main Header Content */}
      <div className="relative z-50 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex-shrink-0 group"
            >
              <Image
                src="/white-aquapro-logo.png"
                alt="Aquapro Cleaning - Professional Cleaning Services in Essex"
                width={160}
                height={48}
                className="h-12 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={cn(
                    'flex items-center text-sm font-medium transition-colors focus:outline-none py-4',
                    servicesOpen
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 ml-1.5 opacity-70 transition-transform duration-300',
                      servicesOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Dropdown Content */}
                <div
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 top-full mt-6 w-[616px] rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 transform origin-top overflow-hidden flex flex-col',
                    servicesOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible translate-y-4 pointer-events-none'
                  )}
                >
                  <div className="flex">
                    {/* Left Column: Interior */}
                    <div className="w-1/2 p-6 border-r border-slate-200">
                      <div className="mb-5 pb-3 border-b border-slate-100">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                          Category
                        </span>
                        <span className="block text-base font-bold text-slate-900">
                          Interior Cleaning
                        </span>
                      </div>
                      <div className="space-y-1">
                        {interiorServices.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item"
                          >
                            <div className="flex-shrink-0 w-[34px] h-[34px] rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors duration-200">
                              <span className="text-lg flex items-center justify-center">
                                {service.id === 'carpet-cleaning' && <Brush className="w-4 h-4" />}
                                {service.id === 'upholstery-cleaning' && <Sofa className="w-4 h-4" />}
                                {service.id === 'stain-removal' && <Sparkles className="w-4 h-4" />}
                              </span>
                            </div>
                            <div className="text-[15px] font-bold text-slate-700 group-hover/item:text-brand-700 transition-colors">
                              {service.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Exterior */}
                    <div className="w-1/2 p-6 bg-slate-50/50">
                      <div className="mb-5 pb-3 border-b border-slate-200">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                          Category
                        </span>
                        <span className="block text-base font-bold text-slate-900">
                          Exterior Cleaning
                        </span>
                      </div>
                      <div className="space-y-1">
                        {exteriorServices.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-100/80 transition-colors group/item"
                          >
                            <div className="flex-shrink-0 w-[34px] h-[34px] rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors duration-200">
                              <span className="text-lg flex items-center justify-center">
                                {service.id === 'roof-cleaning' && <Home className="w-4 h-4" />}
                                {service.id === 'pressure-washing' && <Droplets className="w-4 h-4" />}
                                {service.id === 'gutter-cleaning' && <CloudRain className="w-4 h-4" />}
                                {service.id === 'window-cleaning' && <AppWindow className="w-4 h-4" />}
                              </span>
                            </div>
                            <div className="text-[15px] font-bold text-slate-700 group-hover/item:text-brand-700 transition-colors">
                              {service.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wide"
                    >
                      View All Services <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                Contact
              </Link>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Call us"
                title={siteConfig.contact.phone}
              >
                <Phone className="h-5 w-5" />
              </a>
              <Link
                href={ctaLinks.quote}
                className="bg-cta hover:bg-cta-hover text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-cta/25 transform hover:-translate-y-0.5 flex items-center gap-2 group"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href={siteConfig.contact.phoneHref}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Call us"
              >
                <Phone className="h-6 w-6" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu - Right Slide Out */}
      <div
        className={cn(
          'lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col',
          mobileMenuOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        )}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-white font-bold text-lg">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-4 pb-8 pt-6 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Home
          </Link>

          {/* Mobile Services Dropdown */}
          <div className="rounded-xl overflow-hidden bg-white/5 border border-white/5">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-base font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Services
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-slate-400 transition-transform duration-300',
                  servicesOpen && 'rotate-180'
                )}
              />
            </button>

            <div
              className={cn(
                'transition-all duration-300 ease-in-out',
                servicesOpen
                  ? 'max-h-[800px] opacity-100'
                  : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-4 pb-4 space-y-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 pt-2 pb-1">
                  Interior
                </div>
                {interiorServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-2 rounded-lg text-base text-slate-400 font-medium hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}

                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 pt-4 pb-1">
                  Exterior
                </div>
                {exteriorServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-2 rounded-lg text-base text-slate-400 font-medium hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}

                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-2 text-xs font-bold text-brand-400 uppercase tracking-wide mt-2 hover:text-brand-300"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="border-t border-white/10 bg-slate-900 p-4 pb-8">
          <Link
            href={ctaLinks.quote}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-cta active:bg-cta-hover text-white px-6 py-4 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 mb-3"
          >
            Get Free Quote
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={siteConfig.contact.phoneHref}
            className="w-full bg-white/10 active:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5 text-brand-400" />
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </nav>
  );
}
