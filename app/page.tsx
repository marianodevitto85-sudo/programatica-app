import ClassCard from "@/components/ClassCard";
import HomeProgress from "@/components/HomeProgress";
import { course } from "@/lib/data";

export default function HomePage() {
  const { meta, classes } = course;
  return (
    <div>
      <section className="bg-bg-elev">
        <div className="max-w-container mx-auto px-6 py-20">
          <div className="eyebrow mb-6">
            Programática + IA · Curso ejecutivo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl text-text">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-2xl text-text-muted text-base md:text-lg leading-relaxed">
            {meta.audience} · {meta.coverage}
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-accent">
                {meta.totalClasses}
              </div>
              <div className="text-xs text-text-muted mt-2 uppercase tracking-wider font-medium">
                clases
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">
                {meta.totalWords.toLocaleString("es-AR")}
              </div>
              <div className="text-xs text-text-muted mt-2 uppercase tracking-wider font-medium">
                palabras
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">
                {course.glossary.length}
              </div>
              <div className="text-xs text-text-muted mt-2 uppercase tracking-wider font-medium">
                términos
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">
                {course.bibliography.length}
              </div>
              <div className="text-xs text-text-muted mt-2 uppercase tracking-wider font-medium">
                fuentes
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="max-w-container mx-auto px-6 py-16">
          <HomeProgress totalClasses={meta.totalClasses} />
        </div>
      </section>

      <section className="bg-bg-elev">
        <div className="max-w-container mx-auto px-6 py-16">
          <div className="mb-12">
            <div className="eyebrow">Mapa del curso</div>
            <h2 className="text-3xl font-bold text-text mt-2">Las 8 clases</h2>
            <p className="hidden md:block text-sm text-text-muted max-w-md mt-4">
              Cada clase contiene: objetivos, estructura, contenido, datos clave,
              recap y recursos de ampliación.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((c) => (
              <ClassCard key={c.num} c={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
