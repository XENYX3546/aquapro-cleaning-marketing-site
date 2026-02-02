'use client';

import { siteConfig } from '@/lib/constants';

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
];

export function NeedHelp() {
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="pb-12 pt-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3F5F7] rounded-[2rem] p-6 md:p-8 text-center relative overflow-hidden">

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Avatars */}
            <div className="flex -space-x-3 mb-4 items-center justify-center">
              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  src={AVATARS[0]}
                  alt="Aquapro customer support specialist"
                />
              </div>
              <div className="relative z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border-[3px] border-white overflow-hidden -mt-1 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  src={AVATARS[1]}
                  alt="Aquapro customer support specialist"
                />
              </div>
              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  src={AVATARS[2]}
                  alt="Aquapro customer support specialist"
                />
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Need help from our experts?
            </h3>

            <p className="text-slate-600 text-sm md:text-base mb-6 max-w-2xl mx-auto leading-relaxed font-normal">
              Call us on <a href={siteConfig.contact.phoneHref} className="font-bold text-slate-900 underline decoration-slate-900 underline-offset-2 hover:text-slate-700">{siteConfig.contact.phone}</a>,
              phone lines are open 8am-5pm Monday-Saturday. Or you can email us at <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-slate-900 underline decoration-slate-900 underline-offset-2 hover:text-slate-700">{siteConfig.contact.email}</a>
            </p>

            <button
              onClick={scrollToQuoteForm}
              className="bg-[#E30663] hover:bg-[#C20555] text-white font-semibold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-sm"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeedHelp;
