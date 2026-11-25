import type { SupportedLang } from '../types/studio';

export const CANONICAL_ORIGIN = 'https://gridsplitcue.bastelar.com';

export const SUPPORTED_LANGS: readonly SupportedLang[] = [
  'en',
  'es',
  'fr',
  'de',
  'pt',
  'ar',
  'hi',
  'ru',
  'zh',
  'ja',
] as const;

export const LANG_LABELS: Record<SupportedLang, { native: string; dir: 'ltr' | 'rtl' }> = {
  en: { native: 'English', dir: 'ltr' },
  es: { native: 'Español', dir: 'ltr' },
  fr: { native: 'Français', dir: 'ltr' },
  de: { native: 'Deutsch', dir: 'ltr' },
  pt: { native: 'Português', dir: 'ltr' },
  ar: { native: 'العربية', dir: 'rtl' },
  hi: { native: 'हिन्दी', dir: 'ltr' },
  ru: { native: 'Русский', dir: 'ltr' },
  zh: { native: '中文', dir: 'ltr' },
  ja: { native: '日本語', dir: 'ltr' },
};

export function getCanonicalUrl(lang: SupportedLang): string {
  if (lang === 'en') {
    return `${CANONICAL_ORIGIN}/`;
  }
  return `${CANONICAL_ORIGIN}/?lang=${lang}`;
}

export function detectInitialLanguage(): SupportedLang {
  if (typeof window === 'undefined') return 'en';

  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang')?.toLowerCase() as SupportedLang | undefined;
  if (urlLang && (SUPPORTED_LANGS as readonly string[]).includes(urlLang)) {
    return urlLang;
  }

  try {
    const saved = localStorage.getItem('gridsplitcue_lang') as SupportedLang | null;
    if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage read errors
  }

  const navLang = (navigator.language || 'en').slice(0, 2).toLowerCase() as SupportedLang;
  if ((SUPPORTED_LANGS as readonly string[]).includes(navLang)) {
    return navLang;
  }

  return 'en';
}

export interface SeoDocumentPayload {
  lang: SupportedLang;
  title: string;
  description: string;
  howToName: string;
  howToSteps: { name: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export function syncHeadSeo(payload: SeoDocumentPayload): void {
  if (typeof document === 'undefined') return;

  const canonicalUrl = getCanonicalUrl(payload.lang);
  const dir = LANG_LABELS[payload.lang].dir;

  document.documentElement.lang = payload.lang;
  document.documentElement.dir = dir;
  document.title = payload.title;

  const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('meta[name="description"]', 'name', 'description', payload.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMeta('meta[property="og:title"]', 'property', 'og:title', payload.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', payload.description);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', payload.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', payload.description);

  let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonicalUrl;

  // Ensure all alternate hreflang links stay anchored exclusively to CANONICAL_ORIGIN
  const existingAlternates = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
  if (existingAlternates.length === 0) {
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = getCanonicalUrl('en');
    document.head.appendChild(xDefault);

    for (const code of SUPPORTED_LANGS) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = code;
      link.href = getCanonicalUrl(code);
      document.head.appendChild(link);
    }
  }

  // Update JSON-LD (@graph with WebApplication + HowTo + FAQPage)
  const jsonLdScript = document.getElementById('jsonld-structured-data');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${CANONICAL_ORIGIN}/#webapp`,
        name: 'GridSplitCue',
        url: canonicalUrl,
        inLanguage: payload.lang,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires HTML5 Canvas and JavaScript',
        description: payload.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Seamless Instagram Carousel Splitter (2 to 10 slides)',
          'Instagram Profile Grid Maker (3x1, 3x2, 3x3)',
          '4:5 Portrait (1080x1350) and 1:1 Square (1080x1080) export',
          'Interactive swipeable preview before downloading',
          'Full-resolution .ZIP export with zero watermarks',
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${CANONICAL_ORIGIN}/#howto`,
        name: payload.howToName,
        inLanguage: payload.lang,
        totalTime: 'PT1M',
        tool: [
          {
            '@type': 'HowToTool',
            name: 'HTML5 Canvas Browser Studio',
          },
        ],
        step: payload.howToSteps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${CANONICAL_ORIGIN}/#faq`,
        inLanguage: payload.lang,
        mainEntity: payload.faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  if (jsonLdScript) {
    jsonLdScript.textContent = JSON.stringify(structuredData);
  }
}
