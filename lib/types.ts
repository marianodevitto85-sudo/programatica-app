export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface Resource {
  label: string;
  url: string;
}

export interface CourseClass {
  num: number;
  title: string;
  duration: string;
  eyebrow: string;
  objectives: string[];
  structure: string[];
  content: ContentBlock[];
  keyData: string[];
  recap: string[];
  resources: Resource[];
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface BibliographyEntry {
  title: string;
  url: string;
}

export interface CourseMeta {
  title: string;
  subtitle: string;
  audience: string;
  coverage: string;
  totalClasses: number;
  totalWords: number;
  language?: string;
  lastUpdated: string;
}

export interface CourseData {
  meta: CourseMeta;
  palette?: Record<string, string>;
  classes: CourseClass[];
  glossary: GlossaryEntry[];
  bibliography: BibliographyEntry[];
}
