"use client";

import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { api } from "@convex/_generated/api";
import { IconLoader } from "@tabler/icons-react";
import { useConvexAuth, usePaginatedQuery, useQuery } from "convex/react";
import { useQueryState } from "nuqs";
import { DocumentTable } from "./components/DocumentTable";
import { NotAuthenticatedBanner } from "./components/NotAuthenticatedBanner";

export function RecentDocuments() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [searchQuery] = useQueryState("search");
  const { currentOrganization } = useOrganizationContext();

  const paginatedDocuments = usePaginatedQuery(
    api.documents.queries.getAllDocuments,
    isAuthenticated && searchQuery == null
      ? {
          organizationId:
            currentOrganization.name === "Default"
              ? undefined
              : currentOrganization.id,
        }
      : "skip",
    { initialNumItems: 5 },
  );

  const searchedDocuments = useQuery(
    api.documents.queries.getSearchedDocuments,
    isAuthenticated && searchQuery != null
      ? {
          search: searchQuery,
          organizationId:
            currentOrganization.name === "Default"
              ? undefined
              : currentOrganization.id,
        }
      : "skip",
  );

  return (
    <div className="w-full grow bg-white">
      <div className="mx-auto max-w-screen-xl space-y-4 px-16 py-6 pb-20">
        <p className="pl-4 text-xl font-medium">Recent documents</p>
        {isLoading && (
          <div className="flex items-center justify-center gap-3">
            <IconLoader className="size-7 animate-spin" />
            <p className="text-muted-foreground text-lg">Loading documents</p>
          </div>
        )}
        {!isLoading && !isAuthenticated && <NotAuthenticatedBanner />}
        {isAuthenticated && !isLoading && (
          <DocumentTable
            searchedDocuments={
              searchedDocuments && searchedDocuments.success
                ? searchedDocuments.value
                : undefined
            }
            paginatedDocuments={paginatedDocuments}
          />
        )}
      </div>
    </div>
  );
}
