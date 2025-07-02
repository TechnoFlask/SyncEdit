import { FONTS } from "@/app/FontList";
import { IBM_Plex_Sans } from "next/font/google";
import { ComponentProps } from "react";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
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
      className={`${className} ${fontFamilyVariables} ${ibmPlexSans.variable} ${ibmPlexSans.className} antialiased`}
      {...props}
    >
      {children}
    </body>
  );
}
