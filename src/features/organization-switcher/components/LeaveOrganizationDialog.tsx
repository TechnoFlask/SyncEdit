"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { reloadWithToast } from "@/lib/utils";
import { IconDoorExit } from "@tabler/icons-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { leaveOrganization } from "../actions/leaveOrganization";
import { useOrganizationContext } from "../context/OrganizationContext";

export function LeaveOrganizationDialog() {
  const [isPending, startTransition] = useTransition();
  const { currentOrganization } = useOrganizationContext();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="group hover:!bg-destructive cursor-pointer [&,&_*]:transition-colors [&,&_*]:duration-200"
          onSelect={(e) => e.preventDefault()}
        >
          <IconDoorExit className="size-6 text-black group-hover:text-white" />
          <p className="text-lg group-hover:text-white">Leave organization</p>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            This action will transfer all your documents in this organization to
            the organization owner and revoke all your permissions
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="cursor-pointer text-lg"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-destructive/80 hover:bg-destructive cursor-pointer border text-lg"
            onClick={() => {
              startTransition(async () => {
                const toastId = toast.loading("Processing");
                const result = await leaveOrganization(currentOrganization.id!);
                toast.dismiss(toastId);

                if (!result?.success) {
                  toast.error(result.cause);
                } else {
                  reloadWithToast(
                    "org-toast",
                    "Successfully left the organization",
                  );
                }
              });
            }}
          >
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
