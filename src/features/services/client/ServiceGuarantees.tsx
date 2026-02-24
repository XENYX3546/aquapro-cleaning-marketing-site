'use client';

import { ShieldCheck, CalendarCheck, Umbrella, Wallet, Clock, PawPrint, Home, Sparkles, RefreshCw } from 'lucide-react';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { getServiceKeywords } from '@/lib/constants';

type Guarantee = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

// Service-specific guarantees
const serviceGuarantees: Record<string, Guarantee[]> = {
  'roof-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "5-Year Moss-Free Guarantee",
      description: "Our roof cleaners return after 3 years to re-apply treatment free of charge, extending your guarantee to 5 years."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "Tile Replacement Guarantee",
      description: "If we damage a tile during roof cleaning, we replace it like-for-like, free of charge. No questions asked."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your property is protected, though we've never had to use it."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The roof cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Free Gutter & Window Clean",
      description: "Every roof clean includes a free gutter clear and window clean. More value, same price."
    },
    {
      icon: <PawPrint className="w-6 h-6" strokeWidth={1.5} />,
      title: "Safe for Pets & Plants",
      description: "Our protective treatment is completely safe for children, pets, and plants once dry."
    }
  ],
  'carpet-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "100% Happy or Free Re-Clean",
      description: "Not satisfied with your carpet clean? Our carpet cleaners come back and re-clean for free. No questions asked."
    },
    {
      icon: <RefreshCw className="w-6 h-6" strokeWidth={1.5} />,
      title: "Stain Removal Guarantee",
      description: "If our carpet cleaner can't remove a stain we said we could, you don't pay for that area."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your carpets and property are protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The carpet cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
      title: "Dry in Hours, Not Days",
      description: "Our truck-mounted extraction system removes 95% of moisture, cutting standard drying time from 24 hours to under 4. Walk on your carpets the same day."
    },
    {
      icon: <PawPrint className="w-6 h-6" strokeWidth={1.5} />,
      title: "Safe for Kids & Pets",
      description: "Non-toxic, eco-friendly carpet cleaning solutions safe for your whole family."
    }
  ],
  'upholstery-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "100% Happy or Free Re-Clean",
      description: "Not satisfied with your sofa clean? Our upholstery cleaners come back and re-clean for free."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Safe for All Fabrics",
      description: "Leather, velvet, linen, microfibre. Our upholstery cleaner handles all fabric types without damage."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your furniture is protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The upholstery cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fast Drying Time",
      description: "Low-moisture cleaning means your sofa is ready to use in just a few hours."
    },
    {
      icon: <PawPrint className="w-6 h-6" strokeWidth={1.5} />,
      title: "Pet Odour Elimination",
      description: "We remove pet odours at the source, not just mask them. Safe for all pets."
    }
  ],
  'pressure-washing': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "100% Satisfaction Guarantee",
      description: "Not happy with your pressure wash? Our pressure washing team comes back and fixes it for free."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "No Surface Damage",
      description: "We adjust pressure for every surface: block paving, concrete, wood. No damage, ever."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your property is fully protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The pressure washing price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Re-Sanding Included",
      description: "Block paving gets free kiln-dried sand to stabilise joints after cleaning."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "Instant Kerb Appeal",
      description: "Transform your property's appearance in just one visit."
    }
  ],
  'driveway-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Like-New Results Guarantee",
      description: "Your driveway will look transformed, or our driveway cleaners come back and re-clean for free."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Re-Sanding Included",
      description: "Block paving driveways get free kiln-dried sand to stabilise joints after driveway cleaning."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your driveway and property are protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The driveway cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <RefreshCw className="w-6 h-6" strokeWidth={1.5} />,
      title: "Oil Stain Treatment",
      description: "Our driveway cleaner treats and removes oil stains, tyre marks, and ground-in grime."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "Boosts Property Value",
      description: "A clean driveway instantly improves kerb appeal and property value."
    }
  ],
  'patio-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Like-New Results Guarantee",
      description: "Your patio will look transformed, or our patio cleaners come back and re-clean for free."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Safe for All Stone Types",
      description: "Indian sandstone, porcelain, limestone, slate. Our patio cleaner handles all surfaces safely."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your patio and property are protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The patio cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Black Spot Removal",
      description: "We remove stubborn black spot, algae, and lichen that other patio cleaners can't shift."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "Ready for Entertaining",
      description: "Transform your outdoor space just in time for summer."
    }
  ],
  'window-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Streak-Free Guarantee",
      description: "Crystal clear windows with no streaks, or our window cleaners come back and fix it."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Frames & Sills Included",
      description: "Our window cleaner cleans your frames and sills at no extra cost. The full job, done right."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your property is protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The window cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "Reaches 4 Storeys",
      description: "Our water-fed pole system safely reaches high windows from the ground."
    },
    {
      icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
      title: "Regular Service Available",
      description: "Set up a regular window cleaning schedule and never think about it again."
    }
  ],
  'gutter-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Clear Flow Guarantee",
      description: "Your gutters will flow freely, or our gutter cleaners come back and clear them again for free."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Before & After Photos",
      description: "Our gutter cleaner provides camera footage before and after so you can see the results."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your property is protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The gutter cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "No Ladders Required",
      description: "Our high-reach vacuum system cleans gutters safely from the ground."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Downpipes Cleared",
      description: "We check and clear all downpipes to ensure proper drainage."
    }
  ],
  'solar-panel-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Efficiency Restoration",
      description: "Our solar panel cleaners restore up to 30% lost efficiency. Your panels will generate more power."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "No Chemicals, No Scratches",
      description: "Pure water solar panel cleaning only, the manufacturer-approved method. Safe for all panels."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your solar investment is protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The solar panel cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "Won't Void Warranty",
      description: "Our solar panel cleaner uses manufacturer-approved methods that won't affect your warranty."
    },
    {
      icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
      title: "Regular Service Available",
      description: "Set up annual cleaning to keep your panels performing at their best."
    }
  ],
  'conservatory-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Crystal Clear Guarantee",
      description: "Your conservatory will be spotless, or our conservatory cleaners come back and clean it again for free."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Safe for All Roof Types",
      description: "Polycarbonate, glass, UPVC. Our conservatory cleaner handles all materials without damage."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your conservatory is protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The conservatory cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Gutters Cleared Free",
      description: "Every conservatory clean includes a free gutter clear. More value, same price."
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
      title: "Restores Natural Light",
      description: "Remove algae and grime that blocks light. Your conservatory will feel brand new."
    }
  ],
  'mattress-cleaning': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fresher Sleep Guarantee",
      description: "Your mattress will be fresh and sanitised, or our mattress cleaners come back and re-clean for free."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Dust Mite Elimination",
      description: "Our mattress cleaner removes dust mites, allergens, and bacteria that cause allergies and poor sleep."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your mattress and home are protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The mattress cleaning price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
      title: "Dry Same Day",
      description: "Low-moisture mattress cleaning means you can sleep on your mattress the same night."
    },
    {
      icon: <PawPrint className="w-6 h-6" strokeWidth={1.5} />,
      title: "Safe for All Mattress Types",
      description: "Memory foam, spring, hybrid. We clean all mattresses safely and effectively."
    }
  ],
  'stain-removal': [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Stain Removal Guarantee",
      description: "If our stain remover can't remove a stain we said we could, you don't pay for that treatment."
    },
    {
      icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
      title: "Priority Bookings Available",
      description: "Fresh spill? Our stain removal specialists offer priority bookings to treat stains before they set."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "£5M Public Liability",
      description: "Fully insured with £5 million cover. Your property is protected."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price, No Surprises",
      description: "The stain removal price we quote is the price you pay. No hidden fees, ever."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Safe for All Fabrics",
      description: "We test every product first. Safe for carpets, upholstery, and delicate fabrics."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "No Residue Left Behind",
      description: "Our stain removal treatments are fully rinsed out. No sticky residue that attracts more dirt."
    }
  ],
};

