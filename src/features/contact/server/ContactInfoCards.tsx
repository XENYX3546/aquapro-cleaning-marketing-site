import { Icon } from '@/components/ui';
import { siteConfig } from '@/lib/constants';

const contactCards = [
  {
    icon: 'phone' as const,
    title: 'Call Us',
    description: 'Mon-Sat from 8am to 5pm.\nWe aim to answer all calls.',
    action: {
      label: siteConfig.contact.phone,
      href: siteConfig.contact.phoneHref,
      external: false,
    },
  },
  {
    icon: 'mail' as const,
    title: 'Email Us',
    description: 'For general enquiries and\ncommercial contracts.',
    action: {
      label: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      external: false,
    },
  },
];

export function ContactInfoCards() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-700 mb-4">
                <Icon name={card.icon} size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 text-lg mb-2">{card.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4 whitespace-pre-line">
                {card.description}
              </p>
              <a
                href={card.action.href}
                {...(card.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-cta font-semibold text-sm hover:underline inline-flex items-center gap-1"
              >
                {card.action.label} {card.action.external && <Icon name="arrow-right" size={14} />}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
