import { course } from "./data";
import type { ContentBlock } from "./types";

export type SearchKind = "class" | "content" | "keyData" | "glossary" | "bibliography" | "resource";

export interface SearchItem {
  kind: SearchKind;
  title: string;
  snippet: string;
  href: string;
  context: string;
  haystack: string;
}

function blockText(b: ContentBlock): string {
  if (b.type === "ul" || b.type === "ol") return b.items.join(" · ");
  return b.text;
}

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

let cached: SearchItem[] | null = null;

export function getIndex(): SearchItem[] {
  if (cached) return cached;
  const items: SearchItem[] = [];

  for (const c of course.classes) {
    items.push({
      kind: "class",
      title: c.title,
      snippet: c.objectives[0] ?? "",
      href: `/clase/${c.num}`,
      context: `Clase ${c.num} · ${c.eyebrow}`,
      haystack: norm([c.title, c.eyebrow, ...c.objectives, ...c.recap].join(" ")),
    });

    for (const b of c.content) {
      const text = blockText(b);
      if (!text || text.length < 40) continue;
      items.push({
        kind: "content",
        title: text.slice(0, 90) + (text.length > 90 ? "…" : ""),
        snippet: text,
        href: `/clase/${c.num}#section-content`,
        context: `Clase ${c.num} · ${c.title}`,
        haystack: norm(text),
      });
    }

    for (const kd of c.keyData) {
      items.push({
        kind: "keyData",
        title: kd,
        snippet: "",
        href: `/clase/${c.num}#section-keyData`,
        context: `Clase ${c.num} · Dato clave`,
        haystack: norm(kd),
      });
    }

    for (const r of c.resources) {
      items.push({
        kind: "resource",
        title: r.label,
        snippet: r.url,
        href: r.url,
        context: `Clase ${c.num} · Recurso externo`,
        haystack: norm(r.label + " " + r.url),
      });
    }
  }

  for (const g of course.glossary) {
    items.push({
      kind: "glossary",
      title: g.term,
      snippet: g.definition,
      href: `/glosario`,
      context: "Glosario",
      haystack: norm(g.term + " " + g.definition),
    });
  }

  for (const b of course.bibliography) {
    items.push({
      kind: "bibliography",
      title: b.title,
      snippet: b.url,
      href: b.url,
      context: "Bibliografía",
      haystack: norm(b.title + " " + b.url),
    });
  }

  cached = items;
  return items;
}

export function search(query: string, limit = 60): SearchItem[] {
  const q = query.trim();
  if (!q) return [];
  const terms = norm(q)
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (terms.length === 0) return [];
  const index = getIndex();
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of index) {
    let score = 0;
    let allMatched = true;
    for (const t of terms) {
      const idx = item.haystack.indexOf(t);
      if (idx === -1) {
        allMatched = false;
        break;
      }
      score += 1;
      if (idx < 60) score += 1;
      if (norm(item.title).includes(t)) score += 2;
    }
    if (!allMatched) continue;
    if (item.kind === "class") score += 1;
    if (item.kind === "glossary") score += 0.5;
    scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

export function highlight(text: string, query: string, maxLen = 220): string {
  if (!text) return "";
  const nq = norm(query.trim().split(/\s+/)[0] ?? "");
  if (!nq) return text.slice(0, maxLen);
  const nText = norm(text);
  const i = nText.indexOf(nq);
  if (i === -1) {
    return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
  }
  const start = Math.max(0, i - 60);
  const end = Math.min(text.length, i + maxLen - 60);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return prefix + text.slice(start, end) + suffix;
}
