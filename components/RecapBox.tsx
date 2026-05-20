export default function RecapBox({ items }: { items: string[] }) {
  return (
    <div className="card-cta">
      <div className="eyebrow mb-4">Recap · Takeaways</div>
      <ol className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 leading-relaxed text-text">
            <span className="shrink-0 h-6 w-6 rounded-full bg-accent text-bg text-xs font-bold flex items-center justify-center tabular-nums">
              {i + 1}
            </span>
            <span className="pt-0.5">{it}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
