import { ExternalLink } from 'lucide-react';
import type { TranslationBundle } from '../i18n/translations';

interface MediaNetAdSlotProps {
  slotId: string;
  placement: 'mid-page' | 'footer-top';
}

/**
 * Dedicated Media.net ad slot container with reserved min-height to prevent CLS.
 * Never overlays interactive canvas or preview controls and is hidden in @media print.
 */
export function MediaNetAdSlot({ slotId, placement }: MediaNetAdSlotProps) {
  return (
    <div
      className="no-print mx-auto w-full max-w-[1280px]"
      data-ad-network="media.net"
      data-ad-placement={placement}
    >
      {/* Media.net Ad Unit Slot (${slotId}) — Insert Media.net _mNHandle / contextual script tag inside #${slotId} */}
      <div
        id={slotId}
        className="flex min-h-[100px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-white/70 px-4 py-3 text-center"
      >
        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Advertisement · Media.net Slot ({placement})
        </span>
      </div>
    </div>
  );
}

interface CreatorGearAffiliatesProps {
  t: TranslationBundle;
}

export function CreatorGearAffiliates({ t }: CreatorGearAffiliatesProps) {
  return (
    <section
      aria-label={t.affiliates.heading}
      className="no-print rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E2E8F0] pb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-950">
            {t.affiliates.heading}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{t.affiliates.subheading}</p>
        </div>
        <span className="text-xs text-slate-400">{t.affiliates.disclosure}</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.affiliates.items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group flex flex-col justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-colors hover:border-[#4F46E5]/50 hover:bg-white"
          >
            <div>
              <div className="text-[11px] font-semibold text-[#4F46E5]">
                {item.category}
              </div>
              <h3 className="mt-1 font-display text-sm font-bold text-slate-900 group-hover:text-[#4F46E5]">
                {item.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {item.spec}
              </p>
            </div>

            <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-800 group-hover:text-[#DB2777]">
              <span>{item.cta}</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
