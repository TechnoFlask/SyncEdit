import { Node, mergeAttributes } from "@tiptap/core";

export const Kbd = Node.create({
  name: "kbd",

  inline: true,
  group: "inline",
  content: "text*",
  selectable: false,
  atom: false,

  parseHTML() {
    return [
      {
        tag: "kbd",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["kbd", mergeAttributes(HTMLAttributes), 0];
  },
});
