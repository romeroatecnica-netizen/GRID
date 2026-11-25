export type SupportedLang =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'ar'
  | 'hi'
  | 'ru'
  | 'zh'
  | 'ja';

export type SplitterMode = 'carousel' | 'grid';
export type AspectRatioOption = '4:5' | '1:1';
export type GridPreset = '3x1' | '3x2' | '3x3';
export type OutputFormat = 'png' | 'jpeg';

export interface StudioSettings {
  mode: SplitterMode;
  aspectRatio: AspectRatioOption;
  slideCount: number; // 2..10
  gridPreset: GridPreset; // 3x1, 3x2, 3x3
  outputFormat: OutputFormat;
  jpegQuality: number; // 0.80..1.0
  zoom: number; // 1.0..3.0
  offsetX: number; // -1..1 normalized pan
  offsetY: number; // -1..1 normalized pan
  showGuides: boolean;
  projectNotes: string;
}

export interface SourceImageMeta {
  src: string;
  name: string;
  naturalWidth: number;
  naturalHeight: number;
  isSample: boolean;
}

export interface GeneratedSlice {
  index: number; // 1-based posting order (1..N)
  filename: string;
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  row: number; // 0-based visual row
  col: number; // 0-based visual col
}

export interface ProjectExportPayload {
  app: 'GridSplitCue';
  version: 1;
  exportedAt: string;
  language: SupportedLang;
  settings: StudioSettings;
  imageMeta?: {
    name: string;
    naturalWidth: number;
    naturalHeight: number;
  };
}
