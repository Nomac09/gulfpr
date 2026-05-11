import { Fragment } from "react";

/**
 * Renders plain-text editorialNote as paragraphs.
 * Italicizes publication names wrapped in _underscores_.
 */
export function EditorialProse({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className="prose-editorial font-display">
      {paragraphs.map((p, i) => (
        <p key={i}>{renderItalics(p)}</p>
      ))}
    </div>
  );
}

function renderItalics(text: string) {
  const parts = text.split(/(_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
