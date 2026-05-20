export type SectionKey =
  | "objectives"
  | "structure"
  | "content"
  | "keyData"
  | "recap"
  | "resources";

export const SECTION_ORDER: SectionKey[] = [
  "objectives",
  "structure",
  "content",
  "keyData",
  "recap",
  "resources",
];

export const SECTION_LABELS: Record<SectionKey, string> = {
  objectives: "Objetivos",
  structure: "Estructura",
  content: "Contenido",
  keyData: "Datos clave",
  recap: "Recap",
  resources: "Recursos",
};

export type ClassProgress = Partial<Record<SectionKey, boolean>>;
export type AllProgress = Record<number, ClassProgress>;

const PROGRESS_KEY = "programatica:progress:v1";
const NOTES_KEY = "programatica:notes:v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readAllProgress(): AllProgress {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AllProgress;
  } catch {
    return {};
  }
}

export function writeAllProgress(p: AllProgress) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    /* ignore quota errors */
  }
}

export function readClassProgress(num: number): ClassProgress {
  return readAllProgress()[num] ?? {};
}

export function writeClassProgress(num: number, cp: ClassProgress) {
  const all = readAllProgress();
  all[num] = cp;
  writeAllProgress(all);
}

export function classCompletionPct(cp: ClassProgress): number {
  const done = SECTION_ORDER.filter((k) => cp[k]).length;
  return Math.round((done / SECTION_ORDER.length) * 100);
}

export function readNote(num: number): string {
  if (!isBrowser()) return "";
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return "";
    const obj = JSON.parse(raw) as Record<string, string>;
    return obj[String(num)] ?? "";
  } catch {
    return "";
  }
}

export function writeNote(num: number, text: string) {
  if (!isBrowser()) return;
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    const obj = (raw ? JSON.parse(raw) : {}) as Record<string, string>;
    obj[String(num)] = text;
    localStorage.setItem(NOTES_KEY, JSON.stringify(obj));
  } catch {
    /* ignore */
  }
}
