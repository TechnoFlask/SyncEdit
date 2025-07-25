"use client";

import { ReactNode, useState } from "react";
import { OrganizationContext, OrganizationType } from "./OrganizationContext";

export function OrganizationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentOrganization, setCurrentOrganization] =
    useState<OrganizationType>({
      name: "Default",
    });

  return (
    <OrganizationContext.Provider
      value={{ currentOrganization, setCurrentOrganization }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
