import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorPicker } from "@/features/editor/components/ColorPicker";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn, isLightColor } from "@/lib/utils";
import { IconHighlight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function TextHighlight() {
  const { editor } = useEditorContext();

  const currentColor = editor?.getAttributes("highlight").color ?? "#FFFFFF";
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    setColor(currentColor);
  }, [currentColor]);

  function changeColor(color: string) {
    editor?.chain().focus().toggleHighlight({ color }).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer rounded-sm p-1 hover:bg-gray-300 focus:outline-none">
          <IconHighlight
            className={cn({
              "drop-shadow-xs drop-shadow-black": isLightColor(color),
            })}
            style={{
              color: currentColor,
            }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <ColorPicker
          color={color}
          setColor={setColor}
          changeColor={changeColor}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
