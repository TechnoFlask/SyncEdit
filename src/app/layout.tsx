import type { Metadata } from "next";
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
      <FontLoadedBody>{children}</FontLoadedBody>
    </html>
  );
}
