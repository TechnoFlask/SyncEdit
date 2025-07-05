"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const INITIAL_COLORS: { name: string; hex: string }[] = [
  // Grays
  { name: "Black", hex: "#000000" },
  { name: "Dark Gray", hex: "#555555" },
  { name: "Gray", hex: "#808080" },
  { name: "Light Gray", hex: "#cccccc" },
  { name: "White", hex: "#ffffff" },

  // Reds
  { name: "Dark Red", hex: "#8b0000" },
  { name: "Red", hex: "#ff0000" },
  { name: "Salmon", hex: "#fa8072" },
  { name: "Light Coral", hex: "#f08080" },

  // Oranges
  { name: "Dark Orange", hex: "#ff8c00" },
  { name: "Orange", hex: "#ffa500" },
  { name: "Light Orange", hex: "#ffb347" },

  // Yellows
  { name: "Gold", hex: "#ffd700" },
  { name: "Yellow", hex: "#ffff00" },
  { name: "Light Yellow", hex: "#ffffe0" },

  // Greens
  { name: "Dark Green", hex: "#006400" },
  { name: "Green", hex: "#008000" },
  { name: "Light Green", hex: "#90ee90" },
  { name: "Mint", hex: "#98ff98" },

  // Blues
  { name: "Navy", hex: "#000080" },
  { name: "Blue", hex: "#0000ff" },
  { name: "Sky Blue", hex: "#87ceeb" },
  { name: "Light Blue", hex: "#add8e6" },

  // Purples
  { name: "Dark Purple", hex: "#4b0082" },
  { name: "Purple", hex: "#800080" },
  { name: "Lavender", hex: "#e6e6fa" },

  // Pinks
  { name: "Hot Pink", hex: "#ff69b4" },
  { name: "Pink", hex: "#ffc0cb" },
  { name: "Light Pink", hex: "#ffb6c1" },

  // Browns
  { name: "Saddle Brown", hex: "#8b4513" },
  { name: "Brown", hex: "#a52a2a" },
  { name: "Tan", hex: "#d2b48c" },

  // Teals
  { name: "Teal", hex: "#008080" },
  { name: "Turquoise", hex: "#40e0d0" },
  { name: "Pale Turquoise", hex: "#afeeee" },
];

type ColorContextType = {
  defaultColors: { name: string; hex: string }[];
  savedColors: Map<string, string>;
  saveNewColor: (color: string) => void;
  removeSavedColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export default function ColorContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [savedColors, setSavedColors] = useState<Map<string, string>>(
    () => new Map(new Map()),
  );

  function saveNewColor(color: string) {
    setSavedColors((prev) => {
      if (prev.has(color) || INITIAL_COLORS.some(({ hex }) => hex === color))
        return prev;
      const map = new Map(prev);
      map.set(color, `Custom ${map.size + 1}`);
      return map;
    });
  }

  function removeSavedColor(color: string) {
    setSavedColors((prev) => {
      prev.delete(color);
      return new Map(
        prev.keys().map((hex, index) => [hex, `Custom ${index + 1}`]),
      );
    });
  }

  return (
    <ColorContext.Provider
      value={{
        defaultColors: INITIAL_COLORS,
        savedColors,
        saveNewColor,
        removeSavedColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}

export function useColorContext() {
  const colorContext = useContext(ColorContext);
  if (colorContext == undefined)
    throw new Error(
      "useColorContext must be used within an EditorContextProvider",
    );
  return colorContext;
}
