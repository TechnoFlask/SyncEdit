import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { ReactNode } from "react";

export function KindeAuthProvider({ children }: { children: ReactNode }) {
  return <KindeProvider>{children}</KindeProvider>;
}
