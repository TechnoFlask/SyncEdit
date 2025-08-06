import { createSuggestionsItems } from "@harshtalks/slash-tiptap";
import {
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconKeyboardFilled,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconMath,
  IconQuoteFilled,
  IconTable,
  IconTypography,
} from "@tabler/icons-react";

export const suggestions = createSuggestionsItems([
  {
    title: "Heading 1",
    icon: <IconH1 />,
    searchTerms: ["h1", "heading 1"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    icon: <IconH2 />,
    searchTerms: ["h2", "heading 2"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    icon: <IconH3 />,
    searchTerms: ["h3", "heading 3"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 3 })
        .run();
    },
  },
  {
    title: "Heading 4",
    icon: <IconH4 />,
    searchTerms: ["h1", "heading 1"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 4 })
        .run();
    },
  },
  {
    title: "Paragraph",
    icon: <IconTypography />,
    searchTerms: ["text"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: "Bulleted list",
    icon: <IconList />,
    searchTerms: ["list", "unordered", "point"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Ordered list",
    icon: <IconListNumbers />,
    searchTerms: ["list", "number", "ordered"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Task list",
    icon: <IconListCheck />,
    searchTerms: ["list", "check", "task"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Table",
    icon: <IconTable />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3 })
        .run();
    },
  },
  {
    title: "Quote",
    icon: <IconQuoteFilled />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Code",
    searchTerms: ["program"],
    icon: <IconCode />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        [
          (editor.isActive("code") ? "unsetCode" : "setCode") as
            | "setCode"
            | "unsetCode"
        ]()
        .run();
    },
  },
  {
    title: "Code Block",
    searchTerms: ["program"],
    icon: <IconCode />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setCodeBlock().run();

      const { state, view } = editor;
      const { tr, selection } = state;
      const docEnd = state.doc.content.size;

      const lastNode = state.doc.lastChild;

      if (lastNode?.type.name === "codeBlock") {
        const paragraph = state.schema.nodes.paragraph.create();

        const newTr = tr.insert(docEnd, paragraph);

        view.dispatch(newTr);

        editor.commands.focus();
        editor.commands.setTextSelection(selection.from);
      }
    },
  },
  {
    title: "Math",
    searchTerms: ["equation"],
    icon: <IconMath />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("$  $").run();
      editor.commands.setTextSelection(editor.state.selection.from - 2);
    },
  },
  {
    title: "Keymap",
    searchTerms: ["keyboard"],
    icon: <IconKeyboardFilled />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: "kbd",
          content: [{ type: "text", text: " " }],
        })
        .run();
      editor.commands.setTextSelection(editor.state.selection.from - 2);
    },
  },
]);
