import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import {
  Archivo,
  Fira_Code,
  Inter,
  Lato,
  Lora,
  Merriweather,
  Open_Sans,
  PT_Serif,
  Roboto,
  Roboto_Mono,
  Roboto_Slab,
  Source_Sans_3,
  Work_Sans,
} from "next/font/google";

export type FontType = {
  name: string;
  variable: `--${string}`;
  fontFace: NextFontWithVariable;
};

// Installed fonts start
const installedFonts: readonly Omit<FontType, "fontFace">[] = Object.freeze([
  {
    name: "Arial",
    variable: "--font-arial",
  },
  { name: "Times New Roman", variable: "--font-times-new-roman" },
  { name: "Courier New", variable: "--font-courier-new" },
  { name: "Georgia", variable: "--font-georgia" },
  { name: "Helvetica", variable: "--font-helvetica" },
  { name: "Verdana", variable: "--font-verdana" },
] as const);
// Installed fonts end

// Sans-serif fonts start
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});
const sansSerifFonts: readonly FontType[] = Object.freeze([
  {
    name: "Roboto",
    variable: "--font-roboto",
    fontFace: roboto,
  },
  {
    name: "Inter",
    variable: "--font-inter",
    fontFace: inter,
  },
  {
    name: "Lato",
    variable: "--font-lato",
    fontFace: lato,
  },
  {
    name: "Open Sans",
    variable: "--font-open-sans",
    fontFace: openSans,
  },
  {
    name: "Work Sans",
    variable: "--font-work-sans",
    fontFace: workSans,
  },
  {
    name: "Source Sans 3",
    variable: "--font-source-sans",
    fontFace: sourceSans,
  },
  {
    name: "Archivo",
    variable: "--font-archivo",
    fontFace: archivo,
  },
] as const);
// Sans-serif fonts end

// Serif fonts start
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});
const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-serif",
});

const serifFonts: readonly FontType[] = Object.freeze([
  {
    name: "Merriweather",
    variable: "--font-merriweather",
    fontFace: merriweather,
  },
  {
    name: "Roboto Slab",
    variable: "--font-roboto-slab",
    fontFace: robotoSlab,
  },
  {
    name: "Lora",
    variable: "--font-lora",
    fontFace: lora,
  },
  {
    name: "PT Serif",
    variable: "--font-pt-serif",
    fontFace: ptSerif,
  },
] as const);
// Serif fonts end

// Monospace fonts start
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const monospaceFonts: readonly FontType[] = Object.freeze([
  {
    name: "Roboto Mono",
    variable: "--font-roboto-mono",
    fontFace: robotoMono,
  },
  {
    name: "Fira Code",
    variable: "--font-fira-code",
    fontFace: firaCode,
  },
] as const);
// Monospace fonts end

export const FONTS: readonly [
  readonly Omit<FontType, "fontFace">[],
  readonly FontType[],
] = Object.freeze([
  installedFonts,
  [...sansSerifFonts, ...serifFonts, ...monospaceFonts],
] as const);
