"use client";

import {
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { TableBgColor } from "./TableBgColor";

export function TableOptions() {
  const { editorOptionsActions, editorOptionsActive, editor } =
    useEditorContext();

  if (!editorOptionsActive.table()) return;

  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
        Table
      </MenubarTrigger>
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg">
        <TableBgColor />
      </MenubarContent>
    </MenubarMenu>
  );
}
