"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { useDocumentRename } from "@/hooks/useDocumentRename";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { IconEdit } from "@tabler/icons-react";
import { useQuery } from "convex/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function DocumentRenameDialog({
  document,
}: {
  document: Doc<"documents"> & { isOwner: boolean; user: Doc<"users"> };
}) {
  const userQueryResult = useQuery(api.users.queries.getCurrentUser);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { currentOrganization } = useOrganizationContext();

  const { isRenaming, handleDocumentRenaming } = useDocumentRename();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            if (
              userQueryResult &&
              userQueryResult.success &&
              !document.isOwner &&
              currentOrganization.ownerId !== userQueryResult.value._id
            ) {
              toast.error("You are not authorized to rename this document");
              setIsOpen(false);
            }
          }}
          className="gap-2 transition-all duration-200"
        >
          <IconEdit className="size-6 text-black transition-all duration-200" />
          <p className="text-lg text-black transition-all duration-200">
            Rename
          </p>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Rename document</DialogTitle>
          <DialogDescription className="text-lg">
            Enter new name for the document
          </DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          defaultValue={document.title}
          ref={titleInputRef}
          className="not-focus:text-lg placeholder:text-lg focus:text-lg"
          placeholder="Document title"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDocumentRenaming(
                document._id,
                titleInputRef.current?.value.trim() ?? "",
                document.title,
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
                  document._id,
                  titleInputRef.current?.value.trim() ?? "",
                  document.title,
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
