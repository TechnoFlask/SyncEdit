import { ConvexKindeProvider } from "@/auth/convex-kinde/ConvexKindeProvider";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationContextProvider } from "@/features/organization-switcher/context/OrganizationContextProvider";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import { FontLoadedBody } from "./FontLoadedBody";
import "./globals.css";

export const metadata: Metadata = {
  title: "SyncEdit",
  description: "Collaborative text editor with rich formatting",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
          async
        /> */}
      </head>
      <FontLoadedBody>
        <ConvexKindeProvider>
          <NuqsAdapter>
            <OrganizationContextProvider>
              {children}
            </OrganizationContextProvider>
          </NuqsAdapter>
        </ConvexKindeProvider>
        <Toaster
          toastOptions={{
            classNames: {
              loading: "!text-lg",
              content: "!text-lg",
            },
          }}
          richColors
          closeButton
        />
      </FontLoadedBody>
    </html>
  );
}
