"use client";

import { Hover } from "@/components/custom/Hover";
import { Separator } from "@/components/ui/separator";
import { FontFamilyDropdown } from "@/features/editor/components/FontFamilyDropdown";
import { HeadingDropdown } from "@/features/editor/components/HeadingDropdown";
import { ImageInput } from "@/features/editor/components/ImageInput";
import { LinkInput } from "@/features/editor/components/LinkInput";
import { TextColor } from "@/features/editor/components/TextColor";
import { TextHighlight } from "@/features/editor/components/TextHighlight";
import ColorContextProvider from "@/features/editor/context/ColorContext";
import { useMenuBarButtons } from "@/features/editor/hooks/useMenuBarButtons";
import { cn } from "@/lib/utils";

export function MenuBar() {
  const menuBarButtons = useMenuBarButtons();
  return (
    <div className="flex w-full items-center gap-2 rounded-3xl bg-gray-200 px-4 py-2 print:hidden">
      {menuBarButtons[0].map(({ label, action, icon, isActive }) => (
        <Hover
          key={label}
          trigger={
            <button
              key={label}
              onClick={action}
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
      <Hover trigger={<HeadingDropdown />} content={"Heading"} />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      <Hover trigger={<FontFamilyDropdown />} content={"Font family"} />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      {/*TODO: Font size*/}
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
              onClick={action}
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
      <ColorContextProvider>
        <Hover trigger={<TextColor />} content={"Text color"} />
        <Hover trigger={<TextHighlight />} content={"Text highlighting"} />
      </ColorContextProvider>
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      <Hover trigger={<LinkInput />} content={"Link"} />
      <ImageInput />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 !h-3/4 !w-[2px]"
      />
      {/* TODO: Text alignment */}
      {menuBarButtons[2].map(({ label, action, icon, isActive }) => (
        <Hover
          key={label}
          trigger={
            <button
              onClick={action}
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
