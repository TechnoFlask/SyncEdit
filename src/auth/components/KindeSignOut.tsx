"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { IconLogout } from "@tabler/icons-react";

export function KindeSignOut() {
  return (
    <LogoutLink className="flex items-center gap-2">
      <IconLogout className="!size-6 !text-black transition-all duration-200" />
      <button className="text-lg transition-all duration-200">Sign out</button>
    </LogoutLink>
  );
}
