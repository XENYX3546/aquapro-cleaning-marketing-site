import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Facebook,
  Instagram,
  ArrowRight,
  Star,
  Check,
  Heart,
} from 'lucide-react';
import { siteConfig, navigation, services, locations, ctaLinks } from '@/lib/constants';

// Top 10 locations for footer
const footerLocations = locations.slice(0, 10);
const interiorServices = services.filter((s) =>
  ['carpet-cleaning', 'upholstery-cleaning', 'stain-removal', 'mattress-cleaning'].includes(s.id)
);
const exteriorServices = services.filter((s) =>
  ['roof-cleaning', 'pressure-washing', 'gutter-cleaning', 'window-cleaning', 'driveway-cleaning', 'patio-cleaning', 'solar-panel-cleaning', 'conservatory-cleaning'].includes(s.id)
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <Image
                src="/white-aquapro-logo.png"
                alt="Aquapro Cleaning - Professional Cleaning Services in Essex"
                width={140}
                height={42}
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Aquapro Cleaning provides professional interior and exterior
              cleaning services throughout Essex and East London. Fully insured,
              family-run, and trusted by thousands of customers.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.social.tiktok && (
                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.1a8.16 8.16 0 0 0 4.76 1.52v-3.4c-.72 0-1.94-.18-1-.53z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Interior Services */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm">
              Interior Cleaning
            </h3>
            <ul className="space-y-2.5">
              {interiorServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exterior Services */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm">
              Exterior Cleaning
            </h3>
            <ul className="space-y-2.5">
              {exteriorServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Covered */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm">Areas Covered</h3>
            <ul className="space-y-2.5">
              {footerLocations.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/carpet-cleaning/${location.slug}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors inline-flex items-center gap-1"
                >
                  All Areas <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Contact CTA Card */}
        <div className="mb-10 bg-slate-800/80 rounded-xl p-5 border border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2 text-white hover:text-brand-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-500" />
                <span className="font-semibold text-sm">{siteConfig.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-white hover:text-brand-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-500" />
                <span className="font-semibold text-sm">{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-sm">{siteConfig.coverage}</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={ctaLinks.quote}
              className="flex-shrink-0 bg-cta hover:bg-cta-hover text-white font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="py-8 border-b border-white/10">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span>5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-500 fill-current" />
              <span>Family Run Business</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm text-center md:text-left">
            <p>&copy; {currentYear} {siteConfig.legalName}. All rights reserved.</p>
            <p className="text-slate-400 text-xs mt-1">Company No. {siteConfig.companyNumber} | Registered in England & Wales</p>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            {navigation.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
