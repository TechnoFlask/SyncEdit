import { KindeSignOut } from "@/auth/components/KindeSignOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export async function KindeUserButton() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return <div />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Image
          width={50}
          height={50}
          src={user?.picture ?? ""}
          alt={user?.given_name ?? "" + user?.family_name ?? ""}
          className="cursor-pointer rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className="hover:!bg-destructive transition-all duration-200 hover:[&_*]:!text-white">
          <KindeSignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
