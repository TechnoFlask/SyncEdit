import { useEditorContext } from "@/features/editor/context/EditorContext";
import { FontSize } from "@/features/editor/extensions/FontSize";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { ImageResize } from "tiptap-extension-resize-image";

export function useEditorConfig() {
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
      attributes: {
        style: "padding-block: 2.5rem; padding-inline: 3rem;",
        class:
          "focus:outline-none bg-white border-2 border-gray-300 rounded-md print:rounded-none print:border-0 min-h-screen max-w-5xl cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextStyle,
      FontFamily,
      FontSize,
      Underline,
      Subscript,
      Superscript,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-blue-600 underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      // Emoji.configure({
      //   emojis: gitHubEmojis,
      //   enableEmoticons: true,
      // }),
    ],
    content: "",
    immediatelyRender: false,
  });

  return editor ?? createdEditor;
}
