import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight = Extension.create({
  name: "lineHeight",
  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          lineHeight: {
            default: "1.15",
            renderHTML: ({ lineHeight }) => ({
              style: `line-height: ${lineHeight}`,
            }),
            parseHTML: (el) => el.style.lineHeight || "1.15",
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ commands, state }) => {
          const { $from } = state.selection;
          const nodeType = $from.parent.type.name;
          return commands.updateAttributes(nodeType, { lineHeight });
        },
      unsetLineHeight:
        () =>
        ({ state, commands }) => {
          const { $from } = state.selection;
          const nodeType = $from.parent.type.name;
          return commands.updateAttributes(nodeType, { lineHeight: "1.15" });
        },
    };
  },
});
