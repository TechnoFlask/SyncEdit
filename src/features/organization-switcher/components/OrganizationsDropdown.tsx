"use client";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { IconBuildings, IconCheck } from "@tabler/icons-react";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useOrganizationContext } from "../context/OrganizationContext";
import { AddOrganizationDialog } from "./AddOrganizationDialog";

export function OrganizationsDropdown() {
  const { currentOrganization, setCurrentOrganization } =
    useOrganizationContext();
  const joinedOrganizations = useQuery(
    api.organizations.queries.getUserOrganizations,
  );

  if (!joinedOrganizations?.success) return null;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-gray-200 focus-visible:outline-none">
        {currentOrganization.image == null ? (
          <IconBuildings />
        ) : (
          <Image
            src={currentOrganization.image}
            width={30}
            height={30}
            alt="Org Image"
          />
        )}
        <p className="text-lg">{currentOrganization.name}</p>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {joinedOrganizations.value.map((o) => (
          <DropdownMenuItem
            onSelect={() =>
              setCurrentOrganization({
                id: o._id,
                name: o.name,
                image: o.imageUrl,
                canInviteOthers: o.isOwner && o.name !== "Default",
                ownerId: o.ownerId,
              })
            }
            key={o._id}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {o.imageUrl ? (
                <Image src={o.imageUrl} width={30} height={30} alt="Logo" />
              ) : (
                <IconBuildings className="size-6 text-black" />
              )}
              <p className="text-lg">{o.name}</p>
              <p
                className={cn("text-muted-foreground", {
                  invisible: !o.isOwner,
                })}
              >
                (owner)
              </p>
            </div>
            <IconCheck
              className={cn("size-6 text-black", {
                invisible: o._id !== currentOrganization.id,
              })}
            />
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <AddOrganizationDialog />
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
