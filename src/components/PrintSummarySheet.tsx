import type { TranslationBundle } from '../i18n/translations';
import type { GeneratedSlice, SourceImageMeta, StudioSettings } from '../types/studio';
import { getCompositeGeometry } from '../utils/imageSlicer';

interface PrintSummarySheetProps {
  settings: StudioSettings;
  imageMeta: SourceImageMeta;
  slices: GeneratedSlice[];
  t: TranslationBundle;
}

export function PrintSummarySheet({
  settings,
  imageMeta,
  slices,
  t,
}: PrintSummarySheetProps) {
  const geom = getCompositeGeometry(
    settings.mode,
    settings.aspectRatio,
    settings.slideCount,
    settings.gridPreset
  );

  return (
    <section className="print-only hidden bg-white text-slate-950">
      <div className="border-b border-slate-300 pb-4">
        <h1 className="font-display text-2xl font-bold">{t.print.sheetTitle}</h1>
        <p className="mt-1 text-xs text-slate-600">
          {t.print.generatedOn}: {new Date().toLocaleDateString()} · {imageMeta.name} (
          {imageMeta.naturalWidth}×{imageMeta.naturalHeight} px)
        </p>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4 border-b border-slate-200 pb-4 text-sm">
        <div>
          <div className="text-xs text-slate-500">{t.print.modeLabel}</div>
          <div className="font-semibold">
            {settings.mode === 'carousel'
              ? t.studio.tabCarousel
              : `${t.studio.tabGrid} (${settings.gridPreset.replace('x', '×')})`}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">{t.print.tileSizeLabel}</div>
          <div className="font-mono font-semibold tabular-nums">
            {geom.tileWidth}×{geom.tileHeight} px
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">{t.print.totalSlicesLabel}</div>
          <div className="font-mono font-semibold tabular-nums">{geom.totalPieces}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">{t.print.formatLabel}</div>
          <div className="font-mono font-semibold uppercase">{settings.outputFormat}</div>
        </div>
      </div>

      {settings.projectNotes.trim().length > 0 && (
        <div className="mt-5 border-b border-slate-200 pb-4">
          <h2 className="font-display text-sm font-bold">{t.print.notesHeading}</h2>
          <p className="mt-1.5 whitespace-pre-wrap text-sm text-slate-800">
            {settings.projectNotes}
          </p>
        </div>
      )}

      <div className="mt-5">
        <h2 className="font-display text-sm font-bold">{t.print.checklistHeading}</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {slices.map((slice) => (
            <div
              key={slice.filename}
              className="flex items-center gap-2.5 rounded border border-slate-300 p-2"
            >
              <img
                src={slice.dataUrl}
                alt={slice.filename}
                className="h-12 w-10 rounded object-cover"
              />
              <div className="min-w-0">
                <div className="font-mono text-xs font-bold tabular-nums">
                  {t.print.checklistStepPrefix} #{String(slice.index).padStart(2, '0')}
                </div>
                <div className="truncate font-mono text-[11px] text-slate-600">
                  {slice.filename}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
