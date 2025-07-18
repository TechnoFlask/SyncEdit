import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useImage } from "../hooks/useImage";

export function ImageLinkPasteDialog({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (v: boolean) => void;
}) {
  const imageLinkInputRef = useRef<HTMLInputElement>(null);
  const { setImage } = useImage();

  return (
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
  );
}
