"use client";

import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { KindeAuthProvider } from "./KindeAuthProvider";
import { useAuthFromKinde } from "./useAuthFromKinde";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexKindeProvider({ children }: { children: ReactNode }) {
  return (
    <KindeAuthProvider>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromKinde}>
        {children}
      </ConvexProviderWithAuth>
    </KindeAuthProvider>
  );
}
