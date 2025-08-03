"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { IconBuildings } from "@tabler/icons-react";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";
import { InviteMemberDialog } from "./components/InviteMemberDialog";
import { LeaveOrganizationDialog } from "./components/LeaveOrganizationDialog";
import { OrganizationMembers } from "./components/OrganizationMembers";
import { OrganizationsDropdown } from "./components/OrganizationsDropdown";
import { useOrganizationContext } from "./context/OrganizationContext";

export function OrgSwitcher() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { currentOrganization } = useOrganizationContext();

  useEffect(() => {
    const sessionToast = sessionStorage.getItem("org-toast");
    if (!sessionToast) return;
    sessionStorage.removeItem("org-toast");

    const toastMsg: {
      type: "success" | "info" | "warning" | "error";
      msg: string;
    } = JSON.parse(sessionToast);

    toast[toastMsg.type](toastMsg.msg);
  }, []);

  if (isLoading) return <div />;
  if (!isAuthenticated) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-gray-200 focus-visible:outline-none">
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <OrganizationsDropdown />
        {currentOrganization.canInviteOthers && (
          <>
            <Separator />
            <InviteMemberDialog />
          </>
        )}
        <OrganizationMembers />
        {!(
          currentOrganization.canInviteOthers ||
          currentOrganization.name === "Default"
        ) && (
          <>
            <Separator />
            <LeaveOrganizationDialog />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
