"use client";

import { toast } from "@/components/custom/toast";
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
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useConvexAuth, useMutation } from "convex/react";
import { ReactNode, useCallback, useRef, useState } from "react";

export function DocumentRenameDialog({
  children,
  documentId,
  documentTitle,
}: {
  children: ReactNode;
  documentId: Id<"documents">;
  documentTitle: string;
}) {
  const { isAuthenticated } = useConvexAuth();
  const renameDocument = useMutation(api.documents.mutations.renameDocument);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDocumentRenaming = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsRenaming(true);
    try {
      const documentRenamingResult = await renameDocument({
        documentId,
        title: titleInputRef.current?.value.trim(),
      });
      if (!documentRenamingResult.success) {
        toast.error(documentRenamingResult.cause);
        return;
      }

      toast.success("Renamed document successfully");
    } finally {
      setIsRenaming(false);
    }
  }, [renameDocument, documentId, isAuthenticated]);

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
              handleDocumentRenaming();
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
              onClick={handleDocumentRenaming}
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
