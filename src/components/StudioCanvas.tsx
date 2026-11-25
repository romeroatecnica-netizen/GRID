import {
  Eye,
  EyeOff,
  Grid3X3,
  ImagePlus,
  Layers,
  Move,
  RotateCcw,
  Upload,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TranslationBundle } from '../i18n/translations';
import type {
  AspectRatioOption,
  GridPreset,
  OutputFormat,
  SourceImageMeta,
  SplitterMode,
  StudioSettings,
} from '../types/studio';
import { computeDrawPlacement, getCompositeGeometry } from '../utils/imageSlicer';

interface StudioCanvasProps {
  settings: StudioSettings;
  onUpdateSettings: (patch: Partial<StudioSettings>) => void;
  onResetFraming: () => void;
  imageMeta: SourceImageMeta;
  loadedImage: HTMLImageElement | null;
  onUploadFile: (file: File) => void;
  onSelectSample: (kind: 'panorama' | 'grid') => void;
  uploadError: string | null;
  t: TranslationBundle;
}

export function StudioCanvas({
  settings,
  onUpdateSettings,
  onResetFraming,
  imageMeta,
  loadedImage,
  onUploadFile,
  onSelectSample,
  uploadError,
  t,
}: StudioCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [containerWidth, setContainerWidth] = useState(640);

  const panStartRef = useRef<{
    clientX: number;
    clientY: number;
    startOffsetX: number;
    startOffsetY: number;
    maxShiftX: number;
    maxShiftY: number;
  } | null>(null);

  const geom = getCompositeGeometry(
    settings.mode,
    settings.aspectRatio,
    settings.slideCount,
    settings.gridPreset
  );

  // Measure canvas stage container width cleanly
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setContainerWidth(Math.floor(rect.width));
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute responsive display size matching composite aspect ratio
  const maxStageHeight = settings.mode === 'grid' ? 460 : 340;
  const aspect = geom.compositeWidth / geom.compositeHeight;
  let displayW = Math.max(240, containerWidth);
  let displayH = Math.round(displayW / aspect);
  if (displayH > maxStageHeight) {
    displayH = maxStageHeight;
    displayW = Math.round(displayH * aspect);
  }

  // Draw live HTML5 <canvas> preview with cut guides and numbered overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(displayW * dpr));
    canvas.height = Math.max(1, Math.round(displayH * dpr));

    ctx.save();
    ctx.scale(dpr, dpr);

    // Studio canvas backdrop
    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(0, 0, displayW, displayH);

    if (loadedImage) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const placement = computeDrawPlacement(
        loadedImage.naturalWidth,
        loadedImage.naturalHeight,
        displayW,
        displayH,
        settings.zoom,
        settings.offsetX,
        settings.offsetY
      );

      ctx.drawImage(
        loadedImage,
        placement.drawX,
        placement.drawY,
        placement.drawW,
        placement.drawH
      );
    }

    // Draw cut guide lines and slice numbers
    if (settings.showGuides) {
      const cellW = displayW / geom.cols;
      const cellH = displayH / geom.rows;

      // Vertical cut lines
      for (let c = 1; c < geom.cols; c++) {
        const x = Math.round(c * cellW) + 0.5;
        ctx.save();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, displayH);
        ctx.stroke();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, displayH);
        ctx.stroke();
        ctx.restore();
      }

      // Horizontal cut lines (for grid mode)
      for (let r = 1; r < geom.rows; r++) {
        const y = Math.round(r * cellH) + 0.5;
        ctx.save();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(displayW, y);
        ctx.stroke();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(displayW, y);
        ctx.stroke();
        ctx.restore();
      }

      // Numbered markers in posting order
      let orderIndex = 1;
      if (settings.mode === 'carousel') {
        for (let c = 0; c < geom.cols; c++) {
          const label = String(orderIndex++).padStart(2, '0');
          drawCornerNumber(ctx, c * cellW + 8, 8, label, '#4F46E5');
        }
      } else {
        for (let r = geom.rows - 1; r >= 0; r--) {
          for (let c = geom.cols - 1; c >= 0; c--) {
            const label = String(orderIndex++).padStart(2, '0');
            drawCornerNumber(ctx, c * cellW + 8, r * cellH + 8, label, '#DB2777');
          }
        }
      }
    }

    ctx.restore();
  }, [
    displayW,
    displayH,
    loadedImage,
    settings.zoom,
    settings.offsetX,
    settings.offsetY,
    settings.showGuides,
    settings.mode,
    geom.cols,
    geom.rows,
  ]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!loadedImage) return;
      const placement = computeDrawPlacement(
        loadedImage.naturalWidth,
        loadedImage.naturalHeight,
        displayW,
        displayH,
        settings.zoom,
        settings.offsetX,
        settings.offsetY
      );
      if (placement.maxShiftX <= 0.5 && placement.maxShiftY <= 0.5) return;

      e.currentTarget.setPointerCapture(e.pointerId);
      setIsPanning(true);
      panStartRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        startOffsetX: settings.offsetX,
        startOffsetY: settings.offsetY,
        maxShiftX: placement.maxShiftX,
        maxShiftY: placement.maxShiftY,
      };
    },
    [loadedImage, displayW, displayH, settings.zoom, settings.offsetX, settings.offsetY]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isPanning || !panStartRef.current) return;
      const start = panStartRef.current;
      const dx = e.clientX - start.clientX;
      const dy = e.clientY - start.clientY;

      const nextOffsetX =
        start.maxShiftX > 0.5
          ? Math.max(-1, Math.min(1, start.startOffsetX + dx / start.maxShiftX))
          : start.startOffsetX;
      const nextOffsetY =
        start.maxShiftY > 0.5
          ? Math.max(-1, Math.min(1, start.startOffsetY + dy / start.maxShiftY))
          : start.startOffsetY;

      onUpdateSettings({
        offsetX: Number(nextOffsetX.toFixed(3)),
        offsetY: Number(nextOffsetY.toFixed(3)),
      });
    },
    [isPanning, onUpdateSettings]
  );

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
    panStartRef.current = null;
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onUploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file);
      e.target.value = '';
    }
  };

  const setMode = (mode: SplitterMode) => onUpdateSettings({ mode });
  const setAspectRatio = (aspectRatio: AspectRatioOption) => onUpdateSettings({ aspectRatio });
  const setGridPreset = (gridPreset: GridPreset) => onUpdateSettings({ gridPreset });
  const setOutputFormat = (outputFormat: OutputFormat) => onUpdateSettings({ outputFormat });

  return (
    <section
      id="studio"
      className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6"
      aria-label={t.nav.studio}
    >
      {/* Top Mode Tabs + Upload Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
        <div
          role="tablist"
          aria-label="Splitter Mode"
          className="inline-flex rounded-lg bg-[#F1F5F9] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={settings.mode === 'carousel'}
            onClick={() => setMode('carousel')}
            className={`inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
              settings.mode === 'carousel'
                ? 'bg-white text-[#4F46E5] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t.studio.tabCarousel}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={settings.mode === 'grid'}
            onClick={() => setMode('grid')}
            className={`inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
              settings.mode === 'grid'
                ? 'bg-white text-[#DB2777] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid3X3 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t.studio.tabGrid}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectSample('panorama')}
            className="h-9 cursor-pointer whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
          >
            {t.studio.samplePanorama}
          </button>
          <button
            type="button"
            onClick={() => onSelectSample('grid')}
            className="h-9 cursor-pointer whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
          >
            {t.studio.sampleGrid}
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#4F46E5] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
          >
            <Upload className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{t.studio.chooseFile}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Interactive Dropzone + Canvas Workspace */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingFile(true);
        }}
        onDragLeave={() => setIsDraggingFile(false)}
        onDrop={handleDrop}
        className={`relative mt-5 rounded-xl border-2 border-dashed transition-colors ${
          isDraggingFile
            ? 'border-[#DB2777] bg-pink-50/40'
            : 'border-[#E2E8F0] bg-[#F8FAFC]'
        } p-3 sm:p-4`}
      >
        <div
          ref={containerRef}
          className="flex w-full flex-col items-center justify-center"
        >
          {loadedImage ? (
            <div className="relative overflow-hidden rounded-lg border border-slate-300/80 bg-white shadow-xs">
              <canvas
                ref={canvasRef}
                style={{ width: `${displayW}px`, height: `${displayH}px` }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`block touch-none select-none ${
                  isPanning ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-[240px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg text-center text-slate-600"
            >
              <ImagePlus className="h-9 w-9 text-[#4F46E5]" aria-hidden="true" />
              <span className="text-sm font-semibold text-slate-900">
                {t.studio.uploadTitle}
              </span>
              <span className="text-xs text-slate-500">{t.studio.uploadHint}</span>
            </button>
          )}
        </div>

        {/* Canvas micro-caption & drag hint */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Move className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            <span>{t.studio.dragToPanHint}</span>
          </span>
          <span className="truncate font-medium text-slate-700 max-w-[260px]">
            {imageMeta.name}
          </span>
        </div>

        {uploadError && (
          <p role="alert" className="mt-2 text-xs font-medium text-red-600">
            {uploadError}
          </p>
        )}
      </div>

      {/* Tabular Resolution Readout Strip */}
      <div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#E2E8F0] py-3 sm:grid-cols-4">
        <div>
          <div className="text-[11px] font-medium text-slate-500">
            {t.studio.sourceResLabel}
          </div>
          <div className="font-mono tabular-nums text-xs font-semibold text-slate-900 sm:text-sm">
            {imageMeta.naturalWidth}×{imageMeta.naturalHeight} px
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500">
            {t.studio.sliceResLabel}
          </div>
          <div className="font-mono tabular-nums text-xs font-semibold text-[#4F46E5] sm:text-sm">
            {geom.tileWidth}×{geom.tileHeight} px
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500">
            {t.studio.compositeResLabel}
          </div>
          <div className="font-mono tabular-nums text-xs font-semibold text-slate-900 sm:text-sm">
            {geom.compositeWidth}×{geom.compositeHeight} px
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500">
            {t.studio.piecesCountLabel}
          </div>
          <div className="font-mono tabular-nums text-xs font-semibold text-[#DB2777] sm:text-sm">
            {geom.totalPieces}{' '}
            {settings.mode === 'carousel' ? t.studio.slidesUnit : t.studio.piecesUnit}
          </div>
        </div>
      </div>

      {/* Precision Controls Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Aspect Ratio & Slide/Grid Count */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              {t.studio.aspectRatioLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAspectRatio('4:5')}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-start text-xs font-semibold tabular-nums transition-colors ${
                  settings.aspectRatio === '4:5'
                    ? 'border-[#4F46E5] bg-indigo-50/70 text-[#4F46E5]'
                    : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t.studio.ratio45}
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('1:1')}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-start text-xs font-semibold tabular-nums transition-colors ${
                  settings.aspectRatio === '1:1'
                    ? 'border-[#4F46E5] bg-indigo-50/70 text-[#4F46E5]'
                    : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t.studio.ratio11}
              </button>
            </div>
          </div>

          {settings.mode === 'carousel' ? (
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="slide-count-range"
                  className="text-xs font-semibold text-slate-700"
                >
                  {t.studio.slidesLabel}
                </label>
                <span className="font-mono tabular-nums text-xs font-bold text-[#4F46E5]">
                  {settings.slideCount} {t.studio.slidesUnit}
                </span>
              </div>
              <input
                id="slide-count-range"
                type="range"
                min={2}
                max={10}
                step={1}
                value={settings.slideCount}
                onChange={(e) =>
                  onUpdateSettings({ slideCount: Number(e.target.value) })
                }
                className="h-2 w-full cursor-pointer accent-[#4F46E5]"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onUpdateSettings({ slideCount: num })}
                    className={`h-7 min-w-[30px] cursor-pointer rounded border px-1.5 font-mono text-xs font-semibold tabular-nums transition-colors ${
                      settings.slideCount === num
                        ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                        : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                {t.studio.gridPresetLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['3x1', '3x2', '3x3'] as GridPreset[]).map((preset) => {
                  const pieces = preset === '3x1' ? 3 : preset === '3x2' ? 6 : 9;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setGridPreset(preset)}
                      className={`cursor-pointer rounded-lg border px-3 py-2 text-center font-mono text-xs font-semibold tabular-nums transition-colors ${
                        settings.gridPreset === preset
                          ? 'border-[#DB2777] bg-pink-50/70 text-[#DB2777]'
                          : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {preset.replace('x', '×')} · {pieces}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              {t.studio.formatLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOutputFormat('png')}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  settings.outputFormat === 'png'
                    ? 'border-[#4F46E5] bg-indigo-50/70 text-[#4F46E5]'
                    : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t.studio.formatPng}
              </button>
              <button
                type="button"
                onClick={() => setOutputFormat('jpeg')}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  settings.outputFormat === 'jpeg'
                    ? 'border-[#4F46E5] bg-indigo-50/70 text-[#4F46E5]'
                    : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t.studio.formatJpeg}
              </button>
            </div>
          </div>
        </div>

        {/* Framing: Zoom, Pan X/Y, Guides Toggle, Reset */}
        <div className="space-y-3.5">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="zoom-range" className="text-xs font-semibold text-slate-700">
                {t.studio.zoomLabel}
              </label>
              <span className="font-mono tabular-nums text-xs font-semibold text-slate-900">
                {Math.round(settings.zoom * 100)}%
              </span>
            </div>
            <input
              id="zoom-range"
              type="range"
              min={1}
              max={3}
              step={0.02}
              value={settings.zoom}
              onChange={(e) => onUpdateSettings({ zoom: Number(e.target.value) })}
              className="h-2 w-full cursor-pointer accent-[#DB2777]"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="pan-x-range" className="text-xs font-semibold text-slate-700">
                {t.studio.panXLabel}
              </label>
              <span className="font-mono tabular-nums text-xs text-slate-600">
                {Math.round(settings.offsetX * 100)}%
              </span>
            </div>
            <input
              id="pan-x-range"
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={settings.offsetX}
              onChange={(e) => onUpdateSettings({ offsetX: Number(e.target.value) })}
              className="h-2 w-full cursor-pointer accent-[#4F46E5]"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="pan-y-range" className="text-xs font-semibold text-slate-700">
                {t.studio.panYLabel}
              </label>
              <span className="font-mono tabular-nums text-xs text-slate-600">
                {Math.round(settings.offsetY * 100)}%
              </span>
            </div>
            <input
              id="pan-y-range"
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={settings.offsetY}
              onChange={(e) => onUpdateSettings({ offsetY: Number(e.target.value) })}
              className="h-2 w-full cursor-pointer accent-[#4F46E5]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => onUpdateSettings({ showGuides: !settings.showGuides })}
              className={`inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                settings.showGuides
                  ? 'border-[#4F46E5] bg-indigo-50/70 text-[#4F46E5]'
                  : 'border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {settings.showGuides ? (
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{t.studio.showGuides}</span>
            </button>

            <button
              type="button"
              onClick={onResetFraming}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.studio.resetFraming}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function drawCornerNumber(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  accentColor: string
) {
  ctx.save();
  ctx.font = '600 11px "JetBrains Mono", monospace';
  const padX = 6;
  const w = 26;
  const h = 20;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.84)';
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.fill();

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + w / 2 + (padX - padX), y + h / 2 + 0.5);
  ctx.restore();
}
