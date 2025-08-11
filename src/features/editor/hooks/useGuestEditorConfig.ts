import { Slash } from "@harshtalks/slash-tiptap";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Mathematics } from "@tiptap/extension-mathematics";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";
import { ImageResize } from "tiptap-extension-resize-image";
import { lowlight } from "../code-highlight";
import { FontSize } from "../extensions/FontSize";
import { Kbd } from "../extensions/Kbd";
import { LineHeight } from "../extensions/LineHeight";
import { suggestions } from "../extensions/slash/suggestions";
import {
  TableCellExtended,
  TableHeaderExtended,
} from "../extensions/TableExtended";
import { useBaseEditorConfig } from "./useBaseEditorConfig";

export function useGuestEditorConfig() {
  return useBaseEditorConfig({
    editorOptions: {
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3, 4],
          },
        }),
        TextStyle,
        FontFamily,
        FontSize,
        LineHeight,
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
        TableHeaderExtended,
        TableCellExtended,
        Image,
        ImageResize,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Slash.configure({
          suggestion: {
            items: () => suggestions,
          },
        }),
        Placeholder.configure({
          placeholder: "Press / to see commands",
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
        Mathematics,
        Kbd,
      ],
      content: "",
      editable: true,
    },
  });
}
