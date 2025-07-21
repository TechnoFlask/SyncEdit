"use client";

import { api } from "@convex/_generated/api";
import { useConvexAuth, usePaginatedQuery } from "convex/react";
import { DocumentTable } from "./components/DocumentTable";
import { NotAuthenticatedBanner } from "./components/NotAuthenticatedBanner";

export function RecentDocuments() {
  const { isAuthenticated } = useConvexAuth();

  const documents = usePaginatedQuery(
    api.documents.queries.getAllDocuments,
    isAuthenticated ? {} : "skip",
    { initialNumItems: 5 },
  );

  return (
    <div className="w-full grow bg-white">
      <div className="mx-auto max-w-screen-xl space-y-4 px-16 py-6">
        <p className="pl-4 text-lg">Recent documents</p>
        {!isAuthenticated && <NotAuthenticatedBanner />}
        {isAuthenticated && <DocumentTable paginatedDocuments={documents} />}
      </div>
    </div>
  );
}
