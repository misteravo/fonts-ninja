import { sanitizeSVG } from "../utils/sanitize";

export function SvgRenderer({ svg }: { svg: string }) {
  return <div dangerouslySetInnerHTML={{ __html: sanitizeSVG(svg) }} />;
}
