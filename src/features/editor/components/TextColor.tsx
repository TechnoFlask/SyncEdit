import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import styles from "@/features/editor/styles/color-picker.module.css";
import { cn } from "@/lib/utils";
import { IconPaletteFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

function isLightColor(hex: string) {
  if (hex.length === 4) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 150;
}

export function TextColor() {
  const { editor } = useEditorContext();

  const currentColor = editor?.getAttributes("textStyle").color ?? "#000000";
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    setColor(currentColor);
  }, [currentColor]);

  function changeColor(color: string) {
    editor?.chain().focus().setColor(color).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer rounded-sm p-1 hover:bg-gray-300 focus:outline-none">
          <IconPaletteFilled
            className={cn({
              "drop-shadow-xs drop-shadow-black": isLightColor(color),
            })}
            style={{
              color: currentColor,
            }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={cn(
          "flex h-96 w-sm flex-col gap-6 rounded-md p-8",
          styles["color-picker-parent"],
        )}
      >
        <div className="relative grow">
          <HexColorPicker
            onMouseUp={() => changeColor(color)}
            onTouchEnd={() => changeColor(color)}
            color={color}
            onChange={setColor}
          />
          <div
            className="absolute bottom-0 h-10 w-10 translate-y-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg">Hex Code</p>
          <div className="border-muted-foreground flex items-center rounded-sm border px-3 py-1">
            <p className="text-lg">#</p>
            <HexColorInput
              className="w-[6ch] text-lg focus:outline-none focus-visible:outline-none"
              color={color}
              onChange={changeColor}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
