"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDocumentRename } from "@/hooks/useDocumentRename";
import { Id } from "@convex/_generated/dataModel";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ReactNode, useRef, useState } from "react";

export function DocumentRenameDialog({
  children,
  documentId,
  documentTitle,
}: {
  children: ReactNode;
  documentId: Id<"documents">;
  documentTitle: string;
}) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { isRenaming, handleDocumentRenaming } = useDocumentRename();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Rename document</DialogTitle>
          <DialogDescription className="text-lg">
            Enter new name for the document
          </DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          defaultValue={documentTitle}
          ref={titleInputRef}
          className="not-focus:text-lg placeholder:text-lg focus:text-lg"
          placeholder="Document title"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDocumentRenaming(
                documentId,
                titleInputRef.current?.value.trim() ?? "",
                documentTitle,
              );
              setIsOpen(false);
            }
          }}
        />
        <DialogFooter>
          <DialogClose
            className="cursor-pointer text-base"
            asChild
            disabled={isRenaming}
          >
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="text-base"
              type="submit"
              variant="secondary"
              onClick={() =>
                handleDocumentRenaming(
                  documentId,
                  titleInputRef.current?.value.trim() ?? "",
                  documentTitle,
                )
              }
              disabled={isRenaming}
            >
              Rename
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
