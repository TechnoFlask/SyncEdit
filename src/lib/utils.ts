import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLightColor(hex: string) {
  if (hex.length === 4) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 150;
}

const DEFINED_PROTOCOLS = Object.freeze(["http:", "https:", "blob:"]);

export function isValidLink(link: string) {
  try {
    const url = new URL(link);
    return DEFINED_PROTOCOLS.some((protocol) => url.protocol === protocol);
  } catch {
    return false;
  }
}
