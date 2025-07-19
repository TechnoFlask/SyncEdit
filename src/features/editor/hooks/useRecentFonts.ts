import { useState } from "react";

export function useRecentFonts(maxSize: number = 5) {
  const [recentFonts, setRecentFonts] = useState<Map<string, boolean>>(
    new Map(),
  );

  function addFont(fontName: string) {
    setRecentFonts((prev) => {
      const map = new Map(prev);
      map.delete(fontName);
      map.set(fontName, true);

      if (map.size > maxSize) {
        const mapArr = map.keys().toArray();
        map.delete(mapArr[0]);
      }

      return map;
    });
  }

  return { fonts: recentFonts.keys().toArray().reverse(), addFont };
}
