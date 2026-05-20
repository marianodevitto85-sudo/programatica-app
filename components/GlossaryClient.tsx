"use client";

import { useMemo, useState } from "react";
import type { GlossaryEntry } from "@/lib/types";

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function GlossaryClient({
  entries,
}: {
  entries: GlossaryEntry[];
}) {
  const [q, setQ] = useState("");

  const sorted = useMemo(
    () =>
      [...entries].sort((a, b) =>
        a.term.localeCompare(b.term, "es", { sensitivity: "base" }),
      ),
    [entries],
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return sorted;
    const nq = norm(q.trim());
    return sorted.filter(
      (e) => norm(e.term).includes(nq) || norm(e.definition).includes(nq),
    );
  }, [q, sorted]);

  const groups = useMemo(() => {
    const m = new Map<string, GlossaryEntry[]>();
    for (const e of filtered) {
      const letter = e.term[0]?.toUpperCase() ?? "?";
      const arr = m.get(letter) ?? [];
      arr.push(e);
      m.set(letter, arr);
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div>
      <div className="sticky top-14 z-10 bg-bg/95 backdrop-blur py-3 -mx-1 px-1 mb-4 border-b border-border">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar término o definición…"
          className="w-full px-4 py-3 rounded-md border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-base"
        />
        <div className="mt-2 text-xs text-text-dim">
          {filtered.length} de {entries.length} términos
        </div>
      </div>

      {groups.length === 0 && (
        <p className="text-text-dim py-12 text-center">Sin coincidencias.</p>
      )}

      <div className="space-y-10">
        {groups.map(([letter, items]) => (
          <section key={letter}>
            <h2 className="text-accent font-bold text-xl mb-3 uppercase tracking-[2.4px]">{letter}</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((e) => (
                <div
                  key={e.term}
                  className="card"
                >
                  <dt className="font-semibold text-text mb-1">{e.term}</dt>
                  <dd className="text-sm text-text-muted leading-relaxed">
                    {e.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