// Default guarantees for services without specific ones
const defaultGuarantees: Guarantee[] = [
  {
    icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
    title: "100% Happy or Free Re-Clean",
    description: "Not satisfied? We come back and re-clean for free. No questions asked."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
    title: "Zero Risk, Guaranteed",
    description: "If anything goes wrong, we fix it. Simple as that."
  },
  {
    icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
    title: "£5M Public Liability",
    description: "Fully insured with £5 million public liability cover. Your property is protected."
  },
  {
    icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
    title: "Fixed Price, No Surprises",
    description: "The price we quote is the price you pay. No hidden fees, ever."
  },
  {
    icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
    title: "Flexible Scheduling",
    description: "We work around your schedule, including weekends."
  },
  {
    icon: <PawPrint className="w-6 h-6" strokeWidth={1.5} />,
    title: "Safe for Kids & Pets",
    description: "Our cleaning solutions are non-toxic and safe for your whole family."
  }
];

function getGuarantees(serviceSlug: string): Guarantee[] {
  return serviceGuarantees[serviceSlug] || defaultGuarantees;
}

interface ServiceGuaranteesProps {
  service: Service;
  location?: Location;
}

export function ServiceGuarantees({ service, location }: ServiceGuaranteesProps) {
  const guarantees = getGuarantees(service.slug);
  const keywords = getServiceKeywords(service.slug);
  const variation = keywords.variations[2] ?? keywords.primary;

  return (
    <section className="py-16 lg:py-24 bg-white relative">
      {/* Subtle background texture - organic scattered dots */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">Peace of Mind</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our {variation} <span className="text-[#1B9CB6]">Guarantee</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {location
              ? <>We stand behind every job with a satisfaction guarantee, full public liability insurance, and transparent fixed pricing with no hidden charges. Every {location.name} customer is backed by these promises, no exceptions.{location.postcodeAreas && location.postcodeAreas.length > 0 ? ` Our team covers all ${location.postcodeAreas.join(', ')} postcodes.` : ''}</>
              : `We stand behind every job with a satisfaction guarantee, full public liability insurance, and transparent fixed pricing with no hidden charges. Every customer is backed by these promises, no exceptions.`}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-slate-100 hover:border-[#1B9CB6]/30 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col items-start gap-4 h-full"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-[#1B9CB6]/5 flex items-center justify-center shrink-0 group-hover:bg-[#1B9CB6] group-hover:scale-110 transition-all duration-300">
                <div className="text-[#1B9CB6] group-hover:text-white transition-colors duration-300">
                  {guarantee.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {guarantee.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {guarantee.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServiceGuarantees;
