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
import { cn, getUserName } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { IconTrash, IconUser } from "@tabler/icons-react";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { kickoutMember } from "../actions/kickoutMember";
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
  const currentUser = useQuery(api.users.queries.getCurrentUser);
  const [isPending, startTransition] = useTransition();

  if (!organizationMembers?.success) return null;

  return (
    <>
      {organizationMembers.value.map((om) => (
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="group flex items-center"
          key={om._id}
        >
          {om.image ? (
            <Image src={om.image} width={30} height={30} alt="Avatar" />
          ) : (
            <IconUser className="size-6 text-black" />
          )}
          <div className="flex grow items-center gap-2">
            <p className="flex justify-between gap-5 text-lg">
              {getUserName(om)}
              {currentUser?.success &&
                currentOrganization.ownerId === currentUser.value._id && (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <IconTrash
                        className={cn(
                          "text-destructive !pointer-events-auto size-6 cursor-pointer opacity-0 transition-all duration-200 group-hover:opacity-100",
                          {
                            "pointer-events-none": isPending,
                          },
                        )}
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl">
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-lg">
                          This action will remove the member from the
                          organization and revoke all their permissions. The
                          documents of the user will be transferred to you
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
                              const result = await kickoutMember(
                                currentOrganization.id!,
                                om._id,
                              );
                              toast.dismiss(toastId);

                              if (!result.success) {
                                toast.error(result.cause);
                              } else {
                                toast.success("Successfully removed member");
                              }
                            });
                          }}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
            </p>
            {currentOrganization.ownerId === om._id && (
              <span className="text-muted-foreground">(owner)</span>
            )}
          </div>
        </DropdownMenuItem>
      ))}
    </>
  );
}
