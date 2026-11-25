/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { EditorialSeoSection } from './components/EditorialSeoSection';
import { Header } from './components/Header';
import { CreatorGearAffiliates, MediaNetAdSlot } from './components/MonetizationSlots';
import { PrintSummarySheet } from './components/PrintSummarySheet';
import { ProjectPersistenceBar } from './components/ProjectPersistenceBar';
import { StudioCanvas } from './components/StudioCanvas';
import { SwipeablePreview } from './components/SwipeablePreview';
import { detectInitialLanguage, syncHeadSeo } from './constants/seo';
import { TRANSLATIONS } from './i18n/translations';
import type {
  GeneratedSlice,
  ProjectExportPayload,
  SourceImageMeta,
  StudioSettings,
  SupportedLang,
} from './types/studio';
import {
  createZipBlob,
  generateFullResSlices,
  triggerBlobDownload,
} from './utils/imageSlicer';

const SETTINGS_STORAGE_KEY = 'gridsplitcue_settings_v1';

const SAMPLE_PANORAMA_URL = '/src/assets/images/sample_carousel_panorama_1795583838867.jpg';
const SAMPLE_GRID_URL = '/src/assets/images/sample_grid_studio_1795583838575.jpg';

const DEFAULT_SETTINGS: StudioSettings = {
  mode: 'carousel',
  aspectRatio: '4:5',
  slideCount: 4,
  gridPreset: '3x3',
  outputFormat: 'png',
  jpegQuality: 0.94,
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  showGuides: true,
  projectNotes: '',
};

