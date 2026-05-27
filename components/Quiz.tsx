"use client";

/**
 * Quiz · componente reutilizable para mini-cuestionarios al final de cada clase.
 *
 * - Soporta preguntas V/F y multiple choice.
 * - Feedback inmediato por pregunta (correcto/incorrecto + explicación).
 * - Mini barra de progreso interna del quiz (h-[3px]).
 * - Al completar, llama onComplete(score, total) para que el padre marque
 *   la sección "quiz" como vista en el progreso global de la clase.
 *
 * Estilos: Tailwind con las variables del theme del proyecto (bg-surface,
 * border-border, bg-accent, etc.) — visualmente coherente con el resto del curso.
 */

import { useCallback, useEffect, useState } from "react";
import type { QuizQuestion } from "@/data/quiz-questions";
import { readQuizScore } from "@/lib/progress";

export interface QuizProps {
  classNum: number;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  onContinue?: () => void;
  continueLabel?: string;
}

export default function Quiz({
  classNum,
  questions,
  onComplete,
  onContinue,
  continueLabel = "Continuar a la siguiente clase →",
}: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [previousScore, setPreviousScore] = useState<{ score: number; total: number; pct: number } | null>(null);

  const total = questions.length;
  const done = current >= total;
  const score = answers.filter((a) => a.correct).length;
  const pct = done ? 100 : Math.round((current / total) * 100);

  // Si ya hay un score guardado previo, mostrar info
  useEffect(() => {
    const prev = readQuizScore(classNum);
    if (prev) setPreviousScore({ score: prev.score, total: prev.total, pct: prev.pct });
  }, [classNum]);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (showFeedback) return;
      const q = questions[current];
      const correctIdx = q.type === "tf" ? (q.answer ? 0 : 1) : q.answer;
      const isCorrect = idx === correctIdx;

      setSelected(idx);
      setShowFeedback(true);
      setAnswers((prev) => [...prev, { correct: isCorrect }]);

      window.setTimeout(
        () => {
          setSelected(null);
          setShowFeedback(false);
          const next = current + 1;
          setCurrent(next);
          if (next >= total) {
            const finalScore = isCorrect ? score + 1 : score;
            onComplete?.(finalScore, total);
          }
        },
        isCorrect ? 1100 : 2200,
      );
    },
    [current, questions, showFeedback, score, total, onComplete],
  );

  const retry = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowFeedback(false);
  };

  /* ----- Resultado final ----- */
  if (done) {
    const pctScore = Math.round((score / total) * 100);
    let msg: string;
    if (pctScore === 100)
      msg = "Excelente. Dominio total del tema. Listo para pasar a la siguiente clase.";
    else if (pctScore >= 80)
      msg = "Muy bien. Revisá las explicaciones de las que fallaste antes de seguir.";
    else if (pctScore >= 60)
      msg = "Vamos bien, pero conviene volver a leer las secciones clave antes de avanzar.";
    else
      msg =
        "Te sugiero releer la clase y volver a hacer el quiz. Sin esta base las próximas clases se complican.";

    return (
      <div className="rounded-md border border-border bg-surface p-8 md:p-10 text-center">
        <div className="text-5xl font-bold text-accent mb-1 tabular-nums">
          {score}/{total}
        </div>
        <div className="text-xs tracking-widest uppercase text-text-dim mb-5">
          Puntaje del quiz
        </div>
        <p className="text-base text-text max-w-md mx-auto mb-6 leading-relaxed">{msg}</p>
        <div className="flex gap-2 justify-center flex-wrap">
          <button onClick={retry} className="btn-primary">
            Reintentar
          </button>
          {onContinue && (
            <button
              onClick={onContinue}
              className="px-5 py-3 rounded-md border border-border text-text font-semibold text-sm hover:border-accent transition-colors"
            >
              {continueLabel}
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ----- Pregunta activa ----- */
  const q = questions[current];
  const isTF = q.type === "tf";
  const opts = isTF ? ["Verdadero", "Falso"] : q.options;
  const correctIdx = isTF ? (q.answer ? 0 : 1) : q.answer;

  return (
    <div>
      {previousScore && current === 0 && answers.length === 0 && (
        <div className="mb-4 px-3 py-2 rounded-sm border border-border bg-surface text-xs text-text-muted">
          Intento anterior:{" "}
          <span className="text-accent font-semibold">
            {previousScore.score}/{previousScore.total} · {previousScore.pct}%
          </span>
        </div>
      )}

      {/* Mini barra de progreso del quiz (compacta) */}
      <div
        className="w-full h-[3px] bg-border rounded-full overflow-hidden mb-2"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-text-dim mb-5">
        <span>
          Pregunta {current + 1} de {total}
        </span>
        <span>{pct}%</span>
      </div>

      <div className="rounded-md border border-border bg-surface p-5 md:p-6">
        <div className="text-[11px] tracking-widest uppercase text-text-dim mb-2">
          Pregunta {current + 1}
          <span className="ml-2 inline-block px-2 py-[2px] rounded-full bg-surface-2 text-[10px] tracking-wider">
            {isTF ? "V / F" : "Multiple choice"}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug mb-5">{q.question}</h3>

        <div className="grid gap-2">
          {opts.map((label, i) => {
            const letter = isTF ? (i === 0 ? "V" : "F") : String.fromCharCode(65 + i);

            let cls =
              "flex items-center gap-3 w-full text-left px-4 py-3 rounded-sm bg-surface-2 border border-border text-text transition-colors";
            let letterCls =
              "flex-none w-6 h-6 rounded-sm bg-border text-text-dim text-xs font-bold flex items-center justify-center";

            if (showFeedback) {
              if (i === correctIdx) {
                cls += " border-accent bg-accent-dim";
                letterCls = "flex-none w-6 h-6 rounded-sm bg-accent text-bg text-xs font-bold flex items-center justify-center";
              } else if (i === selected) {
                cls += " border-red-500/70 bg-red-500/10";
                letterCls =
                  "flex-none w-6 h-6 rounded-sm bg-red-500 text-bg text-xs font-bold flex items-center justify-center";
              }
            } else {
              cls += " hover:border-border-strong hover:bg-surface cursor-pointer";
            }

            return (
              <button
                key={i}
                disabled={showFeedback}
                onClick={() => handleAnswer(i)}
                className={cls}
              >
                <span className={letterCls}>{letter}</span>
                <span className="text-sm leading-snug">{label}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div
            className={`mt-4 px-4 py-3 rounded-sm border-l-2 bg-surface-2 text-sm leading-relaxed ${
              selected === correctIdx ? "border-l-accent" : "border-l-red-500"
            }`}
          >
            <strong
              className={`block mb-1 font-semibold ${
                selected === correctIdx ? "text-accent" : "text-red-400"
              }`}
            >
              {selected === correctIdx ? "Correcto" : "Incorrecto"}
            </strong>
            <span className="text-text-muted">{q.explanation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
