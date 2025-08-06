import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import scss from "highlight.js/lib/languages/scss";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);
lowlight.register({
  c,
  cpp,
  java,
  python,
  javascript,
  typescript,
  xml,
  css,
  scss,
});

export { lowlight };
