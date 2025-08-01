"use client";

import { Hover } from "@/components/custom/Hover";
import { Separator } from "@/components/ui/separator";
import { FontFamilyDropdown } from "@/features/editor/components/FontFamilyDropdown";
import { FontSizeInput } from "@/features/editor/components/FontSizeInput";
import { HeadingDropdown } from "@/features/editor/components/HeadingDropdown";
import { ImageInput } from "@/features/editor/components/ImageInput";
import { LineHeightDropdown } from "@/features/editor/components/LineHeightDropdown";
import { LinkInput } from "@/features/editor/components/LinkInput";
import { TextAlign } from "@/features/editor/components/TextAlign";
import { TextColor } from "@/features/editor/components/TextColor";
import { TextHighlight } from "@/features/editor/components/TextHighlight";
import { useToolbarOptions } from "@/features/editor/hooks/useToolbarOptions";
import { cn } from "@/lib/utils";

export function Toolbar() {
  const menuBarButtons = useToolbarOptions();
  return (
    <div className="flex h-12 w-full items-center gap-2 overflow-x-scroll overflow-y-hidden rounded-3xl bg-gray-200 px-4 py-2 print:hidden">
      {menuBarButtons[0].map(({ label, action, icon, isActive }) => (
        <Hover
          key={label}
          trigger={
            <button
              key={label}
              onClick={() => action?.()}
              className={cn(
                "cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300",
                {
                  "bg-gray-300": isActive,
                },
              )}
            >
              {icon}
            </button>
          }
          content={label}
        />
      ))}
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      <HeadingDropdown />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      <FontFamilyDropdown />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      <FontSizeInput />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      {menuBarButtons[1].map(({ label, action, icon, isActive }) => (
        <Hover
          key={label}
          trigger={
            <button
              key={label}
              onClick={() => action?.()}
              className={cn(
                "cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300",
                {
                  "bg-gray-300": isActive,
                },
              )}
            >
              {icon}
            </button>
          }
          content={label}
        />
      ))}
      <TextColor />
      <TextHighlight />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      <LinkInput />
      <ImageInput />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      <TextAlign />
      <LineHeightDropdown />
      {menuBarButtons[2].map(({ label, action, icon, isActive }) => (
        <Hover
          key={label}
          trigger={
            <button
              onClick={() => action?.()}
              className={cn(
                "cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300",
                {
                  "bg-gray-300": isActive,
                },
              )}
            >
              {icon}
            </button>
          }
          content={label}
        />
      ))}
    </div>
  );
}
