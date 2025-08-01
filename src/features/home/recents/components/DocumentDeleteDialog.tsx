"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { getUserName } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { IconTrash } from "@tabler/icons-react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function DocumentDeleteDialog({
  document,
}: {
  document: Doc<"documents"> & { isOwner: boolean; user: Doc<"users"> };
}) {
  const { isAuthenticated } = useConvexAuth();
  const deleteDocument = useMutation(api.documents.mutations.deleteDocument);
  const userQueryResult = useQuery(api.users.queries.getCurrentUser);
  const [isDeleting, setIsDeleting] = useState(false);
  const { currentOrganization } = useOrganizationContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleDocumentDeletion = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsDeleting(true);
    try {
      const documentDeletionResult = await deleteDocument({
        documentId: document._id,
      });
      if (!documentDeletionResult.success) {
        toast.error(documentDeletionResult.cause);
        return;
      }

      toast.success("Deleted document successfully");
    } finally {
      setIsDeleting(false);
    }
  }, [deleteDocument, document._id, isAuthenticated]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            if (
              userQueryResult &&
              userQueryResult.success &&
              !document.isOwner &&
              currentOrganization.ownerId !== userQueryResult.value._id
            ) {
              toast.error("You are not authorized to delete this document");
              setIsOpen(false);
            }
          }}
          className="hover:!bg-destructive flex size-full gap-2 transition-all duration-200 hover:[&_*]:text-white"
        >
          <IconTrash className="size-6 text-black transition-all duration-200" />
          <p className="text-lg text-black transition-all duration-200">
            Delete
          </p>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            This action will delete this document (Owner:&nbsp;
            {document.isOwner ? "You" : getUserName(document.user)})
            permanently. This action can not be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer text-base"
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive/80 hover:bg-destructive cursor-pointer border text-base"
            onClick={handleDocumentDeletion}
            disabled={isDeleting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