function loadSavedSettings(): StudioSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<StudioSettings>;
    return {
      mode: parsed.mode === 'grid' ? 'grid' : 'carousel',
      aspectRatio: parsed.aspectRatio === '1:1' ? '1:1' : '4:5',
      slideCount:
        typeof parsed.slideCount === 'number'
          ? Math.max(2, Math.min(10, Math.round(parsed.slideCount)))
          : DEFAULT_SETTINGS.slideCount,
      gridPreset:
        parsed.gridPreset === '3x1' || parsed.gridPreset === '3x2' || parsed.gridPreset === '3x3'
          ? parsed.gridPreset
          : DEFAULT_SETTINGS.gridPreset,
      outputFormat: parsed.outputFormat === 'jpeg' ? 'jpeg' : 'png',
      jpegQuality:
        typeof parsed.jpegQuality === 'number'
          ? Math.max(0.8, Math.min(1, parsed.jpegQuality))
          : DEFAULT_SETTINGS.jpegQuality,
      zoom:
        typeof parsed.zoom === 'number'
          ? Math.max(1, Math.min(3, parsed.zoom))
          : DEFAULT_SETTINGS.zoom,
      offsetX:
        typeof parsed.offsetX === 'number'
          ? Math.max(-1, Math.min(1, parsed.offsetX))
          : DEFAULT_SETTINGS.offsetX,
      offsetY:
        typeof parsed.offsetY === 'number'
          ? Math.max(-1, Math.min(1, parsed.offsetY))
          : DEFAULT_SETTINGS.offsetY,
      showGuides: typeof parsed.showGuides === 'boolean' ? parsed.showGuides : true,
      projectNotes: typeof parsed.projectNotes === 'string' ? parsed.projectNotes : '',
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function App() {
  const [lang, setLang] = useState<SupportedLang>(() => detectInitialLanguage());
  const [settings, setSettings] = useState<StudioSettings>(() => loadSavedSettings());

  const [imageMeta, setImageMeta] = useState<SourceImageMeta>({
    src: SAMPLE_PANORAMA_URL,
    name: 'sample-studio-panorama.jpg',
    naturalWidth: 1408,
    naturalHeight: 768,
    isSample: true,
  });
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [slices, setSlices] = useState<GeneratedSlice[]>([]);
  const [isRendering, setIsRendering] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const activeObjectUrlsRef = useRef<string[]>([]);
  const uploadedBlobUrlRef = useRef<string | null>(null);

  const t = TRANSLATIONS[lang];

  // Sync SEO meta tags, canonical, hreflang, dir="rtl"|"ltr", and JSON-LD
  useEffect(() => {
    syncHeadSeo({
      lang,
      title: t.seo.title,
      description: t.seo.description,
      howToName: t.seo.howToName,
      howToSteps: t.seo.howToSteps,
      faqs: t.editorial.faqs,
    });
  }, [lang, t]);

  // Persist language choice and update URL query cleanly (?lang=xx or / for en)
  const handleChangeLang = useCallback((nextLang: SupportedLang) => {
    setLang(nextLang);
    try {
      localStorage.setItem('gridsplitcue_lang', nextLang);
    } catch {
      // Ignore storage failures
    }
    if (typeof window !== 'undefined') {
      const nextUrl =
        nextLang === 'en'
          ? `${window.location.pathname}${window.location.hash}`
          : `${window.location.pathname}?lang=${nextLang}${window.location.hash}`;
      window.history.replaceState(null, '', nextUrl);
    }
  }, []);

  // Persist studio settings in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota errors
    }
  }, [settings]);

  // Load image element whenever imageMeta.src changes
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      setLoadedImage(img);
      setImageMeta((prev) => ({
        ...prev,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
    };
    img.onerror = () => {
      if (cancelled) return;
      setLoadedImage(null);
    };
    img.src = imageMeta.src;

    return () => {
      cancelled = true;
    };
  }, [imageMeta.src]);

  // Revoke any uploaded file URL on unmount
  useEffect(() => {
    return () => {
      if (uploadedBlobUrlRef.current) {
        URL.revokeObjectURL(uploadedBlobUrlRef.current);
      }
      for (const url of activeObjectUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  // Re-generate full-res slices cleanly (debounced 140ms during slider drag)
  useEffect(() => {
    if (!loadedImage) return;
    let cancelled = false;
    setIsRendering(true);

    const timer = window.setTimeout(async () => {
      try {
        const nextSlices = await generateFullResSlices({
          image: loadedImage,
          mode: settings.mode,
          aspectRatio: settings.aspectRatio,
          slideCount: settings.slideCount,
          gridPreset: settings.gridPreset,
          outputFormat: settings.outputFormat,
          jpegQuality: settings.jpegQuality,
          zoom: settings.zoom,
          offsetX: settings.offsetX,
          offsetY: settings.offsetY,
        });

        if (cancelled) {
          for (const s of nextSlices) URL.revokeObjectURL(s.dataUrl);
          return;
        }

        const prevUrls = activeObjectUrlsRef.current;
        activeObjectUrlsRef.current = nextSlices.map((s) => s.dataUrl);
        setSlices(nextSlices);
        setIsRendering(false);

        // Clean up previous object URLs after state commits
        window.setTimeout(() => {
          for (const u of prevUrls) URL.revokeObjectURL(u);
        }, 500);
      } catch {
        if (!cancelled) setIsRendering(false);
      }
    }, 140);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    loadedImage,
    settings.mode,
    settings.aspectRatio,
    settings.slideCount,
    settings.gridPreset,
    settings.outputFormat,
    settings.jpegQuality,
    settings.zoom,
    settings.offsetX,
    settings.offsetY,
  ]);

  const handleUpdateSettings = useCallback((patch: Partial<StudioSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleResetFraming = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    }));
  }, []);

  const handleUploadFile = useCallback(
    (file: File) => {
      const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setUploadError(t.studio.invalidFileError);
        return;
      }

      setUploadError(null);
      if (uploadedBlobUrlRef.current) {
        URL.revokeObjectURL(uploadedBlobUrlRef.current);
      }
      const nextUrl = URL.createObjectURL(file);
      uploadedBlobUrlRef.current = nextUrl;

      setImageMeta({
        src: nextUrl,
        name: file.name,
        naturalWidth: 0,
        naturalHeight: 0,
        isSample: false,
      });
      setSettings((prev) => ({
        ...prev,
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
      }));
    },
    [t.studio.invalidFileError]
  );

  const handleSelectSample = useCallback((kind: 'panorama' | 'grid') => {
    setUploadError(null);
    if (uploadedBlobUrlRef.current) {
      URL.revokeObjectURL(uploadedBlobUrlRef.current);
      uploadedBlobUrlRef.current = null;
    }

    if (kind === 'panorama') {
      setImageMeta({
        src: SAMPLE_PANORAMA_URL,
        name: 'sample-studio-panorama.jpg',
        naturalWidth: 1408,
        naturalHeight: 768,
        isSample: true,
      });
      setSettings((prev) => ({
        ...prev,
        mode: 'carousel',
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
      }));
    } else {
      setImageMeta({
        src: SAMPLE_GRID_URL,
        name: 'sample-courtyard-grid.jpg',
        naturalWidth: 1024,
        naturalHeight: 1024,
        isSample: true,
      });
      setSettings((prev) => ({
        ...prev,
        mode: 'grid',
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
      }));
    }
  }, []);

  const handleDownloadZip = useCallback(async () => {
    if (slices.length === 0) return;
    setIsZipping(true);
    try {
      const zipBlob = await createZipBlob(slices);
      const baseName = imageMeta.name.replace(/\.[^.]+$/, '') || 'gridsplitcue';
      const suffix =
        settings.mode === 'carousel'
          ? `carousel-${settings.slideCount}slides-${settings.aspectRatio.replace(':', 'x')}`
          : `grid-${settings.gridPreset}-${settings.aspectRatio.replace(':', 'x')}`;
      triggerBlobDownload(zipBlob, `${baseName}-${suffix}.zip`);
    } finally {
      setIsZipping(false);
    }
  }, [slices, imageMeta.name, settings.mode, settings.slideCount, settings.gridPreset, settings.aspectRatio]);

  const handleDownloadSingle = useCallback((slice: GeneratedSlice) => {
    triggerBlobDownload(slice.blob, slice.filename);
  }, []);

  const handleExportJson = useCallback(() => {
    const payload: ProjectExportPayload = {
      app: 'GridSplitCue',
      version: 1,
      exportedAt: new Date().toISOString(),
      language: lang,
      settings,
      imageMeta: {
        name: imageMeta.name,
        naturalWidth: imageMeta.naturalWidth,
        naturalHeight: imageMeta.naturalHeight,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    triggerBlobDownload(blob, 'gridsplitcue-preset.json');
  }, [lang, settings, imageMeta]);

  const handleImportJson = useCallback(
    async (file: File): Promise<boolean> => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text) as Partial<ProjectExportPayload>;
        if (parsed.app !== 'GridSplitCue' || !parsed.settings) {
          return false;
        }
        const s = parsed.settings;
        setSettings((prev) => ({
          ...prev,
          mode: s.mode === 'grid' ? 'grid' : 'carousel',
          aspectRatio: s.aspectRatio === '1:1' ? '1:1' : '4:5',
          slideCount:
            typeof s.slideCount === 'number'
              ? Math.max(2, Math.min(10, Math.round(s.slideCount)))
              : prev.slideCount,
          gridPreset:
            s.gridPreset === '3x1' || s.gridPreset === '3x2' || s.gridPreset === '3x3'
              ? s.gridPreset
              : prev.gridPreset,
          outputFormat: s.outputFormat === 'jpeg' ? 'jpeg' : 'png',
          jpegQuality:
            typeof s.jpegQuality === 'number'
              ? Math.max(0.8, Math.min(1, s.jpegQuality))
              : prev.jpegQuality,
          zoom: typeof s.zoom === 'number' ? Math.max(1, Math.min(3, s.zoom)) : 1,
          offsetX: typeof s.offsetX === 'number' ? Math.max(-1, Math.min(1, s.offsetX)) : 0,
          offsetY: typeof s.offsetY === 'number' ? Math.max(-1, Math.min(1, s.offsetY)) : 0,
          showGuides: typeof s.showGuides === 'boolean' ? s.showGuides : true,
          projectNotes: typeof s.projectNotes === 'string' ? s.projectNotes : '',
        }));
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const handleResetDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Header
        lang={lang}
        onChangeLang={handleChangeLang}
        t={t}
        onPrint={handlePrint}
      />

      <main className="mx-auto max-w-[1280px] space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero Header */}
        <section className="no-print max-w-4xl space-y-2.5">
          <h1
            className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            {t.hero.h1}
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {t.hero.subtitle}
          </p>
        </section>

        {/* Primary Studio + Swipeable Preview Workspace */}
        <div className="no-print grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StudioCanvas
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetFraming={handleResetFraming}
              imageMeta={imageMeta}
              loadedImage={loadedImage}
              onUploadFile={handleUploadFile}
              onSelectSample={handleSelectSample}
              uploadError={uploadError}
              t={t}
            />
          </div>

          <div className="lg:col-span-5">
            <SwipeablePreview
              mode={settings.mode}
              aspectRatio={settings.aspectRatio}
              slices={slices}
              isRendering={isRendering}
              isZipping={isZipping}
              onDownloadZip={handleDownloadZip}
              onDownloadSingle={handleDownloadSingle}
              t={t}
            />
          </div>
        </div>

        {/* Local Persistence, Notes, JSON Export/Import & Print Trigger */}
        <ProjectPersistenceBar
          notes={settings.projectNotes}
          onChangeNotes={(projectNotes) => handleUpdateSettings({ projectNotes })}
          onExportJson={handleExportJson}
          onImportJson={handleImportJson}
          onPrint={handlePrint}
          onResetDefaults={handleResetDefaults}
          t={t}
        />

        {/* Media.net Ad Slot #1 (Mid-page between Studio/Preview and Editorial Guide) */}
        <MediaNetAdSlot slotId="medianet-mid-banner" placement="mid-page" />

        {/* Editorial SEO Guide + FAQ + Transparent Privacy Notice */}
        <EditorialSeoSection t={t} privacyNotice={t.hero.privacyNotice} />

        {/* Contextual Creator Gear Affiliates */}
        <CreatorGearAffiliates t={t} />

        {/* Media.net Ad Slot #2 (Bottom of page before Footer) */}
        <MediaNetAdSlot slotId="medianet-footer-banner" placement="footer-top" />

        {/* Clean Paper Print Sheet (@media print only) */}
        <PrintSummarySheet
          settings={settings}
          imageMeta={imageMeta}
          slices={slices}
          t={t}
        />
      </main>

      <footer className="no-print border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6">
          <span className="font-medium text-slate-700">{t.footer.copyright}</span>
          <span>{t.footer.canonicalNote}</span>
        </div>
      </footer>
    </div>
  );
}
