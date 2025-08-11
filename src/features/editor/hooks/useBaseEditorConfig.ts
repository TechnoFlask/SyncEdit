import { useEditorContext } from "@/features/editor/context/EditorContext";
import "katex/dist/katex.min.css";

import { enableKeyboardNavigation } from "@harshtalks/slash-tiptap";
import { useEditor, UseEditorOptions } from "@tiptap/react";

export function useBaseEditorConfig({
  editorOptions: { extensions, content, editable },
}: {
  editorOptions: {
    extensions: UseEditorOptions["extensions"];
    content: UseEditorOptions["content"];
    editable: UseEditorOptions["editable"];
  };
}) {
  const { editor, setEditor } = useEditorContext();

  const createdEditor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      if (editor.isActive("link")) {
        editor.commands.extendMarkRange("link");
      }
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },

    editorProps: {
      handleDOMEvents: {
        keydown: (_, v) => enableKeyboardNavigation(v),
      },
      attributes: {
        style: "padding-block: 2.5rem; padding-inline: 3rem;",
        class:
          "focus:outline-none bg-white border-2 border-gray-300 rounded-md print:rounded-none print:border-0 min-h-screen max-w-5xl cursor-text",
      },
    },
    shouldRerenderOnTransaction: true,
    extensions,
    content,
    immediatelyRender: false,
    editable,
  });

  return editor ?? createdEditor;
}
