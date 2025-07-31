"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { Doc } from "@convex/_generated/dataModel";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { DocumentDeleteDialog } from "./DocumentDeleteDialog";
import { DocumentManageAccessDialog } from "./DocumentManageAccessDialog";
import { DocumentRenameDialog } from "./DocumentRenameDialog";

export function DocumentTableActions({
  document,
}: {
  document: Doc<"documents"> & { isOwner: boolean; user: Doc<"users"> };
}) {
  const { currentOrganization } = useOrganizationContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full p-2 hover:bg-gray-300 focus-visible:outline-none">
        <IconDots className="size-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        <DocumentRenameDialog
          documentId={document._id}
          documentTitle={document.title}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="gap-2 transition-all duration-200"
          >
            <IconEdit className="size-6 text-black transition-all duration-200" />
            <p className="text-lg text-black transition-all duration-200">
              Rename
            </p>
          </DropdownMenuItem>
        </DocumentRenameDialog>
        <DocumentDeleteDialog
          documentId={document._id}
          documentOwner={document.user}
          isOwner={document.isOwner}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="hover:!bg-destructive flex size-full gap-2 transition-all duration-200 hover:[&_*]:text-white"
          >
            <IconTrash className="size-6 text-black transition-all duration-200" />
            <p className="text-lg text-black transition-all duration-200">
              Delete
            </p>
          </DropdownMenuItem>
        </DocumentDeleteDialog>
        {(currentOrganization.canInviteOthers ||
          currentOrganization.name !== "Default") && (
          <DocumentManageAccessDialog document={document} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
