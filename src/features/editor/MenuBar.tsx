"use client";

import { Separator } from "@/components/ui/separator";
import { FontFamilyDropdown } from "@/features/editor/components/FontFamilyDropdown";
import { HeadingDropdown } from "@/features/editor/components/HeadingDropdown";
import { useMenuBarButtons } from "@/features/editor/hooks/useMenuBarButtons";
import { cn } from "@/lib/utils";

export function MenuBar() {
  const menuBarButtons = useMenuBarButtons();
  return (
    <div className="flex w-full items-center gap-2 rounded-3xl bg-gray-200 px-4 py-2 print:hidden">
      {menuBarButtons[0].map(({ label, action, icon, isActive }) => (
        <button
          key={label}
          onClick={action}
          className={cn("cursor-pointer rounded-sm p-1 hover:bg-gray-300", {
            "bg-gray-300": isActive,
          })}
        >
          {icon}
        </button>
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
      {/*<Separator*/}
      {/*  orientation="vertical"*/}
      {/*  className="bg-muted-foreground/30 !h-3/4 !w-[2px]"*/}
      {/*/>*/}
      {/*TODO: Font size*/}
      {/*<Separator*/}
      {/*  orientation="vertical"*/}
      {/*  className="bg-muted-foreground/30 !h-3/4 !w-[2px]"*/}
      {/*/>*/}
      {menuBarButtons[1].map(({ label, action, icon, isActive }) => (
        <button
          key={label}
          onClick={action}
          className={cn("cursor-pointer rounded-sm p-1 hover:bg-gray-300", {
            "bg-gray-300": isActive,
          })}
        >
          {icon}
        </button>
      ))}
      {/*TODO: Color*/}
      {/*TODO: Hightlight*/}
      {/* TODO: Text alignment */}
      {/*<Separator*/}
      {/*  orientation="vertical"*/}
      {/*  className="bg-muted-foreground/30 !h-3/4 !w-[2px]"*/}
      {/*/>*/}
      {menuBarButtons[2].map(({ label, action, icon, isActive }) => (
        <button
          key={label}
          onClick={action}
          className={cn("cursor-pointer rounded-sm p-1 hover:bg-gray-300", {
            "bg-gray-300": isActive,
          })}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
