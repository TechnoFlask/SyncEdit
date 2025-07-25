import { toast } from "@/components/custom/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { api } from "@convex/_generated/api";
import { organizationSchema } from "@convex/schema";
import { IconPlus } from "@tabler/icons-react";
import { useMutation } from "convex/react";
import { useCallback, useRef, useState } from "react";

export function AddOrganizationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const createOrganizationMutation = useMutation(
    api.organizations.mutations.createOrganization,
  );
  const [isCreating, setIsCreating] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleOrganizationCreation = useCallback(
    async (name: string) => {
      const parseResult = organizationSchema.shape.name.safeParse(name);
      if (!parseResult.success) {
        parseResult.error.errors.forEach((e) => toast.warning(e.message));
        return;
      }

      setIsCreating(true);

      try {
        const createOrganizationResult = await createOrganizationMutation({
          name: name.trim(),
        });

        if (createOrganizationResult.success)
          toast.success("Organization created");
        else toast.error(createOrganizationResult.cause);
      } finally {
        setIsCreating(false);
      }
    },
    [createOrganizationMutation],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="gap-2 transition-all duration-200"
        >
          <IconPlus className="size-6 text-black" />
          <p className="text-lg">New organization</p>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl">Create organization</DialogTitle>
        <DialogDescription className="text-lg">
          Enter name for the new organization
        </DialogDescription>
        <Input
          autoFocus
          ref={nameInputRef}
          minLength={5}
          placeholder="Organization name"
          className="not-focus:text-lg placeholder:text-lg focus:text-lg"
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOrganizationCreation(nameInputRef.current!.value);
              setIsOpen(false);
            }
          }}
        />
        <DialogFooter>
          <DialogClose
            className="cursor-pointer text-base"
            asChild
            disabled={isCreating}
          >
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="text-base hover:bg-green-500 hover:text-white"
              type="submit"
              variant="secondary"
              onClick={() =>
                handleOrganizationCreation(nameInputRef.current!.value)
              }
              disabled={isCreating}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
