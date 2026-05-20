import Link from "next/link";
import type { CourseClass } from "@/lib/types";
import { getClassDescription } from "@/lib/data";

export default function ClassCard({ c }: { c: CourseClass }) {
  return (
    <Link
      href={`/clase/${c.num}`}
      className="group card flex flex-col gap-4 overflow-hidden"
    >
      <div className="flex flex-col gap-2">
        <span className="text-accent text-[11px] uppercase tracking-[2.4px] font-semibold">
          {c.eyebrow}
        </span>
        <span className="text-5xl font-bold text-accent leading-none tabular-nums">
          {String(c.num).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-text leading-snug group-hover:text-accent transition-colors">
        {c.title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
        {getClassDescription(c, 150)}
      </p>
      <div className="flex items-center justify-between text-xs text-text-dim pt-2">
        <span>{c.duration}</span>
        <span className="text-accent font-semibold group-hover:translate-x-0.5 transition-transform">
          Abrir →
        </span>
      </div>
    </Link>
  );
}
