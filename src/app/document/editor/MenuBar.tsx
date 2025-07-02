"use client";

import { useMenuBarButtons } from "@/app/document/editor/MenuBarButtons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function MenuBar() {
  const menuBarButtons = useMenuBarButtons();
  return (
    <div className="flex">
      {menuBarButtons[0].map(({ label, action, icon, isActive }) => (
        <button key={label} onClick={action}>
          {icon}
        </button>
      ))}
      <Separator orientation="vertical" decorative className="bg-black" />
      {menuBarButtons[1].map(({ label, action, icon, isActive }) => (
        <button
          key={label}
          onClick={action}
          className={cn("", {
            "bg-red-500": isActive,
          })}
        >
          {icon}
        </button>
      ))}
      <Separator orientation="vertical" decorative className="bg-black" />
      {menuBarButtons[2].map(({ label, action, icon, isActive }) => (
        <button
          key={label}
          onClick={action}
          className={cn("", {
            "bg-red-500": isActive,
          })}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
