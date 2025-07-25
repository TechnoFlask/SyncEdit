"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { api } from "@convex/_generated/api";
import { IconUser } from "@tabler/icons-react";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useOrganizationContext } from "../context/OrganizationContext";

export function OrganizationMembers() {
  const { currentOrganization } = useOrganizationContext();
  const organizationMembers = useQuery(
    api.organizations.queries.getCurrentOrganizationMembers,
    currentOrganization.id
      ? {
          organizationId: currentOrganization.id,
        }
      : "skip",
  );

  if (!organizationMembers?.success) return null;

  return (
    <>
      {organizationMembers.value.map((om) => (
        <DropdownMenuItem key={om._id}>
          {om.image ? (
            <Image src={om.image} width={30} height={30} alt="Avatar" />
          ) : (
            <IconUser className="size-6 text-black" />
          )}
          <p className="text-lg">
            {om.userName ?? `${om.firstName} ${om.lastName}` ?? "Anonymous"}
          </p>
        </DropdownMenuItem>
      ))}
    </>
  );
}
