import DOMPurify from "isomorphic-dompurify";

export function sanitizeSVG(svgContent: string) {
  return DOMPurify.sanitize(svgContent);
}
