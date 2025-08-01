import { toast } from "@/components/custom/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { IconLockCog } from "@tabler/icons-react";
import { useQuery } from "convex/react";
import { useState } from "react";
import { DocumentAccessTable } from "./DocumentAccessTable";

export function DocumentManageAccessDialog({
  document,
}: {
  document: Doc<"documents"> & { isOwner: boolean; user: Doc<"users"> };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { currentOrganization } = useOrganizationContext();
  const userQueryResult = useQuery(api.users.queries.getCurrentUser);
  const permissionQueryResult = useQuery(
    api.permissions.queries.getDocumentPermissions,
    {
      organizationId: currentOrganization.id!,
      documentId: document._id,
    },
  );

  console.log(isSaving);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            if (
              userQueryResult &&
              userQueryResult.success &&
              !document.isOwner &&
              currentOrganization.ownerId !== userQueryResult.value._id
            ) {
              toast.error(
                "You are not authorized to manage access of this document",
              );
              setIsOpen(false);
            }
          }}
          className="flex size-full gap-2 transition-all duration-200"
        >
          <IconLockCog className="size-6 text-black" />
          <p className="text-lg text-black">Manage access</p>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          if (isSaving) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isSaving) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Manage document access</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {permissionQueryResult && permissionQueryResult.success && (
          <DocumentAccessTable
            membersWithPermissions={permissionQueryResult.value}
            document={document}
            toggleSavingState={setIsSaving}
            closeParentDialog={setIsOpen.bind(null, false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
