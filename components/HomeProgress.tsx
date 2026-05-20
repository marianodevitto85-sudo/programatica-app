"use client";

import { useEffect, useState } from "react";
import { readAllProgress, classCompletionPct } from "@/lib/progress";

export default function HomeProgress({ totalClasses }: { totalClasses: number }) {
  const [pcts, setPcts] = useState<number[]>([]);

  useEffect(() => {
    const all = readAllProgress();
    const arr: number[] = [];
    for (let n = 1; n <= totalClasses; n++) {
      arr.push(classCompletionPct(all[n] ?? {}));
    }
    setPcts(arr);
  }, [totalClasses]);

  if (pcts.length === 0) return null;

  const avg = Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length);
  const startedCount = pcts.filter((p) => p > 0).length;
  const doneCount = pcts.filter((p) => p === 100).length;

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="eyebrow">Tu progreso</h3>
        <span className="text-xs text-text-dim">
          {doneCount}/{totalClasses} · {startedCount} iniciadas
        </span>
      </div>
      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${avg}%` }}
        />
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {pcts.map((p, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1"
            title={`Clase ${i + 1}: ${p}%`}
          >
            <div className="h-10 w-full bg-border rounded-xs relative overflow-hidden">
              <div
                className="absolute bottom-0 left-0 right-0 bg-accent"
                style={{ height: `${p}%` }}
              />
            </div>
            <span className="text-[10px] text-text-dim tabular-nums font-medium">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
