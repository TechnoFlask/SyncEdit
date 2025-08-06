"use client";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useConvexAuth, useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Editor } from "./Editor";
import { LoadingScreen } from "./components/LoadingScreen";

export function EditorAuthWrapper({ authButton }: { authButton: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const pathname = usePathname();
  const documentId = pathname.split("/").at(-1) as Id<"documents">;

  const documentQueryResult = useQuery(
    api.documents.queries.getDocumentById,
    !isLoading && isAuthenticated
      ? {
          documentId,
        }
      : "skip",
  );

  if (isLoading) return <LoadingScreen />;

  if (isAuthenticated && documentQueryResult == undefined)
    return <LoadingScreen />;

  if (isAuthenticated && !documentQueryResult?.success) {
    throw new Error(documentQueryResult?.cause);
  }

  if (!isAuthenticated && documentId !== "notAuthenticated") {
    throw new Error("You are not authorized to access this document");
  }

  const document = documentQueryResult?.success
    ? documentQueryResult.value
    : undefined;

  return <Editor document={document} authButton={authButton} />;
}
