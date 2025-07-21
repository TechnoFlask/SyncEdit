"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@convex/_generated/api";
import {
  IconBrandSamsungpass,
  IconFileCheckFilled,
  IconShare,
} from "@tabler/icons-react";
import { UsePaginatedQueryReturnType } from "convex/react";
import { useMemo } from "react";
import { DocumentTableActions } from "./DocumentTableActions";

export function DocumentTable({
  paginatedDocuments,
}: {
  paginatedDocuments: UsePaginatedQueryReturnType<
    typeof api.documents.queries.getAllDocuments
  >;
}) {
  const { results, isLoading, loadMore, status } = paginatedDocuments;
  const dateFormatter = useMemo(
    () => Intl.DateTimeFormat("en-IN", { dateStyle: "long" }),
    [],
  );

  return (
    <Table className="ml-4 max-w-5xl">
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} className="text-lg">
            Title
          </TableHead>
          <TableHead className="text-lg">Type</TableHead>
          <TableHead className="text-lg">Created On</TableHead>
          <TableHead className="text-lg"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
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
                    <IconShare className="size-7" />
                    <p className="text-lg">Shared</p>
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
      </TableBody>
    </Table>
  );
}
