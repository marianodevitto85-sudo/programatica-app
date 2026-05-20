import { course } from "@/lib/data";
import GlossaryClient from "@/components/GlossaryClient";

export const metadata = {
  title: "Glosario — Programática + IA",
};

export default function GlossaryPage() {
  return (
    <div className="max-w-container mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="eyebrow mb-3">
          Diccionario · {course.glossary.length} términos
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text">
          Glosario
        </h1>
        <p className="text-text-muted mt-4 max-w-2xl">
          Los términos esenciales del ecosistema programático moderno: DSPs,
          SSPs, identity, retail media, formatos emergentes y normativa europea.
        </p>
      </div>
      <GlossaryClient entries={course.glossary} />
    </div>
  );
}
