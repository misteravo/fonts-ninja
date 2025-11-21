import parse, { HTMLReactParserOptions } from "html-react-parser";
import { sanitizeSVG } from "../utils/sanitize";

export function SvgRenderer(props: {
  svg: string;
  parseOptions?: HTMLReactParserOptions;
}) {
  return parse(sanitizeSVG(props.svg), props.parseOptions);
}
