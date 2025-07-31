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
import { FunctionReturnType } from "convex/server";
import { useMemo } from "react";

export function DocumentAccessTable({
  membersWithPermissions,
}: {
  membersWithPermissions: Extract<
    FunctionReturnType<typeof api.permissions.queries.getDocumentPermissions>,
    { success: true }
  >["value"];
}) {
  const { currentOrganization } = useOrganizationContext();

  const editPermissionsMap: Record<string, boolean> = useMemo(
    () =>
      membersWithPermissions
        .filter((p) => p._id !== currentOrganization.ownerId)
        .reduce(
          (acc, { permission, ...user }) => ({
            [getUserName(user)]: !(
              permission == null ||
              permission.accessLevel == null ||
              permission.accessLevel === "read"
            ),
          }),
          {},
        ),
    [membersWithPermissions, currentOrganization],
  );

  return (
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
        {Object.keys(editPermissionsMap).map((ep, i) => (
          <TableRow key={i}>
            <TableCell className="py-4 text-center text-lg">Anish</TableCell>
            <TableCell className="flex justify-center py-4">
              <Input type="checkbox" className="size-6" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
