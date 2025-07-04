import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn } from "@/lib/utils";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

const HEADINGS = Object.freeze([1, 2.25, 1.875, 1.5, 1.125]);

export function HeadingDropdown() {
  const [open, setOpen] = useState(false);
  const { editor } = useEditorContext();
  const currentHeading = editor?.getAttributes("heading");

  return (
    <DropdownMenu onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger asChild>
        <button className="flex w-40 cursor-pointer items-center justify-between gap-1 truncate rounded-sm p-1 px-3 text-xl hover:bg-gray-300 focus:outline-none">
          <p className="truncate">
            {currentHeading?.level
              ? `Heading ${currentHeading.level}`
              : "Normal text"}
          </p>
          {open ? <IconChevronUp /> : <IconChevronDown />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          {HEADINGS.map((headingSize, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                if (index === 0) editor?.commands.setParagraph();
                else
                  editor?.commands.toggleHeading({
                    level: index as 1 | 2 | 3 | 4,
                  });
                setTimeout(() => {
                  editor?.commands.focus();
                }, 200);
              }}
            >
              <IconCheck
                className={cn("!h-6 !w-6", {
                  "opacity-0": !(
                    editor?.isActive("heading", { level: index }) ||
                    (!editor?.isActive("heading") && index === 0)
                  ),
                })}
              />
              <p
                style={{
                  fontSize: index === 0 ? "1.0625rem" : `${headingSize}rem`,
                }}
                className="font-roboto self-start text-lg"
              >
                {index === 0 ? "Normal Text" : `Heading ${index}`}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
