import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { getUserName } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { FunctionReturnType } from "convex/server";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveDocumentAccess } from "../actions/saveDocumentAccess";

export function DocumentAccessTable({
  membersWithPermissions,
  document,
  closeParentDialog,
  toggleSavingState,
}: {
  membersWithPermissions: Extract<
    FunctionReturnType<typeof api.permissions.queries.getDocumentPermissions>,
    { success: true }
  >["value"];
  document: Doc<"documents">;
  closeParentDialog: () => void;
  toggleSavingState: (savingState: boolean) => void;
}) {
  const { currentOrganization } = useOrganizationContext();
  const [isPending, startTransition] = useTransition();

  const [editPermissionsMap, setEditPermissionsMap] = useState<
    Map<Doc<"users">, boolean>
  >(() => new Map());

  useEffect(() => {
    const initialMap = new Map(
      membersWithPermissions
        .filter(
          (m) =>
            m._id !== currentOrganization.ownerId && m._id !== document.ownerId,
        )
        .map(({ permission, ...user }) => [
          user,
          permission != null && permission.accessLevel === "edit",
        ]),
    );

    setEditPermissionsMap(initialMap);
  }, [currentOrganization, membersWithPermissions, document]);

  return (
    <div className="flex flex-col gap-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-4 text-center text-lg">Member</TableHead>
            <TableHead className="py-4 text-center text-lg">
              Edit access
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editPermissionsMap
            .keys()
            .toArray()
            .map((ep, i) => (
              <TableRow key={i}>
                <TableCell className="py-4 text-center text-lg">
                  {getUserName(ep)}
                </TableCell>
                <TableCell className="flex justify-center py-4">
                  <Input
                    type="checkbox"
                    className="size-6"
                    onChange={() =>
                      setEditPermissionsMap((prev) => {
                        const newMap = new Map(prev);
                        newMap.set(ep, !prev.get(ep));

                        return newMap;
                      })
                    }
                    checked={editPermissionsMap.get(ep)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button
        disabled={isPending}
        className="w-fit self-end text-lg"
        variant="secondary"
        onClick={() => {
          toggleSavingState(true);
          startTransition(async () => {
            const toastId = toast.loading("whatever...");
            const result = await saveDocumentAccess(
              editPermissionsMap,
              document._id,
            );
            toast.dismiss(toastId);

            if (!result?.success) {
              toast.error(result?.cause);
            } else {
              toast.success("Changed access successfully");
            }

            toggleSavingState(false);
            closeParentDialog();
          });
        }}
      >
        Save access changes
      </Button>
    </div>
  );
}
