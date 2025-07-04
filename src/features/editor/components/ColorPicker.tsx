import styles from "@/features/editor/styles/color-picker.module.css";
import { cn } from "@/lib/utils";
import { HexColorInput, HexColorPicker } from "react-colorful";

export function ColorPicker({
  color,
  setColor,
  changeColor,
}: {
  color: string;
  setColor: (color: string) => void;
  changeColor: (color: string) => void;
}) {
  return (
    <div
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
    </div>
  );
}
