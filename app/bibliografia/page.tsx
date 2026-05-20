import { course } from "@/lib/data";
import BibliographyClient from "@/components/BibliographyClient";

export const metadata = {
  title: "Bibliografía — Programática + IA",
};

export default function BibliographyPage() {
  return (
    <div className="max-w-container mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="eyebrow mb-3">
          Fuentes · {course.bibliography.length} referencias
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text">
          Bibliografía
        </h1>
        <p className="text-text-muted mt-4 max-w-2xl">
          IAB Europe, eMarketer, WPP Media, AdExchanger, Digiday, PPC Land y
          otras fuentes referenciadas en el curso.
        </p>
      </div>
      <BibliographyClient items={course.bibliography} />
    </div>
  );
}
