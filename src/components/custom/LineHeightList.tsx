import { LH_NAME } from "@/constants";

export function LineHeightItem({ lineHeight }: { lineHeight: string }) {
  return lineHeight in LH_NAME
    ? LH_NAME[lineHeight as keyof typeof LH_NAME]
    : lineHeight;
}
