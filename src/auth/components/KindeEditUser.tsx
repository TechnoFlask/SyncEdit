"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { api } from "@convex/_generated/api";
import { userSchema } from "@convex/schema";
import { IconEdit } from "@tabler/icons-react";
import { useQuery } from "convex/react";
import { FormEvent, useCallback, useTransition } from "react";
import { toast } from "sonner";
import { editUser } from "../actions/editUser";

export function KindeEditUser() {
  const [isPending, startTransition] = useTransition();
  const currentUser = useQuery(api.users.queries.getCurrentUser);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement),
    );

    const parseResult = userSchema
      .pick({
        firstName: true,
        lastName: true,
        userName: true,
      })
      .safeParse(formData);

    if (!parseResult.success) {
      parseResult.error.errors.forEach((e) => toast.error(e.message));
      return;
    }

    startTransition(async () => {
      const toastId = toast.loading("Processing");
      const result = await editUser(parseResult.data);
      toast.dismiss(toastId);

      if (!result.success) {
        toast.error(result.cause);
      } else {
        toast.success("Successfully updated user data");
      }
    });
  }, []);

  if (!currentUser || !currentUser.success) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="cursor-pointer transition-all duration-200"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-2">
            <IconEdit className="size-6 text-black" />
            <button className="text-lg transition-all duration-200">
              Edit profile
            </button>
          </div>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">New profile details</DialogTitle>
          <DialogDescription className="text-lg">
            Enter new details to update your profile
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            defaultValue={currentUser.value.firstName ?? ""}
            name="firstName"
            className="not-focus:text-lg placeholder:text-lg focus:text-lg"
            placeholder="First name"
            required
          />
          <Input
            defaultValue={currentUser.value.lastName ?? ""}
            name="lastName"
            className="not-focus:text-lg placeholder:text-lg focus:text-lg"
            placeholder="Last name"
            required
          />
          <Input
            defaultValue={currentUser.value.userName ?? ""}
            name="userName"
            className="not-focus:text-lg placeholder:text-lg focus:text-lg"
            placeholder="User name"
            required
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="reset"
                variant="secondary"
                className="text-lg"
                disabled={isPending}
              >
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="secondary"
                className="text-lg"
                disabled={isPending}
              >
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
