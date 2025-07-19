import { Hover } from "@/components/custom/Hover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorPicker } from "@/features/editor/components/ColorPicker";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn, isLightColor } from "@/lib/utils";
import { IconPaletteFilled } from "@tabler/icons-react";
import { useCallback } from "react";

export function TextColor() {
  const { editor } = useEditorContext();

  const currentColor = editor?.getAttributes("textStyle").color ?? "#000000";

  const changeColor = useCallback(
    (color: string) => {
      editor?.chain().focus().setColor(color).run();
    },
    [editor],
  );

  return (
    <DropdownMenu>
      <Hover
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300 focus:outline-none">
              <IconPaletteFilled
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
        content={"Set text color"}
      />
      <DropdownMenuContent align="start">
        <ColorPicker color={currentColor} changeColor={changeColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
