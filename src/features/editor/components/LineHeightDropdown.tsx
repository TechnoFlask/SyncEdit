import { Hover } from "@/components/custom/Hover";
import {
  LINE_HEIGHTS,
  LineHeightItem,
} from "@/components/custom/LineHeightList";
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

export function LineHeightDropdown() {
  const { editorOptionsActions, editorOptionsActive } = useEditorContext();
  const [open, setOpen] = useState(false);

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
        {LINE_HEIGHTS.map((l) => (
          <DropdownMenuItem
            className="transition-colors duration-200"
            key={l}
            onClick={() => editorOptionsActions.lineHeight?.(l)}
          >
            <IconCheck
              className={cn("!h-6 !w-6", {
                "opacity-0": !editorOptionsActive.lineHeight(l),
              })}
            />
            <p className="font-roboto self-start text-lg">
              <LineHeightItem lineHeight={l} />
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
