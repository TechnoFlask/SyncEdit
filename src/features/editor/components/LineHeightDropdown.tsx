import { Hover } from "@/components/custom/Hover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn } from "@/lib/utils";
import {
  IconCheck,
  IconChevronDown,
  IconLineHeight,
} from "@tabler/icons-react";
import { useState } from "react";

const LINE_HEIGHTS = Object.freeze([
  "1",
  "1.15",
  "1.125",
  "1.25",
  "1.5",
  "1.75",
  "2",
  "2.25",
  "2.5",
  "3",
]);

export function LineHeightDropdown() {
  const { editor } = useEditorContext();
  const [open, setOpen] = useState(false);

  const currentLineHeight =
    editor?.getAttributes("heading").lineHeight ??
    editor?.getAttributes("paragraph").lineHeight ??
    "1.15";

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <Hover
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="flex cursor-pointer items-center gap-1.5 rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300 focus:outline-none">
              <IconLineHeight />
              <IconChevronDown
                className={cn("size-5 transition-transform duration-200", {
                  "rotate-180": open,
                })}
              />
            </button>
          </DropdownMenuTrigger>
        }
        content={"Set line height"}
      />
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className="transition-colors duration-200"
          onClick={() => {
            editor?.commands.setLineHeight("normal");
          }}
        >
          <IconCheck
            className={cn("!h-6 !w-6", {
              "opacity-0": currentLineHeight != "normal",
            })}
          />
          <p className="font-roboto self-start text-lg">Normal</p>
        </DropdownMenuItem>
        {LINE_HEIGHTS.map((l) => (
          <DropdownMenuItem
            className="transition-colors duration-200"
            key={l}
            onClick={() => {
              editor?.commands.setLineHeight(l);
            }}
          >
            <IconCheck
              className={cn("!h-6 !w-6", {
                "opacity-0": l != currentLineHeight,
              })}
            />
            <p className="font-roboto self-start text-lg">{l}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
