import { FONTS } from "@/app/FontList";
import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ComponentProps } from "react";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const googleSans = localFont({
  src: "./local-fonts/Product-Sans-Font/Product Sans Regular.ttf",
  variable: "--font-google-sans",
});

export function FontLoadedBody({
  children,
  className,
  ...props
}: ComponentProps<"body">) {
  const fontFamilyVariables = FONTS[1]
    .map(({ fontFace }) => fontFace.variable)
    .join(" ");
  return (
    <body
      className={`${className} ${fontFamilyVariables} ${ibmPlexSans.variable} ${googleSans.className} ${googleSans.variable} antialiased`}
      {...props}
    >
      {children}
    </body>
  );
}
