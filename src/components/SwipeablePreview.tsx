import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { TranslationBundle } from '../i18n/translations';
import type { AspectRatioOption, GeneratedSlice, SplitterMode } from '../types/studio';

interface SwipeablePreviewProps {
  mode: SplitterMode;
  aspectRatio: AspectRatioOption;
  slices: GeneratedSlice[];
  isRendering: boolean;
  isZipping: boolean;
  onDownloadZip: () => void;
  onDownloadSingle: (slice: GeneratedSlice) => void;
  t: TranslationBundle;
}

export function SwipeablePreview({
  mode,
  aspectRatio,
  slices,
  isRendering,
  isZipping,
  onDownloadZip,
  onDownloadSingle,
  t,
}: SwipeablePreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  // Clamp activeIndex when slice count shrinks
  useEffect(() => {
    if (slices.length > 0 && activeIndex >= slices.length) {
      setActiveIndex(slices.length - 1);
    } else if (slices.length === 0) {
      setActiveIndex(0);
    }
  }, [slices.length, activeIndex]);

  const total = slices.length;
  const activeSlice = slices[activeIndex] ?? null;

  const goPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setActiveIndex((prev) => Math.min(total - 1, prev + 1));

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    swipeStartX.current = e.clientX;
    setDragDeltaX(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;
    setDragDeltaX(e.clientX - swipeStartX.current);
  };

  const handlePointerEnd = () => {
    if (swipeStartX.current === null) return;
    const threshold = 42;
    if (dragDeltaX < -threshold && activeIndex < total - 1) {
      goNext();
    } else if (dragDeltaX > threshold && activeIndex > 0) {
      goPrev();
    }
    swipeStartX.current = null;
    setDragDeltaX(0);
  };

  // Visual row-col sorted copy for Profile Grid mockup (top-left -> bottom-right)
  const visualGridSlices =
    mode === 'grid'
      ? [...slices].sort((a, b) => (a.row !== b.row ? a.row - b.row : a.col - b.col))
      : [];

  return (
    <aside
      id="preview"
      className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6"
      aria-label={t.preview.title}
    >
      <div>
        <div className="flex items-start justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="font-display text-base font-bold text-slate-950 sm:text-lg">
              {t.preview.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              {mode === 'carousel' ? t.preview.carouselHint : t.preview.gridHint}
            </p>
          </div>
          {total > 0 && (
            <span className="font-mono tabular-nums shrink-0 text-xs font-semibold text-slate-700">
              {String(activeIndex + 1).padStart(2, '0')} {t.preview.slideOf}{' '}
              {String(total).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* Loading State */}
        {isRendering && slices.length === 0 ? (
          <div className="my-12 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin text-[#4F46E5]" aria-hidden="true" />
            <span className="text-xs font-medium">{t.preview.renderingSlices}</span>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Interactive Swipeable Stage */}
            <div className="relative mx-auto w-full max-w-[320px]">
              {/* Top Progress Bar */}
              {total > 1 && (
                <div className="mb-2.5 flex items-center gap-1" aria-hidden="true">
                  {slices.map((s, idx) => (
                    <button
                      key={s.filename}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1 flex-1 cursor-pointer rounded-full transition-colors ${
                        idx === activeIndex ? 'bg-[#4F46E5]' : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Swipeable Viewport */}
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') goPrev();
                  if (e.key === 'ArrowRight') goNext();
                }}
                tabIndex={0}
                className={`relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] select-none touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                  aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'
                }`}
              >
                <div
                  className="flex h-full w-full transition-transform duration-200 ease-out"
                  style={{
                    transform: `translate3d(calc(${-activeIndex * 100}% + ${dragDeltaX}px), 0, 0)`,
                  }}
                >
                  {slices.map((slice) => (
                    <div
                      key={slice.filename}
                      className="relative h-full w-full shrink-0 bg-slate-100"
                    >
                      <img
                        src={slice.dataUrl}
                        alt={slice.filename}
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Prev / Next Overlay Controls */}
                {activeIndex > 0 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t.preview.prev}
                    className="absolute start-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-950/75 text-white transition-colors hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}

                {activeIndex < total - 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t.preview.next}
                    className="absolute end-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-950/75 text-white transition-colors hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}

                {/* Posting order label for Grid Mode */}
                {mode === 'grid' && activeSlice && (
                  <div className="pointer-events-none absolute bottom-2.5 start-2.5 rounded-md bg-slate-950/80 px-2 py-1 font-mono text-[11px] font-semibold tabular-nums text-white">
                    #{String(activeSlice.index).padStart(2, '0')}
                    {activeSlice.index === 1
                      ? ` · ${t.preview.uploadFirstBadge}`
                      : activeSlice.index === total
                        ? ` · ${t.preview.uploadLastBadge}`
                        : ''}
                  </div>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>{t.preview.swipeHint}</span>
                {activeSlice && (
                  <span className="font-mono tabular-nums font-medium text-slate-700">
                    {activeSlice.filename}
                  </span>
                )}
              </div>
            </div>

            {/* Grid Mode: Assembled 3-Column Profile Grid Mockup */}
            {mode === 'grid' && visualGridSlices.length > 0 && (
              <div className="mx-auto max-w-[320px] pt-1">
                <div className="grid grid-cols-3 gap-0.5 overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#E2E8F0]">
                  {visualGridSlices.map((slice) => {
                    const isSelected = slice.index - 1 === activeIndex;
                    return (
                      <button
                        key={slice.filename}
                        type="button"
                        onClick={() => setActiveIndex(slice.index - 1)}
                        className={`group relative cursor-pointer overflow-hidden bg-white focus-visible:outline-none ${
                          aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'
                        } ${isSelected ? 'ring-2 ring-inset ring-[#DB2777]' : ''}`}
                      >
                        <img
                          src={slice.dataUrl}
                          alt={slice.filename}
                          className="h-full w-full object-cover transition-transform duration-150 group-hover:scale-[1.03]"
                        />
                        <span className="absolute bottom-1 end-1 rounded bg-slate-950/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-white">
                          {String(slice.index).padStart(2, '0')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Numbered Thumbnail Strip */}
            <div>
              <div className="thin-scrollbar flex gap-2 overflow-x-auto pb-1.5">
                {slices.map((slice, idx) => {
                  const selected = idx === activeIndex;
                  return (
                    <button
                      key={slice.filename}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-all ${
                        selected
                          ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/25'
                          : 'border-[#E2E8F0] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`w-14 overflow-hidden bg-slate-100 ${
                          aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'
                        }`}
                      >
                        <img
                          src={slice.dataUrl}
                          alt={slice.filename}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span
                        className={`block w-full py-0.5 text-center font-mono text-[10px] font-semibold tabular-nums ${
                          selected
                            ? 'bg-[#4F46E5] text-white'
                            : 'bg-[#F8FAFC] text-slate-700'
                        }`}
                      >
                        {String(slice.index).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Download Actions */}
      <div className="mt-5 space-y-2.5 border-t border-[#E2E8F0] pt-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={isRendering || isZipping || slices.length === 0}
            onClick={onDownloadZip}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#059669] px-4 text-sm font-bold text-white transition-colors hover:bg-[#047857] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
          >
            {isZipping ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Archive className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{isZipping ? t.preview.packagingZip : t.preview.downloadZip}</span>
          </button>

          {activeSlice && (
            <button
              type="button"
              disabled={isRendering}
              onClick={() => onDownloadSingle(activeSlice)}
              className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-white px-3.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              <Download className="h-4 w-4 text-slate-600" aria-hidden="true" />
              <span>
                {t.preview.downloadSingle} ({String(activeSlice.index).padStart(2, '0')})
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 text-[#059669] font-medium">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.preview.zeroWatermarkTag}</span>
          </span>
          <span className="tabular-nums">{t.preview.zipReady}</span>
        </div>
      </div>
    </aside>
  );
}
