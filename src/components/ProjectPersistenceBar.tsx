import { Download, Printer, RotateCcw, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import type { TranslationBundle } from '../i18n/translations';

interface ProjectPersistenceBarProps {
  notes: string;
  onChangeNotes: (notes: string) => void;
  onExportJson: () => void;
  onImportJson: (file: File) => Promise<boolean>;
  onPrint: () => void;
  onResetDefaults: () => void;
  t: TranslationBundle;
}

export function ProjectPersistenceBar({
  notes,
  onChangeNotes,
  onExportJson,
  onImportJson,
  onPrint,
  onResetDefaults,
  t,
}: ProjectPersistenceBarProps) {
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok = await onImportJson(file);
    setFeedback(
      ok
        ? { type: 'ok', text: t.persistence.importSuccess }
        : { type: 'err', text: t.persistence.importError }
    );
    e.target.value = '';
    window.setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <section
      aria-label={t.persistence.title}
      className="no-print rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-sm font-bold text-slate-900 sm:text-base">
            {t.persistence.title}
          </h2>
          <p className="text-xs text-slate-500">{t.persistence.savedLocally}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.persistence.exportJson}</span>
          </button>

          <button
            type="button"
            onClick={() => jsonInputRef.current?.click()}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.persistence.importJson}</span>
          </button>
          <input
            ref={jsonInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.persistence.printSheet}</span>
          </button>

          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-white px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.persistence.resetDefaults}</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="project-notes-input"
          className="mb-1.5 block text-xs font-semibold text-slate-700"
        >
          {t.persistence.notesLabel}
        </label>
        <textarea
          id="project-notes-input"
          rows={2}
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder={t.persistence.notesPlaceholder}
          className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/15"
        />
        {feedback && (
          <p
            role="status"
            className={`mt-1.5 text-xs font-medium ${
              feedback.type === 'ok' ? 'text-[#059669]' : 'text-red-600'
            }`}
          >
            {feedback.text}
          </p>
        )}
      </div>
    </section>
  );
}
