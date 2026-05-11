/**
 * Build a card-friendly pull from an editorial note.
 * - Takes the first sentence.
 * - If short (<120 chars) and a second sentence exists, includes it too.
 * - If long (>180 chars), truncates at the last whole word before 180,
 *   stripping any trailing comma / dash / semicolon, and appends an ellipsis.
 * - Never cuts mid-word.
 */
export function cardExcerpt(text: string, options?: { max?: number; min?: number }): string {
  const max = options?.max ?? 180;
  const min = options?.min ?? 120;

  const para = text.trim().split(/\n\n+/)[0] ?? "";
  const sentences = splitSentences(para);
  if (sentences.length === 0) return "";

  let pull = sentences[0];
  if (pull.length < min && sentences[1]) {
    const combined = `${pull} ${sentences[1]}`;
    if (combined.length <= max + 60) pull = combined;
  }

  if (pull.length > max) {
    let cut = pull.slice(0, max);
    const lastSpace = cut.lastIndexOf(" ");
    if (lastSpace > 0) cut = cut.slice(0, lastSpace);
    cut = cut.replace(/[,;:—–\-]+$/u, "").trimEnd();
    return cut + "…";
  }
  return pull;
}

function splitSentences(text: string): string[] {
  const matches = text.match(/[^.!?]+[.!?]+(?:["')\]]+)?(?:\s|$)/g);
  if (matches && matches.length > 0) return matches.map((s) => s.trim());
  return [text.trim()];
}
