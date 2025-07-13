"use client";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  IconFileArrowRight,
  IconFilePlus,
  IconFileTypeHtml,
  IconFileTypePdf,
  IconFileTypeTxt,
  IconInfoTriangle,
  IconJson,
  IconPencil,
  IconPrinter,
  IconTrash,
} from "@tabler/icons-react";

export function FileMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
        File
      </MenubarTrigger>
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg">
        <MenubarItem className="flex gap-2">
          <IconFilePlus className="size-6 text-black" />
          New
        </MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger className="flex gap-1">
            <IconFileArrowRight className="mr-1 size-6" />
            Export as
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>
              <IconJson className="mr-1 size-6" />
              JSON
            </MenubarItem>
            <MenubarItem>
              <IconFileTypeHtml className="mr-1 size-6" />
              HTML
            </MenubarItem>
            <MenubarItem>
              <IconFileTypePdf className="mr-1 size-6" />
              PDF
            </MenubarItem>
            <MenubarItem>
              <IconFileTypeTxt className="mr-1 size-6" />
              Plain Text
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem className="flex gap-2">
          <IconPencil className="size-6 text-black" />
          Rename
        </MenubarItem>
        <MenubarItem className="hover:!bg-destructive transition-colors duration-200 hover:[&_*]:text-white">
          <IconTrash className="size-6 text-black transition-colors duration-200" />
          <p className="transition-colors duration-200">Delete</p>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <IconInfoTriangle className="size-6 text-black" />
          Details
        </MenubarItem>
        <MenubarItem onClick={() => print()}>
          <IconPrinter className="size-6 text-black" />
          Print
          <MenubarShortcut>Ctrl+P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
