"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { Doc } from "@convex/_generated/dataModel";
import { IconDots } from "@tabler/icons-react";
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
        <DocumentRenameDialog document={document} />
        <DocumentDeleteDialog document={document}></DocumentDeleteDialog>
        {(currentOrganization.canInviteOthers ||
          currentOrganization.name !== "Default") && (
          <DocumentManageAccessDialog document={document} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
