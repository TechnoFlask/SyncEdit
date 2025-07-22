"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { IconUserPlus } from "@tabler/icons-react";

export function KindeSignUp() {
  return (
    <RegisterLink className="flex items-center gap-2">
      <IconUserPlus className="!size-6 !text-black transition-all duration-200" />
      <button className="text-lg transition-all duration-200">Sign up</button>
    </RegisterLink>
  );
}
