import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { NameInput } from "../file-name/NameInput";
import { MenuOptions } from "./navigation/MenuOptions";
import { Toolbar } from "./Toolbar";

export function Topbar({
  documentTitle,
  authButton,
}: {
  documentTitle: string;
  authButton: ReactNode;
}) {
  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 bg-gray-100 p-5 pt-2 shadow-sm print:hidden">
      <div className="flex items-center justify-between pr-5">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="/logo.svg" width={50} height={50} alt="Logo" />
          </Link>
          <div className="space-y-1">
            <NameInput documentTitle={documentTitle} />
            <MenuOptions />
          </div>
        </div>
        {authButton}
      </div>
      <Toolbar />
    </div>
  );
}
