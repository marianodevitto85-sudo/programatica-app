import ClassCard from "@/components/ClassCard";
import HomeProgress from "@/components/HomeProgress";
import { course } from "@/lib/data";

export default function HomePage() {
  const { meta, classes } = course;
  return (
    <div>
      {/* Hero: content overlaid on image */}
      <section className="relative overflow-hidden flex items-end" style={{ minHeight: '520px' }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/programatica-hero.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 55%' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.18) 100%)',
            zIndex: 1,
          }}
        />
        {/* Content */}
        <div className="relative max-w-container mx-auto px-6 w-full" style={{ zIndex: 2, paddingTop: '160px', paddingBottom: '64px' }}>
          <div className="eyebrow mb-6">
            Programática + IA · Curso ejecutivo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl text-white">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {meta.audience} · {meta.coverage}
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-accent">{meta.totalClasses}</div>
              <div className="text-xs mt-2 uppercase tracking-wider font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>clases</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">{meta.totalWords.toLocaleString("es-AR")}</div>
              <div className="text-xs mt-2 uppercase tracking-wider font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>palabras</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">{course.glossary.length}</div>
              <div className="text-xs mt-2 uppercase tracking-wider font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>términos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">{course.bibliography.length}</div>
              <div className="text-xs mt-2 uppercase tracking-wider font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>fuentes</div>
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
