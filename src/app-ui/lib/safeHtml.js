// Mejl adrese, URL-ovi i naziv sajta ne smeju da prodju kroz konverziju u cirilicu.
const PROTECTED = /(https?:\/\/[^\s<"']+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|crkveni-kalendar\.net)/gi;
const MARK = "\u0001";

export function cyrHtmlSafe(cyrHtml, html) {
  if (!html) return html;
  const saved = [];
  const masked = html.replace(PROTECTED, (match) => {
    saved.push(match);
    return `${MARK}${saved.length - 1}${MARK}`;
  });
  const converted = cyrHtml(masked);
  return converted.replace(
    new RegExp(`${MARK}(\\d+)${MARK}`, "g"),
    (_, index) => saved[Number(index)],
  );
}
