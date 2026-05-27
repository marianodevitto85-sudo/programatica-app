export type SectionKey =
  | "objectives"
  | "structure"
  | "content"
  | "keyData"
  | "recap"
  | "resources"
  | "quiz";

export const SECTION_ORDER: SectionKey[] = [
  "objectives",
  "structure",
  "content",
  "keyData",
  "recap",
  "resources",
  "quiz",
];

export const SECTION_LABELS: Record<SectionKey, string> = {
  objectives: "Objetivos",
  structure: "Estructura",
  content: "Contenido",
  keyData: "Datos clave",
  recap: "Recap",
  resources: "Recursos",
  quiz: "Quiz",
};

export type ClassProgress = Partial<Record<SectionKey, boolean>>;
export type AllProgress = Record<number, ClassProgress>;

/** Score del quiz por clase: { [num]: { score, total, pct, attempts } } */
export type QuizScore = { score: number; total: number; pct: number; attempts: number };
export type AllQuizScores = Record<number, QuizScore>;

const PROGRESS_KEY = "programatica:progress:v1";
const NOTES_KEY = "programatica:notes:v1";
const QUIZ_SCORES_KEY = "programatica:quizScores:v1";

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

/* ============================================================
 * Quiz scores — persistencia del resultado del quiz por clase
 * ============================================================ */

export function readAllQuizScores(): AllQuizScores {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(QUIZ_SCORES_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AllQuizScores;
  } catch {
    return {};
  }
}

export function readQuizScore(num: number): QuizScore | null {
  return readAllQuizScores()[num] ?? null;
}

export function writeQuizScore(num: number, score: number, total: number) {
  if (!isBrowser()) return;
  const all = readAllQuizScores();
  const prev = all[num];
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  all[num] = { score, total, pct, attempts: (prev?.attempts ?? 0) + 1 };
  try {
    localStorage.setItem(QUIZ_SCORES_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

/* ============================================================
 * Auto-marcar sección como vista (no sobreescribe si ya está)
 * ============================================================ */

export function markSectionViewed(num: number, key: SectionKey) {
  const cp = readClassProgress(num);
  if (cp[key]) return;        // ya está marcada — no tocar
  cp[key] = true;
  writeClassProgress(num, cp);
}
