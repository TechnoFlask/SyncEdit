import { Hover } from "@/components/custom/Hover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useColorContext } from "@/features/editor/context/ColorContext";
import styles from "@/features/editor/styles/color-picker.module.css";
import { cn } from "@/lib/utils";
import { IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

function ColorItem({
  hex,
  changeColor,
}: {
  hex: string;
  changeColor: (color: string) => void;
}) {
  return (
    <div
      className="border-muted-foreground/20 h-6 w-6 cursor-pointer rounded-full border transition-transform hover:scale-110"
      onClick={() => changeColor(hex)}
      style={{ backgroundColor: hex }}
    />
  );
}

export function ColorPicker({
  color,
  changeColor,
}: {
  color: string;
  changeColor: (color: string) => void;
}) {
  const { defaultColors, savedColors, saveNewColor, removeSavedColor } =
    useColorContext();
  const [openDefaultColorsDropdown, setOpenDefaultColorsDropdown] =
    useState(false);
  return (
    <div
      className={cn(
        "flex max-h-[70dvh] w-sm flex-col gap-3 rounded-md p-8",
        styles["color-picker-parent"],
      )}
    >
      <div className="mb-10 h-[26dvh] space-y-3">
        <p className="text-xl">Color picker</p>
        <div className="relative size-full">
          <HexColorPicker
            onMouseUp={() => changeColor(color)}
            onTouchEnd={() => changeColor(color)}
            color={color}
            onChange={changeColor}
          />
          <div
            title={color}
            className="border-muted-foreground/20 absolute bottom-0 h-10 w-10 translate-y-2 rounded-full border"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-lg">Hex Code</p>
          <div className="border-muted-foreground flex items-center rounded-sm border px-3 py-1">
            <div className="flex">
              <p className="text-lg">#</p>
              <HexColorInput
                className="w-[6ch] text-lg focus:outline-none focus-visible:outline-none"
                color={color}
                onChange={changeColor}
              />
            </div>
          </div>
        </div>
        <Button
          onClick={() => saveNewColor(color)}
          className="text-xl"
          variant="secondary"
        >
          Save
        </Button>
      </div>
      <DropdownMenuSeparator />
      <div className="relative flex max-h-[10vh] w-full flex-col gap-2 overflow-y-scroll">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white pb-2">
          <p className="text-xl">Saved colors</p>
          <DropdownMenu onOpenChange={setOpenDefaultColorsDropdown}>
            <Hover
              trigger={
                <DropdownMenuTrigger asChild>
                  <Button className="h-full w-10" variant="secondary">
                    <IconChevronsRight
                      className={cn(
                        "scale-150 transition-transform duration-200",
                        {
                          "rotate-180": openDefaultColorsDropdown,
                        },
                      )}
                    />
                  </Button>
                </DropdownMenuTrigger>
              }
              content={"Default palette"}
            />
            <DropdownMenuContent side="right">
              <div className="flex w-xs flex-col gap-2 p-4">
                <div className="flex flex-wrap gap-2">
                  {defaultColors.map(({ hex, name }) => (
                    <HoverCard key={hex}>
                      <HoverCardTrigger>
                        <ColorItem hex={hex} changeColor={changeColor} />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-fit">
                        {name}: {hex}
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap gap-2">
          {savedColors
            .keys()
            .toArray()
            .map((hex) => (
              <HoverCard key={hex}>
                <HoverCardTrigger>
                  <ColorItem hex={hex} changeColor={changeColor} />
                </HoverCardTrigger>
                <HoverCardContent className="flex w-fit items-center gap-3">
                  <p>
                    {savedColors.get(hex)} : {hex}
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => removeSavedColor(hex)}
                  >
                    X
                  </Button>
                </HoverCardContent>
              </HoverCard>
            ))}
        </div>
      </div>
    </div>
  );
}
