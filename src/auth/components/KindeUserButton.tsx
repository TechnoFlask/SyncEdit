import { KindeSignOut } from "@/auth/components/KindeSignOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { KindeEditUser } from "./KindeEditUser";
import { KindeSignIn } from "./KindeSignIn";
import { KindeSignUp } from "./KindeSignUp";

export async function KindeUserButton() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none">
          <div className="grid size-[50px] cursor-pointer place-items-center rounded-full transition-colors duration-200 hover:bg-gray-200">
            <IconUser className="size-7" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <KindeSignIn />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KindeSignUp />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

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
        <KindeEditUser />
        <DropdownMenuItem className="hover:!bg-destructive cursor-pointer transition-all duration-200 hover:[&_*]:!text-white">
          <KindeSignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
