import { Globe, Printer } from 'lucide-react';
import { LANG_LABELS, SUPPORTED_LANGS } from '../constants/seo';
import type { TranslationBundle } from '../i18n/translations';
import type { SupportedLang } from '../types/studio';

interface HeaderProps {
  lang: SupportedLang;
  onChangeLang: (lang: SupportedLang) => void;
  t: TranslationBundle;
  onPrint: () => void;
}

export function Header({ lang, onChangeLang, t, onPrint }: HeaderProps) {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:gap-8 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#studio"
          className="font-display shrink-0 whitespace-nowrap text-lg font-extrabold tracking-tight text-slate-900"
        >
          Grid<span className="text-[#4F46E5]">Split</span>
          <span className="text-[#DB2777]">Cue</span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
        >
          <a
            href="#studio"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-slate-950"
          >
            {t.nav.studio}
          </a>
          <a
            href="#preview"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-slate-950"
          >
            {t.nav.preview}
          </a>
          <a
            href="#guide"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-slate-950"
          >
            {t.nav.guide}
          </a>
          <a
            href="#faq"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-slate-950"
          >
            {t.nav.faq}
          </a>
        </nav>

        {/* Zone 3: Language Switcher + Print Action */}
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="relative flex items-center">
            <Globe
              className="pointer-events-none absolute start-2.5 h-4 w-4 text-slate-500"
              aria-hidden="true"
            />
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => onChangeLang(e.target.value as SupportedLang)}
              className="h-9 cursor-pointer appearance-none rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pe-7 ps-8 text-xs font-medium text-slate-800 transition-colors hover:border-slate-300 focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
            >
              {SUPPORTED_LANGS.map((code) => (
                <option key={code} value={code}>
                  {LANG_LABELS[code].native}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.nav.printSummary}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
