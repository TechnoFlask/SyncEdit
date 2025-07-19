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
  IconUnderline,
} from "@tabler/icons-react";

export function useToolbarOptions() {
  const { editorOptionsActions, editorOptionsActive } = useEditorContext();

  return [
    [
      // {
      //   label: "Search",
      //   icon: <IconSearch />,
      //   action: () => {},
      //   isActive: false,
      // },
      {
        label: "Undo",
        icon: <IconArrowBackUp />,
        action: editorOptionsActions.bold,
        isActive: false,
      },
      {
        label: "Redo",
        icon: <IconArrowForwardUp />,
        action: editorOptionsActions.redo,
        isActive: false,
      },
    ],
    [
      {
        label: "Bold",
        icon: <IconBold />,
        action: editorOptionsActions.bold,
        isActive: editorOptionsActive.bold(),
      },
      {
        label: "Italic",
        icon: <IconItalic />,
        action: editorOptionsActions.italic,
        isActive: editorOptionsActive.italic(),
      },
      {
        label: "Underline",
        icon: <IconUnderline />,
        action: editorOptionsActions.underline,
        isActive: editorOptionsActive.underline(),
      },
    ],
    [
      {
        label: "Bulleted List",
        icon: <IconList />,
        action: editorOptionsActions.bulletedList,
        isActive: editorOptionsActive.bulletedList(),
      },
      {
        label: "Numbered List",
        icon: <IconListNumbers />,
        action: editorOptionsActions.numberedList,
        isActive: editorOptionsActive.numberedList(),
      },
      {
        label: "Check List",
        icon: <IconListCheck />,
        action: editorOptionsActions.checkList,
        isActive: editorOptionsActive.checkList(),
      },
      {
        label: "Remove Formatting",
        icon: <IconClearFormatting />,
        action: editorOptionsActions.removeFormatting,
        isActive: false,
      },
    ],
  ];
}
