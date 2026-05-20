"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CourseClass } from "@/lib/types";
import {
  SECTION_ORDER,
  SECTION_LABELS,
  type SectionKey,
  readClassProgress,
  writeClassProgress,
  readNote,
  writeNote,
  classCompletionPct,
} from "@/lib/progress";

import ClassContent from "./ClassContent";
import KeyDataGrid from "./KeyDataGrid";
import RecapBox from "./RecapBox";
import ResourceList from "./ResourceList";

interface Props {
  c: CourseClass;
  prevNum: number | null;
  nextNum: number | null;
}

export default function ClassShell({ c, prevNum, nextNum }: Props) {
  const router = useRouter();
  const [progress, setProgress] = useState<Partial<Record<SectionKey, boolean>>>({});
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(true);
  const [readingMode, setReadingMode] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("objectives");

  useEffect(() => {
    setProgress(readClassProgress(c.num));
    setNote(readNote(c.num));
  }, [c.num]);

  useEffect(() => {
    const handler = () => {
      const sections = SECTION_ORDER.map((k) => ({
        key: k,
        el: document.getElementById(`section-${k}`),
      })).filter((s) => s.el);
      const y = window.scrollY + 140;
      let current: SectionKey = "objectives";
      for (const s of sections) {
        if (s.el && s.el.offsetTop <= y) current = s.key;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA"].includes(e.target.tagName)
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && prevNum != null) {
        router.push(`/clase/${prevNum}`);
      } else if (e.key === "ArrowRight" && nextNum != null) {
        router.push(`/clase/${nextNum}`);
      } else if (e.key === "r") {
        setReadingMode((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevNum, nextNum, router]);

  const toggle = (k: SectionKey) => {
    const next = { ...progress, [k]: !progress[k] };
    setProgress(next);
    writeClassProgress(c.num, next);
  };

  const onNoteChange = (v: string) => {
    setNote(v);
    setNoteSaved(false);
  };

  useEffect(() => {
    if (noteSaved) return;
    const t = setTimeout(() => {
      writeNote(c.num, note);
      setNoteSaved(true);
    }, 500);
    return () => clearTimeout(t);
  }, [note, noteSaved, c.num]);

  const pct = classCompletionPct(progress);

  return (
    <div className="max-w-container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6 text-sm">
        <Link href="/" className="text-text-muted hover:text-accent transition-colors">
          ← Mapa del curso
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setReadingMode((v) => !v)}
            className="px-3 py-1.5 rounded-md border border-border hover:border-accent text-text font-medium text-sm"
            title="Atajo: r"
          >
            {readingMode ? "Mostrar sidebar" : "Modo lectura"}
          </button>
        </div>
      </div>

      <header className="mb-10">
        <div className="eyebrow mb-3">
          Clase {String(c.num).padStart(2, "0")} · {c.eyebrow}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight max-w-4xl">
          {c.title}
        </h1>
        <div className="mt-6 flex items-center gap-3 text-xs text-text-muted">
          <div className="flex-1 max-w-xs h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="tabular-nums font-semibold text-accent">{pct}%</span>
          <span>completado</span>
        </div>
      </header>

      <div
        className={`grid gap-10 ${
          readingMode ? "grid-cols-1" : "lg:grid-cols-[240px_1fr]"
        }`}
      >
        {!readingMode && (
          <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <nav className="card p-3">
              <div className="eyebrow mb-3 text-xs">Secciones</div>
              <ul className="flex flex-col gap-0.5">
                {SECTION_ORDER.map((k) => {
                  const checked = !!progress[k];
                  const active = activeSection === k;
                  return (
                    <li key={k}>
                      <div
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-sm transition-colors ${
                          active ? "bg-surface" : "hover:bg-surface/50"
                        }`}
                      >
                        <input
                          id={`chk-${k}`}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(k)}
                          className="h-4 w-4 rounded border-border accent-accent"
                          aria-label={`Marcar ${SECTION_LABELS[k]} como leído`}
                        />
                        <a
                          href={`#section-${k}`}
                          className={`flex-1 text-sm ${
                            active
                              ? "text-accent font-semibold"
                              : "text-text-muted hover:text-text"
                          } ${checked ? "line-through opacity-50" : ""}`}
                        >
                          {SECTION_LABELS[k]}
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-4 card p-3">
              <div className="eyebrow mb-3 text-xs">Mis notas</div>
              <textarea
                value={note}
                onChange={(e) => onNoteChange(e.target.value)}
                placeholder="Notas personales (Markdown). Se guardan en este navegador."
                className="w-full min-h-[140px] text-sm rounded-sm border border-border bg-surface-2 text-text p-2 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent leading-snug"
              />
              <div className="text-[10px] text-text-dim mt-1.5 flex items-center justify-between">
                <span>{noteSaved ? "Guardado" : "Guardando…"}</span>
                <span>{note.length} caracteres</span>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-text-dim px-1 leading-relaxed">
              Atajos: <kbd className="font-mono">Flechas</kbd> navegar ·{" "}
              <kbd className="font-mono">r</kbd> lectura
            </div>
          </aside>
        )}

        <article className="min-w-0">
          <Section id="section-objectives" title="Objetivos">
            <ul className="space-y-2">
              {c.objectives.map((o, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-text">
                  <span className="shrink-0 h-6 w-6 rounded-full bg-accent text-bg text-xs font-bold flex items-center justify-center tabular-nums">
                    {i + 1}
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="section-structure" title="Estructura">
            <ol className="space-y-1.5 border-l-2 border-accent/40 pl-4">
              {c.structure.map((s, i) => (
                <li key={i} className="text-text text-[15px] leading-relaxed">
                  {s}
                </li>
              ))}
            </ol>
          </Section>

          <Section id="section-content" title="Contenido">
            <ClassContent blocks={c.content} />
          </Section>

          <Section id="section-keyData" title="Datos clave">
            <KeyDataGrid data={c.keyData} />
          </Section>

          <Section id="section-recap" title="Recap">
            <RecapBox items={c.recap} />
          </Section>

          <Section id="section-resources" title="Recursos">
            <ResourceList items={c.resources} />
          </Section>

          <nav className="mt-16 pt-6 border-t border-border flex items-center justify-between gap-4">
            {prevNum != null ? (
              <Link
                href={`/clase/${prevNum}`}
                className="group flex flex-col items-start text-left rounded-lg p-3 hover:bg-surface transition-colors min-w-0 max-w-[45%]"
              >
                <span className="text-[11px] uppercase tracking-wider text-text-dim">
                  ← Anterior
                </span>
                <span className="text-accent font-semibold group-hover:text-accent transition-colors truncate">
                  Clase {prevNum}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextNum != null ? (
              <Link
                href={`/clase/${nextNum}`}
                className="group flex flex-col items-end text-right rounded-lg p-3 hover:bg-surface transition-colors min-w-0 max-w-[45%]"
              >
                <span className="text-[11px] uppercase tracking-wider text-text-dim">
                  Siguiente →
                </span>
                <span className="text-accent font-semibold group-hover:text-accent transition-colors truncate">
                  Clase {nextNum}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12 py-8 border-t border-border first:border-0">
      <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-3">
        <span className="h-5 w-1 bg-accent rounded-full" aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}
