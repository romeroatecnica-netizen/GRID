import { ChevronDown, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { TranslationBundle } from '../i18n/translations';

interface EditorialSeoSectionProps {
  t: TranslationBundle;
  privacyNotice: string;
}

export function EditorialSeoSection({ t, privacyNotice }: EditorialSeoSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      id="guide"
      className="no-print space-y-8 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-8"
      aria-label={t.editorial.heading}
    >
      <div className="max-w-3xl">
        <h2 className="font-display text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
          {t.editorial.heading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {t.editorial.intro}
        </p>
      </div>

      {/* Editorial 3-column guide */}
      <div className="grid grid-cols-1 gap-6 border-t border-[#E2E8F0] pt-6 md:grid-cols-3">
        {t.editorial.cards.map((card, idx) => (
          <article key={card.title} className="space-y-2">
            <div className="font-mono text-xs font-semibold text-[#4F46E5] tabular-nums">
              0{idx + 1}.
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">{card.body}</p>
          </article>
        ))}
      </div>

      {/* Posting Order Guide */}
      <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5">
        <h3 className="font-display text-base font-bold text-slate-900">
          {t.editorial.postingOrderTitle}
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-4 text-sm leading-relaxed text-slate-700 md:grid-cols-2">
          <p>{t.editorial.postingOrderCarousel}</p>
          <p>{t.editorial.postingOrderGrid}</p>
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div id="faq" className="border-t border-[#E2E8F0] pt-6">
        <h2 className="font-display text-lg font-bold text-slate-950 sm:text-xl">
          {t.editorial.faqHeading}
        </h2>

        <div className="mt-4 divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
          {t.editorial.faqs.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-start text-sm font-semibold text-slate-900 transition-colors hover:text-[#4F46E5] sm:text-base"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#4F46E5]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="pb-4 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent 100% Client-Side Privacy Notice */}
      <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-xs leading-relaxed text-emerald-950 sm:text-sm">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" aria-hidden="true" />
        <p>{privacyNotice}</p>
      </div>
    </section>
  );
}
