"use client";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import {
  IconArrowMerge,
  IconArrowsSplit,
  IconColumnInsertLeft,
  IconColumnInsertRight,
  IconColumnRemove,
  IconRowInsertBottom,
  IconRowInsertTop,
  IconRowRemove,
  IconTableColumn,
  IconTableMinus,
  IconTableRow,
} from "@tabler/icons-react";
import { TableBgColor } from "./TableBgColor";

export function TableOptions() {
  const { editorOptionsActive, editor } = useEditorContext();

  if (!editorOptionsActive.table()) return;

  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
        Table
      </MenubarTrigger>
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg">
        <TableBgColor />
        <MenubarSub>
          <MenubarSubTrigger className="space-x-2">
            <IconTableRow />
            Add row
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              onClick={() => editor?.chain().focus().addRowBefore().run()}
            >
              <IconRowInsertTop className="size-6 text-black" />
              Before
            </MenubarItem>
            <MenubarItem
              onClick={() => editor?.chain().focus().addRowAfter().run()}
            >
              <IconRowInsertBottom className="size-6 text-black" />
              After
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSub>
          <MenubarSubTrigger className="space-x-2">
            <IconTableColumn />
            Add column
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              onClick={() => editor?.chain().focus().addColumnBefore().run()}
            >
              <IconColumnInsertLeft className="size-6 text-black" />
              Before
            </MenubarItem>
            <MenubarItem
              onClick={() => editor?.chain().focus().addColumnAfter().run()}
            >
              <IconColumnInsertRight className="size-6 text-black" />
              After
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem onClick={() => editor?.chain().focus().mergeCells().run()}>
          <IconArrowMerge className="size-6 text-black" />
          Merge cells
        </MenubarItem>
        <MenubarItem onClick={() => editor?.chain().focus().splitCell().run()}>
          <IconArrowsSplit className="size-6 text-black" />
          Split cell
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem
          className="hover:!bg-destructive transition-colors duration-200 hover:[&_*]:text-white"
          onClick={() => editor?.chain().focus().deleteRow().run()}
        >
          <IconRowRemove className="size-6 text-black transition-colors duration-200" />
          <p className="transition-colors duration-200">Delete row</p>
        </MenubarItem>
        <MenubarItem
          className="hover:!bg-destructive transition-colors duration-200 hover:[&_*]:text-white"
          onClick={() => editor?.chain().focus().deleteColumn().run()}
        >
          <IconColumnRemove className="size-6 text-black transition-colors duration-200" />
          <p className="transition-colors duration-200">Delete column</p>
        </MenubarItem>
        <MenubarItem
          className="hover:!bg-destructive transition-colors duration-200 hover:[&_*]:text-white"
          onClick={() => editor?.chain().focus().deleteTable().run()}
        >
          <IconTableMinus className="size-6 text-black transition-colors duration-200" />
          <p className="transition-colors duration-200">Delete table</p>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
