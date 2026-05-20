"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { search, highlight, type SearchKind } from "@/lib/search";

const KIND_LABEL: Record<SearchKind, string> = {
  class: "Clase",
  content: "Contenido",
  keyData: "Dato clave",
  glossary: "Glosario",
  bibliography: "Bibliografía",
  resource: "Recurso",
};

const KIND_COLOR: Record<SearchKind, string> = {
  class: "bg-accent text-bg",
  content: "bg-surface text-text",
  keyData: "bg-accent/10 text-accent",
  glossary: "bg-surface text-text-muted",
  bibliography: "bg-surface text-text-muted",
  resource: "bg-surface text-text-muted",
};

export default function SearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !(
          e.target instanceof HTMLElement &&
          ["INPUT", "TEXTAREA"].includes(e.target.tagName)
        )
      ) {
        e.preventDefault();
        const el = document.getElementById("global-search-input");
        if (el) (el as HTMLInputElement).focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => search(q, 80), [q]);

  const grouped = useMemo(() => {
    const order: SearchKind[] = [
      "class",
      "glossary",
      "keyData",
      "content",
      "resource",
      "bibliography",
    ];
    const m = new Map<SearchKind, typeof results>();
    for (const r of results) {
      const arr = m.get(r.kind) ?? [];
      arr.push(r);
      m.set(r.kind, arr);
    }
    return order
      .filter((k) => m.has(k))
      .map((k) => ({ kind: k, items: m.get(k)! }));
  }, [results]);

  return (
    <div>
      <div className="sticky top-14 z-10 bg-bg/95 backdrop-blur py-3 -mx-1 px-1 border-b border-border">
        <div className="relative">
          <input
            id="global-search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar en clases, glosario, datos y bibliografía…"
            className="w-full px-4 py-3 pr-16 rounded-md border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-base"
            autoFocus
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-text-dim bg-border px-1.5 py-0.5 rounded">
            /
          </kbd>
        </div>
        {q.trim() && (
          <div className="mt-2 text-xs text-text-dim">
            {results.length === 0
              ? "Sin resultados"
              : `${results.length} resultado${results.length === 1 ? "" : "s"}`}
          </div>
        )}
      </div>

      {!q.trim() && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {["walled gardens", "DCO", "CTV", "ABM", "clean room", "DMA"].map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQ(s)}
                className="rounded-md border border-border bg-surface hover:border-accent hover:bg-surface-2 transition-colors p-4 text-left"
              >
                <div className="eyebrow mb-1">Sugerencia</div>
                <div className="text-text font-semibold">{s}</div>
              </button>
            ),
          )}
        </div>
      )}

      <div className="mt-6 space-y-8">
        {grouped.map(({ kind, items }) => (
          <section key={kind}>
            <h3 className="eyebrow mb-3">
              {KIND_LABEL[kind]} · {items.length}
            </h3>
            <ul className="space-y-2">
              {items.slice(0, 15).map((r, i) => (
                <li key={i}>
                  <ResultItem
                    kind={r.kind}
                    title={r.title}
                    snippet={r.snippet}
                    context={r.context}
                    href={r.href}
                    query={q}
                  />
                </li>
              ))}
            </ul>
            {items.length > 15 && (
              <div className="text-xs text-text-dim mt-2">
                +{items.length - 15} más
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function ResultItem({
  kind,
  title,
  snippet,
  context,
  href,
  query,
}: {
  kind: SearchKind;
  title: string;
  snippet: string;
  context: string;
  href: string;
  query: string;
}) {
  const external = href.startsWith("http");
  const inner = (
    <div className="rounded-md border border-border bg-surface hover:border-accent hover:bg-surface-2 transition-colors p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${KIND_COLOR[kind]}`}
        >
          {KIND_LABEL[kind]}
        </span>
        <span className="text-[11px] text-text-dim">{context}</span>
      </div>
      <div className="text-text font-semibold leading-snug">{title}</div>
      {snippet && (
        <div className="text-sm text-text-muted mt-1 leading-relaxed">
          {highlight(snippet, query)}
        </div>
      )}
    </div>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    );
  }
  return <Link href={href}>{inner}</Link>;
}
