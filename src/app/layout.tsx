import { Toaster } from "@/components/ui/sonner";
import { ConvexKindeProvider } from "@/convex-kinde/ConvexKindeProvider";
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
          <NuqsAdapter>{children}</NuqsAdapter>
        </ConvexKindeProvider>
        <Toaster />
      </FontLoadedBody>
    </html>
  );
}
