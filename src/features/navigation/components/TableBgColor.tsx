import {
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import { ColorPicker } from "@/features/editor/components/ColorPicker";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { IconPaint } from "@tabler/icons-react";
import { useCallback } from "react";

export function TableBgColor() {
  const { editor, editorOptionsActions } = useEditorContext();
  const currentCellColor =
    editor?.getAttributes("tableCell").backgroundColor ??
    editor?.getAttributes("tableHeader").backgroundColor ??
    "#FFFFFF";

  // const [color, setColor] = useState("#FFFFFF");

  // useEffect(() => {
  //   setColor(currentCellColor);
  // }, [currentCellColor]);

  const changeColor = useCallback(
    (color: string) => {
      editorOptionsActions.tableCellBackground?.(color);
    },
    [editorOptionsActions],
  );

  return (
    <MenubarSub>
      <MenubarSubTrigger className="space-x-2">
        <IconPaint className="size-6 text-black" />
        Background color
      </MenubarSubTrigger>
      <MenubarSubContent>
        <ColorPicker color={currentCellColor} changeColor={changeColor} />
      </MenubarSubContent>
    </MenubarSub>
  );
}
