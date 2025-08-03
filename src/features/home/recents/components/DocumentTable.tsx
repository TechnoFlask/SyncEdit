"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserName } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import {
  IconBrandSamsungpass,
  IconBuildings,
  IconChevronDown,
  IconFileCheckFilled,
  IconLoader,
} from "@tabler/icons-react";
import { UsePaginatedQueryReturnType } from "convex/react";
import { useMemo } from "react";
import { DocumentTableActions } from "./DocumentTableActions";

export function DocumentTable({
  searchedDocuments,
  paginatedDocuments,
}: {
  searchedDocuments:
    | (Doc<"documents"> & { isOwner: boolean; user: Doc<"users"> })[]
    | null
    | undefined;
  paginatedDocuments: UsePaginatedQueryReturnType<
    typeof api.documents.queries.getAllDocuments
  >;
}) {
  const {
    results: paginatedResults,
    isLoading,
    loadMore,
    status,
  } = paginatedDocuments;

  const results = searchedDocuments ? searchedDocuments : paginatedResults;
  const docType = searchedDocuments ? "searched" : "paginated";

  const dateFormatter = useMemo(
    () => Intl.DateTimeFormat("en-IN", { dateStyle: "long" }),
    [],
  );

  return (
    <Table className="ml-2 h-10 max-w-[1144px]">
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} className="py-4 text-lg">
            Title
          </TableHead>
          <TableHead className="py-4 text-lg">Type</TableHead>
          <TableHead className="py-4 text-lg">Created On</TableHead>
          <TableHead className="py-4 text-lg"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-muted-foreground p-5 text-center text-lg"
            >
              No documents to show
            </TableCell>
          </TableRow>
        )}
        {results.map((result) => (
          <TableRow
            key={result._id}
            onClick={() => window.open(`/document/${result._id}`, "_blank")}
            className="cursor-pointer"
          >
            <TableCell colSpan={2}>
              <div className="flex items-center gap-4">
                <IconFileCheckFilled className="size-7" />
                <p className="text-lg font-semibold">{result.title}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {result.organizationId ? (
                  <>
                    <IconBuildings className="size-7" />
                    <p className="text-lg">Shared</p>
                    <p className="text-lg">
                      ({result.isOwner ? "You" : getUserName(result.user)})
                    </p>
                  </>
                ) : (
                  <>
                    <IconBrandSamsungpass className="size-7" />
                    <p className="text-lg">Personal</p>
                  </>
                )}
              </div>
            </TableCell>
            <TableCell>
              <p className="text-lg">
                {dateFormatter.format(result._creationTime)}
              </p>
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <DocumentTableActions document={result} />
                {/* <IconDots className="size-7" /> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
        {docType === "paginated" && isLoading && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-muted-foreground p-5 text-center text-lg"
            >
              <div className="flex items-center justify-center gap-3">
                <IconLoader className="size-7 animate-spin" />
                Loading more documents
              </div>
            </TableCell>
          </TableRow>
        )}
        {docType === "paginated" && status === "CanLoadMore" && (
          <TableRow className="cursor-pointer" onClick={() => loadMore(5)}>
            <TableCell
              colSpan={5}
              className="text-muted-foreground p-5 text-center text-lg"
            >
              <div className="flex items-center justify-center gap-3">
                <IconChevronDown className="size-7 animate-bounce" />
                Load more
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
