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
import { useEditorContext } from "@/features/editor/context/EditorContext";
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
import { saveHTML, saveJSON, savePlainText } from "../utils/documentExport";

export function FileMenu() {
  const { editor } = useEditorContext();

  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
        File
      </MenubarTrigger>
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg [&_*]:transition-colors [&_*]:duration-200">
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
            <MenubarItem onMouseDown={() => saveJSON(editor)}>
              <IconJson className="mr-1 size-6" />
              JSON
            </MenubarItem>
            <MenubarItem onMouseDown={() => saveHTML(editor)}>
              <IconFileTypeHtml className="mr-1 size-6" />
              HTML
            </MenubarItem>
            <MenubarItem onMouseDown={() => window.print()}>
              <IconFileTypePdf className="mr-1 size-6" />
              PDF
            </MenubarItem>
            <MenubarItem onMouseDown={() => savePlainText(editor)}>
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
        <MenubarItem className="hover:!bg-destructive hover:[&_*]:text-white">
          <IconTrash className="size-6 text-black" />
          <p>Delete</p>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <IconInfoTriangle className="size-6 text-black" />
          Details
        </MenubarItem>
        <MenubarItem
          className="transition-colors duration-1000"
          onMouseDown={() => print()}
        >
          <IconPrinter className="size-6 text-black" />
          Print
          <MenubarShortcut>Ctrl+P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
