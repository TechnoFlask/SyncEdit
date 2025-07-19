import { Toaster } from "@/components/ui/sonner";
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
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </FontLoadedBody>
    </html>
  );
}
