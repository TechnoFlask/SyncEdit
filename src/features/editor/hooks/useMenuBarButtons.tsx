import { useEditorContext } from "@/features/editor/context/EditorContext";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconClearFormatting,
  IconItalic,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconSearch,
  IconUnderline,
} from "@tabler/icons-react";

export function useMenuBarButtons() {
  const { editor } = useEditorContext();

  return [
    [
      {
        label: "Search",
        icon: <IconSearch />,
        action: () => {},
        isActive: false,
      },
      {
        label: "Undo",
        icon: <IconArrowBackUp />,
        action: () => editor?.chain().undo().run(),
        isActive: false,
      },
      {
        label: "Redo",
        icon: <IconArrowForwardUp />,
        action: () => editor?.chain().redo().run(),
        isActive: false,
      },
    ],
    [
      {
        label: "Bold",
        icon: <IconBold />,
        action: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: <IconItalic />,
        action: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: <IconUnderline />,
        action: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Bulleted List",
        icon: <IconList />,
        action: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
      },
      {
        label: "Numbered List",
        icon: <IconListNumbers />,
        action: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
      },
      {
        label: "Check List",
        icon: <IconListCheck />,
        action: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: <IconClearFormatting />,
        action: () => {
          editor?.chain().focus().unsetAllMarks().run();
          ["paragraph", "heading"].forEach((type) => {
            editor?.commands.updateAttributes(type, { lineHeight: "1.15" });
          });
        },
        isActive: false,
      },
    ],
  ];
}
