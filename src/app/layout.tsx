import type { Metadata } from "next";
import { Archivo, Roboto, Roboto_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const archivoSans = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
});

const robotoSans = Roboto({
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyncEdit",
  description: "Collaborative text editor with rich formatting",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.className} ${archivoSans.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
