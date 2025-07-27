import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconUserPlus } from "@tabler/icons-react";

export function InviteMember() {
  return (
    <DropdownMenuItem>
      <IconUserPlus className="size-6 text-black" />
      <p className="text-lg">Invite member</p>
    </DropdownMenuItem>
  );
}
