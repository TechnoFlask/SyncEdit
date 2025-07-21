"use client";

import { toast } from "@/components/custom/toast";
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
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useConvexAuth, useMutation } from "convex/react";
import { ReactNode, useCallback, useState } from "react";

export function DocumentDeleteDialog({
  children,
  documentId,
}: {
  children: ReactNode;
  documentId: Id<"documents">;
}) {
  const { isAuthenticated } = useConvexAuth();
  const deleteDocument = useMutation(api.documents.mutations.deleteDocument);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDocumentDeletion = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsDeleting(true);
    try {
      const documentDeletionResult = await deleteDocument({ documentId });
      if (!documentDeletionResult.success) {
        toast.error(documentDeletionResult.cause);
        return;
      }

      toast.success("Deleted document successfully");
    } finally {
      setIsDeleting(false);
    }
  }, [deleteDocument, documentId, isAuthenticated]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            This action will delete this document permanently. This action can
            not be undone.
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
