export const LINE_HEIGHTS = [
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
] as const;

export const LH_NAME = {
  "1": "Single",
  "2": "Double",
  "3": "Triple",
} as const;

export function LineHeightItem({ lineHeight }: { lineHeight: string }) {
  return lineHeight in LH_NAME
    ? LH_NAME[lineHeight as keyof typeof LH_NAME]
    : lineHeight;
}
