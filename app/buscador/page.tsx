import SearchClient from "@/components/SearchClient";

export const metadata = {
  title: "Buscar — Programática + IA",
};

export default function SearchPage() {
  return (
    <div className="max-w-container mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="eyebrow mb-3">
          Buscador global
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text">
          Buscar
        </h1>
        <p className="text-text-muted mt-4 max-w-2xl">
          Busca en títulos de clases, contenido extendido, datos clave, glosario
          y bibliografía. Tip: presioná <kbd className="font-mono bg-border px-1.5 py-0.5 rounded text-xs text-text-dim">/</kbd> para enfocar el búsqueda.
        </p>
      </div>
      <SearchClient />
    </div>
  );
}
