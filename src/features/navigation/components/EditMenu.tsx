"use client";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconSelectAll,
  IconTrash,
} from "@tabler/icons-react";

export function EditMenu() {
  const { editor, editorOptionsActions } = useEditorContext();

  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
        Edit
      </MenubarTrigger>
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg">
        <MenubarItem onClick={() => editorOptionsActions.undo?.()}>
          <IconArrowBackUp className="size-6 text-black" />
          Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem onClick={() => editorOptionsActions.redo?.()}>
          <IconArrowForwardUp className="size-6 text-black" />
          Redo<MenubarShortcut>Ctrl+Y</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => editor?.chain().focus().selectAll().run()}>
          <IconSelectAll className="size-6 text-black" />
          Select all <MenubarShortcut>Ctrl+A</MenubarShortcut>
        </MenubarItem>
        <MenubarItem
          onClick={() => editor?.chain().deleteSelection().run()}
          disabled={(() => {
            if (editor == undefined) return false;
            const { from, to } = editor.state.selection!;
            return from === to;
          })()}
        >
          <IconTrash className="size-6 text-black" />
          Delete
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
