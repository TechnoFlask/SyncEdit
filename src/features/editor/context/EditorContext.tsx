"use client";

import { LINE_HEIGHTS } from "@/components/custom/LineHeightList";
import { type Editor } from "@tiptap/react";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type NoArgOptions =
  | "search"
  | "undo"
  | "redo"
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "superscript"
  | "subscript"
  | "bulletedList"
  | "numberedList"
  | "checkList"
  | "removeFormatting";

type EditorOptionArgMap = {
  [K in NoArgOptions]: [];
} & {
  alignment: ["left" | "center" | "right" | "justify"];
  heading: [0 | 1 | 2 | 3 | 4];
  lineHeight: [(typeof LINE_HEIGHTS)[number]];
};

type EditorOptionsType = keyof EditorOptionArgMap;

type EditorOptionsActionsType = {
  [K in EditorOptionsType]:
    | ((...args: EditorOptionArgMap[K]) => void)
    | undefined;
};

type EditorOptionsActiveType = {
  [K in Exclude<
    EditorOptionsType,
    "search" | "undo" | "redo" | "removeFormatting"
  >]: (...args: EditorOptionArgMap[K]) => boolean;
};

type EditorContextType = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  editorOptionsActions: EditorOptionsActionsType;
  editorOptionsActive: EditorOptionsActiveType;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export default function EditorContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [editor, setEditor] = useState<Editor | null>(null);

  const editorOptionsActions: EditorOptionsActionsType = useMemo(
    () => ({
      search: () => {},
      undo: () => editor?.chain().undo().run(),
      redo: () => editor?.chain().redo().run(),
      bold: () => editor?.chain().toggleBold().run(),
      italic: () => editor?.chain().toggleItalic().run(),
      underline: () => editor?.chain().toggleUnderline().run(),
      strikethrough: () => editor?.chain().toggleStrike().run(),
      superscript: () => editor?.chain().toggleSuperscript().run(),
      subscript: () => editor?.chain().toggleSubscript().run(),
      bulletedList: () => editor?.chain().toggleBulletList().run(),
      numberedList: () => editor?.chain().toggleOrderedList().run(),
      checkList: () => editor?.chain().toggleTaskList().run(),
      removeFormatting: () => {
        editor?.chain().focus().clearNodes().run();
        ["paragraph", "heading"].forEach((type) => {
          editor?.commands.updateAttributes(type, { lineHeight: "1.15" });
        });
      },
      alignment: (alignment) =>
        editor?.chain().toggleTextAlign(alignment).run(),
      heading: (level: 0 | 1 | 2 | 3 | 4) =>
        level === 0
          ? editor?.chain().setParagraph().run()
          : editor?.chain().toggleHeading({ level }).run(),
      lineHeight: (l) => editor?.chain().setLineHeight(l).run(),
    }),
    [editor],
  );

  const editorOptionsActive: EditorOptionsActiveType = useMemo(
    () => ({
      bold: () => editor?.isActive("bold") ?? false,
      italic: () => editor?.isActive("italic") ?? false,
      underline: () => editor?.isActive("underline") ?? false,
      strikethrough: () => editor?.isActive("strike") ?? false,
      superscript: () => editor?.isActive("superscript") ?? false,
      subscript: () => editor?.isActive("subscript") ?? false,
      bulletedList: () => editor?.isActive("bulletList") ?? false,
      numberedList: () => editor?.isActive("orderedList") ?? false,
      checkList: () => editor?.isActive("taskList") ?? false,
      alignment: (alignment) =>
        editor?.isActive({ textAlign: alignment }) ?? false,
      heading: (level: 0 | 1 | 2 | 3 | 4) =>
        (level === 0
          ? ![1, 2, 3, 4].some((l) => editor?.isActive("heading", { level: l }))
          : editor?.isActive("heading", { level })) ?? false,
      lineHeight: (l) =>
        l ===
        (editor?.getAttributes("heading").lineHeight ??
          editor?.getAttributes("paragraph").lineHeight ??
          "1.15"),
    }),
    [editor],
  );

  return (
    <EditorContext.Provider
      value={{ editor, setEditor, editorOptionsActions, editorOptionsActive }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const editorContext = useContext(EditorContext);
  if (editorContext == undefined)
    throw new Error(
      "useEditorContext must be used within an EditorContextProvider",
    );
  return editorContext;
}
