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
  ['carpet-cleaning', 'upholstery-cleaning', 'stain-removal'].includes(s.id)
);
const exteriorServices = services.filter((s) =>
  ['roof-cleaning', 'pressure-washing', 'gutter-cleaning', 'window-cleaning'].includes(s.id)
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
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
              Professional interior and exterior cleaning services throughout
              Essex. Fully insured, reliable, and delivering exceptional results.
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
            </div>
          </div>

          {/* Interior Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">
              Interior Cleaning
            </h4>
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
            <h4 className="font-bold text-white mb-4 text-sm">
              Exterior Cleaning
            </h4>
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
            <h4 className="font-bold text-white mb-4 text-sm">Areas Covered</h4>
            <ul className="space-y-2.5">
              {footerLocations.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/areas/${location.slug}`}
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

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-500" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-500" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5" />
                <span>{siteConfig.coverage}</span>
              </li>
            </ul>

            <Link
              href={ctaLinks.quote}
              className="inline-flex items-center gap-2 mt-6 bg-cta hover:bg-cta-hover text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              Get a Quote <ArrowRight className="w-3.5 h-3.5" />
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
            <p className="text-slate-500 text-xs mt-1">Company No. {siteConfig.companyNumber} | Registered in England & Wales</p>
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
