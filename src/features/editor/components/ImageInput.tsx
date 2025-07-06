"use client";

import { Hover } from "@/components/custom/Hover";
import { toast } from "@/components/custom/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { isValidLink } from "@/lib/utils";
import { IconLinkPlus, IconPhotoPlus, IconPhotoUp } from "@tabler/icons-react";
import { useCallback, useRef, useState } from "react";

export function ImageInput() {
  const { editor } = useEditorContext();
  const [openDialog, setOpenDialog] = useState(false);
  const imageLinkInputRef = useRef<HTMLInputElement>(null);

  const setImage = useCallback(
    (url: string) => {
      if (!isValidLink(url)) {
        toast.error("Invalid URL.");
        return;
      }

      editor?.chain().focus().setImage({ src: url }).run();
    },
    [editor],
  );

  const revokeImageBlobUrl = useCallback(() => {
    const currentImageBlob = editor?.getAttributes("image");
    if (currentImageBlob && currentImageBlob.src)
      URL.revokeObjectURL(currentImageBlob.src);
  }, [editor]);

  const uploadImage = useCallback(() => {
    revokeImageBlobUrl();
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.hidden = true;
    imageInput.accept = "image/*";

    imageInput.onchange = () => {
      const image = imageInput.files?.[0];
      if (!image) return;

      const url = URL.createObjectURL(image);
      setImage(url);
      imageInput.value = "";
    };

    imageInput.click();
  }, [setImage, revokeImageBlobUrl]);

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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Enter or paste an image URL
            </DialogTitle>
          </DialogHeader>
          <Input
            ref={imageLinkInputRef}
            className="!text-lg"
            placeholder="Image URL"
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              setImage(imageLinkInputRef.current?.value ?? "");
              setOpenDialog(false);
            }}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="text-lg"
                variant="secondary"
                onClick={() => setImage(imageLinkInputRef.current?.value ?? "")}
              >
                Add
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="text-lg" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
