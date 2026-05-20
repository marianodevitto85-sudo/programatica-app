import type { Resource } from "@/lib/types";

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ResourceList({ items }: { items: Resource[] }) {
  return (
    <div className="card">
      <div className="eyebrow mb-4">Recursos para profundizar</div>
      <ul className="divide-y divide-border">
        {items.map((r, i) => (
          <li key={i} className="py-3 first:pt-0 last:pb-0">
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-baseline justify-between gap-3 hover:text-accent transition-colors"
            >
              <span className="text-text group-hover:text-accent font-medium leading-snug">
                {r.label}
              </span>
              <span className="text-[11px] text-text-dim shrink-0">
                {domainOf(r.url)} ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
