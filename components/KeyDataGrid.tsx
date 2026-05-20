export default function KeyDataGrid({ data }: { data: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((d, i) => {
        const m = d.match(/^([^:]{2,80}):\s*(.+)$/);
        const label = m ? m[1].trim() : null;
        const value = m ? m[2].trim() : d;
        return (
          <div key={i} className="flex flex-col gap-1">
            {label && (
              <div className="text-[11px] uppercase tracking-[2.4px] text-accent font-semibold">
                {label}
              </div>
            )}
            <div className="text-accent font-bold text-2xl leading-tight">
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
