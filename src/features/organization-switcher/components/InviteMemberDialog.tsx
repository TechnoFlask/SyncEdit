import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { IconUserPlus, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { generateInviteLink } from "../actions/generateInviteLink";
import { useOrganizationContext } from "../context/OrganizationContext";
import { useAllowedEmails } from "../hooks/useAllowedEmails";

export function InviteMemberDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mails, addMail, removeMail } = useAllowedEmails();
  const { currentOrganization } = useOrganizationContext();
  const [inviteLink, setInviteLink] = useState("");
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) setInviteLink("");
  }, [isOpen]);

  const handleGenerateLink = useCallback(async () => {
    const linkGenerationResult = await generateInviteLink(
      mails,
      currentOrganization.id!,
    );

    if (!linkGenerationResult.success) {
      toast.error(linkGenerationResult.cause);
      return;
    }

    setInviteLink(
      (process.env.NEXT_PUBLIC_PROD_URL
        ? `https://${process.env.NEXT_PUBLIC_PROD_URL}`
        : "http://localhost:3000") +
        `/api/organization/invite/${linkGenerationResult.value}`,
    );
  }, [currentOrganization, mails]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="focus-visible:outline-none">
        <DropdownMenuItem
          className="cursor-pointer transition-colors duration-200"
          onSelect={(e) => e.preventDefault()}
        >
          <IconUserPlus className="size-6 text-black" />
          <p className="text-lg">Invite member</p>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            Invite members to organization
          </DialogTitle>
          <DialogDescription className="text-lg">
            Enter the email addresses of members to be invited
          </DialogDescription>
        </DialogHeader>
        {inviteLink.length > 0 && (
          <div className="flex items-center justify-between gap-2 rounded-full shadow-sm inset-shadow-sm">
            <p className="bg-accent/70 rounded-l-full px-4 py-2 text-lg">
              Invite link
            </p>
            <p className="w-3xs truncate bg-white text-lg">{inviteLink}</p>
            <div
              className="bg-accent/70 hover:bg-accent w-fit cursor-pointer rounded-r-full px-4 py-2 text-lg"
              onClick={async () => {
                await navigator.clipboard.writeText(inviteLink);
                toast.success("Copied to clipboard");
              }}
            >
              Copy
            </div>
          </div>
        )}
        {mails.length > 0 && (
          <div className="space-y-2">
            <p className="text-lg">Invited Members</p>
            <div className="flex max-h-28 flex-wrap gap-2 overflow-y-scroll pb-2">
              {mails.map((ae) => (
                <p
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-lg shadow-sm inset-shadow-sm"
                  key={ae}
                >
                  {ae}
                  <IconX onMouseDown={() => removeMail(ae)} />
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            className="not-focus:text-lg placeholder:text-lg focus:text-lg"
            type="email"
            placeholder="Enter invitee email"
            required
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addMail((e.target as HTMLInputElement).value.toLowerCase());
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <Button
            className="text-lg"
            variant="secondary"
            onClick={() => {
              addMail(inputRef.current?.value.toLowerCase() ?? "");
              inputRef.current!.value = "";
            }}
          >
            Add
          </Button>
        </div>
        <DialogFooter>
          <Button
            className="text-lg"
            variant="secondary"
            disabled={isPending}
            onClick={() => {
              if (mails.length === 0) {
                toast.warning("Enter at least one invitee");
                return;
              }
              startTransition(async () => {
                const toastId = toast.loading("Generating link");
                await handleGenerateLink();
                toast.dismiss(toastId);

                toast.success("Generated invited link successfully");
              });
            }}
          >
            Generate link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
