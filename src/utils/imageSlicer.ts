import JSZip from 'jszip';
import type {
  AspectRatioOption,
  GeneratedSlice,
  GridPreset,
  OutputFormat,
  SplitterMode,
} from '../types/studio';

export interface CompositeGeometry {
  cols: number;
  rows: number;
  tileWidth: number;
  tileHeight: number;
  compositeWidth: number;
  compositeHeight: number;
  totalPieces: number;
}

export function getCompositeGeometry(
  mode: SplitterMode,
  aspectRatio: AspectRatioOption,
  slideCount: number,
  gridPreset: GridPreset
): CompositeGeometry {
  const tileWidth = 1080;
  const tileHeight = aspectRatio === '4:5' ? 1350 : 1080;

  let cols = slideCount;
  let rows = 1;

  if (mode === 'grid') {
    cols = 3;
    rows = gridPreset === '3x1' ? 1 : gridPreset === '3x2' ? 2 : 3;
  }

  return {
    cols,
    rows,
    tileWidth,
    tileHeight,
    compositeWidth: cols * tileWidth,
    compositeHeight: rows * tileHeight,
    totalPieces: cols * rows,
  };
}

export interface DrawPlacement {
  drawX: number;
  drawY: number;
  drawW: number;
  drawH: number;
  maxShiftX: number;
  maxShiftY: number;
}

export function computeDrawPlacement(
  imgWidth: number,
  imgHeight: number,
  targetWidth: number,
  targetHeight: number,
  zoom: number,
  offsetX: number,
  offsetY: number
): DrawPlacement {
  const baseScale = Math.max(targetWidth / imgWidth, targetHeight / imgHeight);
  const scale = baseScale * Math.max(1, zoom);
  const drawW = imgWidth * scale;
  const drawH = imgHeight * scale;

  const centerX = (targetWidth - drawW) / 2;
  const centerY = (targetHeight - drawH) / 2;
  const maxShiftX = Math.max(0, (drawW - targetWidth) / 2);
  const maxShiftY = Math.max(0, (drawH - targetHeight) / 2);

  const clampedX = Math.max(-1, Math.min(1, offsetX));
  const clampedY = Math.max(-1, Math.min(1, offsetY));

  return {
    drawX: centerX + clampedX * maxShiftX,
    drawY: centerY + clampedY * maxShiftY,
    drawW,
    drawH,
    maxShiftX,
    maxShiftY,
  };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas export failed'));
      },
      mimeType,
      quality
    );
  });
}

export async function generateFullResSlices(params: {
  image: HTMLImageElement;
  mode: SplitterMode;
  aspectRatio: AspectRatioOption;
  slideCount: number;
  gridPreset: GridPreset;
  outputFormat: OutputFormat;
  jpegQuality: number;
  zoom: number;
  offsetX: number;
  offsetY: number;
}): Promise<GeneratedSlice[]> {
  const {
    image,
    mode,
    aspectRatio,
    slideCount,
    gridPreset,
    outputFormat,
    jpegQuality,
    zoom,
    offsetX,
    offsetY,
  } = params;

  const geom = getCompositeGeometry(mode, aspectRatio, slideCount, gridPreset);
  const masterCanvas = document.createElement('canvas');
  masterCanvas.width = geom.compositeWidth;
  masterCanvas.height = geom.compositeHeight;

  const masterCtx = masterCanvas.getContext('2d', { alpha: outputFormat === 'png' });
  if (!masterCtx) {
    throw new Error('Could not initialize 2D canvas context');
  }

  masterCtx.imageSmoothingEnabled = true;
  masterCtx.imageSmoothingQuality = 'high';

  if (outputFormat === 'jpeg') {
    masterCtx.fillStyle = '#FFFFFF';
    masterCtx.fillRect(0, 0, geom.compositeWidth, geom.compositeHeight);
  }

  const placement = computeDrawPlacement(
    image.naturalWidth,
    image.naturalHeight,
    geom.compositeWidth,
    geom.compositeHeight,
    zoom,
    offsetX,
    offsetY
  );

  masterCtx.drawImage(
    image,
    placement.drawX,
    placement.drawY,
    placement.drawW,
    placement.drawH
  );

  const mimeType = outputFormat === 'png' ? 'image/png' : 'image/jpeg';
  const ext = outputFormat === 'png' ? 'png' : 'jpg';

  // Determine coordinates in posting order:
  // Carousel: left-to-right (col 0 -> N-1)
  // Grid: Instagram posting order (bottom-right first -> top-left last)
  const orderedCoords: Array<{ row: number; col: number }> = [];
  if (mode === 'carousel') {
    for (let col = 0; col < geom.cols; col++) {
      orderedCoords.push({ row: 0, col });
    }
  } else {
    for (let row = geom.rows - 1; row >= 0; row--) {
      for (let col = geom.cols - 1; col >= 0; col--) {
        orderedCoords.push({ row, col });
      }
    }
  }

  const tileCanvas = document.createElement('canvas');
  tileCanvas.width = geom.tileWidth;
  tileCanvas.height = geom.tileHeight;
  const tileCtx = tileCanvas.getContext('2d', { alpha: outputFormat === 'png' });
  if (!tileCtx) {
    throw new Error('Could not initialize tile 2D canvas context');
  }
  tileCtx.imageSmoothingEnabled = true;
  tileCtx.imageSmoothingQuality = 'high';

  const slices: GeneratedSlice[] = [];

  for (let i = 0; i < orderedCoords.length; i++) {
    const { row, col } = orderedCoords[i];
    const sx = col * geom.tileWidth;
    const sy = row * geom.tileHeight;

    tileCtx.clearRect(0, 0, geom.tileWidth, geom.tileHeight);
    tileCtx.drawImage(
      masterCanvas,
      sx,
      sy,
      geom.tileWidth,
      geom.tileHeight,
      0,
      0,
      geom.tileWidth,
      geom.tileHeight
    );

    const blob = await canvasToBlob(tileCanvas, mimeType, jpegQuality);
    const dataUrl = URL.createObjectURL(blob);
    const padded = String(i + 1).padStart(2, '0');
    const prefix = mode === 'carousel' ? 'slide' : 'grid';

    slices.push({
      index: i + 1,
      filename: `${padded}-${prefix}.${ext}`,
      dataUrl,
      blob,
      width: geom.tileWidth,
      height: geom.tileHeight,
      row,
      col,
    });
  }

  return slices;
}

export async function createZipBlob(slices: GeneratedSlice[]): Promise<Blob> {
  const zip = new JSZip();
  for (const slice of slices) {
    zip.file(slice.filename, slice.blob, { binary: true });
  }
  return zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
}

export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
