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
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg [&_*]:transition-colors [&_*]:duration-200">
        <TableBgColor />
        <MenubarSub>
          <MenubarSubTrigger className="space-x-2">
            <IconTableRow />
            Add row
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              onMouseDown={() => editor?.chain().focus().addRowBefore().run()}
            >
              <IconRowInsertTop className="size-6 text-black" />
              Before
            </MenubarItem>
            <MenubarItem
              onMouseDown={() => editor?.chain().focus().addRowAfter().run()}
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
              onMouseDown={() =>
                editor?.chain().focus().addColumnBefore().run()
              }
            >
              <IconColumnInsertLeft className="size-6 text-black" />
              Before
            </MenubarItem>
            <MenubarItem
              onMouseDown={() => editor?.chain().focus().addColumnAfter().run()}
            >
              <IconColumnInsertRight className="size-6 text-black" />
              After
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem
          onMouseDown={() => editor?.chain().focus().mergeCells().run()}
        >
          <IconArrowMerge className="size-6 text-black" />
          Merge cells
        </MenubarItem>
        <MenubarItem
          onMouseDown={() => editor?.chain().focus().splitCell().run()}
        >
          <IconArrowsSplit className="size-6 text-black" />
          Split cell
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem
          className="hover:!bg-destructive hover:[&_*]:text-white"
          onMouseDown={() => editor?.chain().focus().deleteRow().run()}
        >
          <IconRowRemove className="size-6 text-black" />
          <p>Delete row</p>
        </MenubarItem>
        <MenubarItem
          className="hover:!bg-destructive hover:[&_*]:text-white"
          onMouseDown={() => editor?.chain().focus().deleteColumn().run()}
        >
          <IconColumnRemove className="size-6 text-black" />
          <p>Delete column</p>
        </MenubarItem>
        <MenubarItem
          className="hover:!bg-destructive hover:[&_*]:text-white"
          onMouseDown={() => editor?.chain().focus().deleteTable().run()}
        >
          <IconTableMinus className="size-6 text-black" />
          <p>Delete table</p>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
