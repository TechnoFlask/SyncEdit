"use client";

import { FONTS, type FontType } from "@/app/FontList";
import { Hover } from "@/components/custom/Hover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { useRecentFonts } from "@/features/editor/hooks/useRecentFonts";
import { cn } from "@/lib/utils";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

function FontDropdownItem({
  name,
  variable,
  addFont,
  currentFont,
}: {
  name: FontType["name"];
  variable: FontType["variable"];
  addFont: (name: string) => void;
  currentFont: FontType | Omit<FontType, "fontFace"> | undefined;
}) {
  const { editor } = useEditorContext();
  return (
    <DropdownMenuItem
      className="transition-colors duration-200"
      style={{ fontFamily: `var(${variable})` }}
      onClick={() => {
        editor?.commands.setFontFamily(`var(${variable})`);
        setTimeout(() => {
          editor?.commands.focus();
        }, 200);
        addFont(name);
      }}
    >
      <span className="flex items-center gap-3 pr-9">
        <IconCheck
          className={cn("!h-6 !w-6", {
            "opacity-0": !(
              (currentFont == undefined && name === "Arial") ||
              currentFont?.name === name
            ),
          })}
        />
        <p className="self-start text-lg">{name}</p>
      </span>
    </DropdownMenuItem>
  );
}

export function FontFamilyDropdown() {
  const { editor } = useEditorContext();
  const currentFontCss =
    editor?.getAttributes("textStyle").fontFamily ?? "Arial";
  const currentFont = FONTS.flat().find(
    ({ variable }) => `var(${variable})` === currentFontCss,
  );

  const [open, setOpen] = useState(false);
  const { fonts, addFont } = useRecentFonts();

  return (
    <DropdownMenu onOpenChange={(open) => setOpen(open)}>
      <Hover
        trigger={
          <DropdownMenuTrigger asChild>
            <button
              className="flex w-36 cursor-pointer items-center justify-between gap-1 truncate rounded-sm p-1 px-3 text-xl transition-colors duration-200 hover:bg-gray-300 focus:outline-none"
              style={{
                fontFamily: `var(${currentFont?.variable ?? "--font-arial"})`,
              }}
            >
              <p className="truncate">{currentFont?.name ?? "Arial"}</p>
              <IconChevronDown
                className={cn("transition-transform duration-200", {
                  "rotate-180": open,
                })}
              />
            </button>
          </DropdownMenuTrigger>
        }
        content={"Set font family"}
      />
      <DropdownMenuContent
        align="start"
        className="flex max-h-[83dvh] flex-col overflow-y-hidden"
      >
        <DropdownMenuLabel className="font-sans text-lg font-medium text-gray-700">
          Recently used
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {fonts.map((font) => {
            const foundFont = FONTS.flat().find((f) => f.name === font);

            return (
              <FontDropdownItem
                key={font}
                name={font}
                variable={foundFont?.variable ?? "--font-arial"}
                addFont={addFont}
                currentFont={currentFont}
              />
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex-1 overflow-y-auto">
          {FONTS.flat().map(({ name, variable }) => (
            <FontDropdownItem
              key={name}
              name={name}
              variable={variable}
              addFont={addFont}
              currentFont={currentFont}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
