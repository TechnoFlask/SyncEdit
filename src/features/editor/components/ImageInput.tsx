"use client";

import { Hover } from "@/components/custom/Hover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLinkPlus, IconPhotoPlus, IconPhotoUp } from "@tabler/icons-react";
import { useState } from "react";
import { useImage } from "../hooks/useImage";
import { ImageLinkPasteDialog } from "./ImageLinkPasteDialog";

export function ImageInput() {
  const [openDialog, setOpenDialog] = useState(false);
  const { uploadImage } = useImage();

  return (
    <>
      <DropdownMenu>
        <Hover
          trigger={
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300 focus:outline-none">
                <IconPhotoPlus />
              </button>
            </DropdownMenuTrigger>
          }
          content={"Add image"}
        />
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className="transition-colors duration-200"
            onClick={uploadImage}
          >
            <IconPhotoUp className="size-6 text-black" />
            <p className="text-lg">Upload image</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="transition-colors duration-200"
            onClick={() => setOpenDialog(true)}
          >
            <IconLinkPlus className="size-6 text-black" />
            <p className="text-lg">Paste image link</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ImageLinkPasteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
