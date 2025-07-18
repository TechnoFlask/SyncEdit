"use client";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ImageLinkPasteDialog } from "@/features/editor/components/ImageLinkPasteDialog";
import { LinkAdditionBody } from "@/features/editor/components/LinkInput";
import { useImage } from "@/features/editor/hooks/useImage";
import {
  IconLinkPlus,
  IconPhotoPlus,
  IconPhotoUp,
  IconTablePlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { TableGrid } from "./TableGrid";

export function InsertMenu() {
  const { uploadImage } = useImage();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
          Insert
        </MenubarTrigger>
        <MenubarContent className="w-3xs print:hidden [&_*]:text-lg">
          <MenubarSub>
            <MenubarSubTrigger className="flex gap-2">
              <IconLinkPlus className="size-6 text-black" />
              Link
            </MenubarSubTrigger>
            <MenubarSubContent className="flex w-xs flex-col gap-4 p-8">
              <LinkAdditionBody />
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger className="flex gap-2">
              <IconPhotoPlus className="size-6 text-black" />
              Image
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={uploadImage}>
                <IconPhotoUp className="size-6 text-black" />
                <p className="text-lg">Upload image</p>
              </MenubarItem>
              <MenubarItem onClick={() => setOpenDialog(true)}>
                <IconLinkPlus className="size-6 text-black" />
                <p className="text-lg">Paste image link</p>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger className="flex gap-2">
              <IconTablePlus className="size-6 text-black" />
              Table
            </MenubarSubTrigger>
            <MenubarSubContent>
              <TableGrid />
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <ImageLinkPasteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
