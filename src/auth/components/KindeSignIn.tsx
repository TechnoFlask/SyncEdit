"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { IconLogin2 } from "@tabler/icons-react";

export function KindeSignIn() {
  return (
    <LoginLink className="flex items-center gap-2">
      <IconLogin2 className="!size-6 !text-black transition-all duration-200" />
      <button className="text-lg transition-all duration-200">Sign in</button>
    </LoginLink>
  );
}
