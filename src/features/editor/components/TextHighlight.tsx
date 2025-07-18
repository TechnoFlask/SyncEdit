import { Hover } from "@/components/custom/Hover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorPicker } from "@/features/editor/components/ColorPicker";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn, isLightColor } from "@/lib/utils";
import { IconHighlight } from "@tabler/icons-react";
import { useCallback } from "react";

export function TextHighlight() {
  const { editor } = useEditorContext();

  const currentColor = editor?.getAttributes("highlight").color ?? "#FFFFFF";

  const changeColor = useCallback(
    (color: string) => {
      editor?.chain().focus().setHighlight({ color }).run();
    },
    [editor],
  );

  return (
    <DropdownMenu>
      <Hover
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300 focus:outline-none">
              <IconHighlight
                className={cn({
                  "drop-shadow-xs drop-shadow-black":
                    isLightColor(currentColor),
                })}
                style={{
                  color: currentColor,
                }}
              />
            </button>
          </DropdownMenuTrigger>
        }
        content={"Highlight text"}
      />
      <DropdownMenuContent align="start">
        <ColorPicker color={currentColor} changeColor={changeColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
