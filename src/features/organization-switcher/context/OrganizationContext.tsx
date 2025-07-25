import { Id } from "@convex/_generated/dataModel";
import { createContext, useContext } from "react";

export type OrganizationType = {
  id?: Id<"organizations">;
  name: string;
  image?: string;
};

type OrganizationContextType = {
  currentOrganization: OrganizationType;
  setCurrentOrganization: (org: OrganizationType) => void;
};

export const OrganizationContext =
  createContext<OrganizationContextType | null>(null);

export function useOrganizationContext() {
  const ctx = useContext(OrganizationContext);

  if (ctx == null)
    throw new Error(
      "useOrganizationContext must be used within an OrganizationContext",
    );

  return ctx;
}
