import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: "16",
            renderHTML: ({ fontSize }) => ({
              style: `font-size: ${fontSize}px`,
            }),
            // parseHTML: (el) => {
            //   console.log(el.style.fontSize);
            //   return el.style.fontSize || "16";
            // },
          },
        },
      },
    ];
  },
  addCommands: () => ({
    setFontSize:
      (fontSize: string) =>
      ({ commands }) =>
        commands.setMark("textStyle", { fontSize }),

    unsetFontSize:
      () =>
      ({ commands }) =>
        commands.setMark("textStyle", { fontSize: "16" }),
  }),
});
