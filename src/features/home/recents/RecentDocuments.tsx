"use client";

import { api } from "@convex/_generated/api";
import { useConvexAuth, usePaginatedQuery, useQuery } from "convex/react";
import { useQueryState } from "nuqs";
import { DocumentTable } from "./components/DocumentTable";
import { NotAuthenticatedBanner } from "./components/NotAuthenticatedBanner";

export function RecentDocuments() {
  const { isAuthenticated } = useConvexAuth();
  const [searchQuery] = useQueryState("search");

  const searchedDocuments = useQuery(
    api.documents.queries.getSearchedDocuments,
    isAuthenticated && searchQuery != null ? { search: searchQuery } : "skip",
  );

  const paginatedDocuments = usePaginatedQuery(
    api.documents.queries.getAllDocuments,
    isAuthenticated && searchQuery == null ? {} : "skip",
    { initialNumItems: 5 },
  );

  return (
    <div className="w-full grow bg-white">
      <div className="mx-auto max-w-screen-xl space-y-4 px-16 py-6 pb-20">
        <p className="pl-4 text-xl font-medium">Recent documents</p>
        {!isAuthenticated && <NotAuthenticatedBanner />}
        {isAuthenticated && (
          <DocumentTable
            searchedDocuments={searchedDocuments}
            paginatedDocuments={paginatedDocuments}
          />
        )}
      </div>
    </div>
  );
}
