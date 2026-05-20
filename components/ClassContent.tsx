import type { ContentBlock } from "@/lib/types";
import { slugify } from "@/lib/data";

export default function ClassContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-class">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={`h-${slugify(b.text)}`}>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "p":
            return <p key={i}>{b.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
