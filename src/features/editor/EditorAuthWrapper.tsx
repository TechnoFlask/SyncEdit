"use client";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useConvexAuth, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { Room } from "../collaboration/Room";
import { AuthEditor } from "./AuthEditor";
import { LoadingScreen } from "./components/LoadingScreen";
import { GuestEditor } from "./GuestEditor";

export function EditorAuthWrapper({ authButton }: { authButton: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const documentId = useParams().documentId as Id<"documents">;

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

  if (!documentQueryResult?.success)
    return <GuestEditor authButton={authButton} />;

  return (
    <Room>
      <AuthEditor
        document={documentQueryResult.value}
        authButton={authButton}
      />
    </Room>
  );
}
