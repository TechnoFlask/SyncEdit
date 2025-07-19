import { FONTS } from "@/app/FontList";
import { cn } from "@/lib/utils";
import { IBM_Plex_Sans, Nunito } from "next/font/google";
import { ComponentProps } from "react";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
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
      className={cn(
        "antialiased",
        className,
        fontFamilyVariables,
        nunito.className,
        ibmPlexSans.variable,
      )}
      {...props}
    >
      {children}
    </body>
  );
}
