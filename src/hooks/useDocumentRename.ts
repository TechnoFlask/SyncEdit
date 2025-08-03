import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { documentSchema } from "@convex/schema";
import { useConvexAuth, useMutation } from "convex/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useDocumentRename() {
  const { isAuthenticated } = useConvexAuth();

  const renameDocumentMutation = useMutation(
    api.documents.mutations.renameDocument,
  );
  const [isRenaming, setIsRenaming] = useState(false);

  const handleDocumentRenaming = useCallback(
    async (documentId: Id<"documents">, newTitle: string, oldTitle: string) => {
      if (!isAuthenticated) {
        toast.warning("Sign in to rename document");
        return;
      }

      if (newTitle.trim() === oldTitle.trim()) {
        toast.warning("Title did not change");
        return;
      }

      const parseResult = documentSchema.shape.title.safeParse(newTitle);
      if (!parseResult.success) {
        toast.error(parseResult.error.errors[0].message);
        return;
      }

      setIsRenaming(true);
      try {
        const documentRenamingResult = await renameDocumentMutation({
          documentId: documentId,
          title: parseResult.data.trim(),
        });
        if (!documentRenamingResult.success) {
          toast.error(documentRenamingResult.cause);
          return;
        }

        toast.success("Renamed document successfully");
      } finally {
        setIsRenaming(false);
      }
    },
    [renameDocumentMutation, isAuthenticated],
  );

  return { isRenaming, handleDocumentRenaming };
}
