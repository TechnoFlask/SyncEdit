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
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { useState } from "react";

const ALIGNMENTS = Object.freeze([
  {
    name: "Left",
    value: "left",
    icon: <IconAlignLeft className="size-6 text-black" />,
  },
  {
    name: "Center",
    value: "center",
    icon: <IconAlignCenter className="size-6 text-black" />,
  },
  {
    name: "Right",
    value: "right",
    icon: <IconAlignRight className="size-6 text-black" />,
  },
  {
    name: "Justify",
    value: "justify",
    icon: <IconAlignJustified className="size-6 text-black" />,
  },
] as const);

export function TextAlign() {
  const { editorOptionsActions, editorOptionsActive } = useEditorContext();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <Hover
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="flex cursor-pointer items-center gap-1.5 rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300 focus:outline-none">
              {ALIGNMENTS.find((alignment) =>
                editorOptionsActive.alignment(alignment.value),
              )?.icon ?? ALIGNMENTS[0].icon}
              <IconChevronDown
                className={cn("size-5 transition-transform duration-200", {
                  "rotate-180": open,
                })}
              />
            </button>
          </DropdownMenuTrigger>
        }
        content={"Align text"}
      />
      <DropdownMenuContent align="start">
        {ALIGNMENTS.map(({ name, value, icon }) => (
          <DropdownMenuItem
            onClick={() => editorOptionsActions.alignment?.(value)}
            className={cn("transition-colors duration-200", {
              "bg-gray-100": editorOptionsActive.alignment(value),
            })}
            key={name}
          >
            {icon}
            <p className="text-lg">{name}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
