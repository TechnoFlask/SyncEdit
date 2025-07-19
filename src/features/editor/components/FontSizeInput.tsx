import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

const DROPDOWN_SIZES = Object.freeze([
  8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96,
] as const);

const HEADING_SIZES = Object.freeze({
  1: "36",
  2: "30",
  3: "24",
  4: "20",
} as const);

export function FontSizeInput() {
  const { editor } = useEditorContext();

  const headingLevel = editor?.getAttributes("heading").level;
  const currentFontSize =
    editor?.getAttributes("textStyle")?.fontSize ??
    (headingLevel && HEADING_SIZES[headingLevel as 1 | 2 | 3 | 4]) ??
    "16";
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-1.5">
      <IconMinus
        className="rounded-sm p-0.5 transition-colors duration-200 hover:bg-gray-300"
        onClick={() =>
          editor?.commands.setFontSize(String(parseInt(currentFontSize) - 1))
        }
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="border-muted-foreground flex w-[4ch] justify-center rounded-md border !text-lg focus:outline-none"
          >
            {currentFontSize}
          </div>
        </PopoverTrigger>
        <PopoverContent className="max-w-[8ch] p-0">
          <Command>
            <CommandInput
              onBeforeInput={(e) => {
                if (!/^\d*$/.test(e.data ?? "")) {
                  e.preventDefault();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  editor?.commands.setFontSize(
                    (e.target as HTMLInputElement).value,
                  );
                  setOpen(false);
                }
              }}
              className="text-lg"
            />
            <CommandList>
              {DROPDOWN_SIZES.map((s) => (
                <CommandItem
                  onMouseDown={() => {
                    editor?.commands.setFontSize(String(s));
                    setOpen(false);
                  }}
                  key={s}
                  className="flex justify-center text-lg"
                >
                  {s}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <IconPlus
        className="rounded-sm p-0.5 transition-colors duration-200 hover:bg-gray-300"
        onClick={() =>
          editor?.commands.setFontSize(String(parseInt(currentFontSize) + 1))
        }
      />
    </div>
  );
}
