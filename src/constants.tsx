import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
} from "@tabler/icons-react";

export const DEFINED_PROTOCOLS = Object.freeze([
  "http:",
  "https:",
  "blob:",
] as const);

export const LINE_HEIGHTS_REM = Object.freeze([
  "1",
  "1.125",
  "1.15",
  "1.25",
  "1.5",
  "1.75",
  "2",
  "2.25",
  "2.5",
  "3",
] as const);

export const LH_NAME = Object.freeze({
  "1": "Single",
  "2": "Double",
  "3": "Triple",
} as const);

export const FONT_SIZES_PX = Object.freeze([
  8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96,
] as const);

export const HEADINGS_REM = Object.freeze([
  1, 2.25, 1.875, 1.5, 1.125,
] as const);

export const ALIGNMENTS = Object.freeze([
  {
    name: "Left",
    value: "left",
    icon: <IconAlignLeft className="size-6 text-black" />,
  },
  {
    name: "Center",
    value: "center",
    icon: <IconAlignCenter className="size-6 text-black" />,
  },
  {
    name: "Right",
    value: "right",
    icon: <IconAlignRight className="size-6 text-black" />,
  },
  {
    name: "Justify",
    value: "justify",
    icon: <IconAlignJustified className="size-6 text-black" />,
  },
] as const);
