import { KindeUserButton } from "@/auth/components/KindeUserButton";
import { OrgSwitcher } from "@/features/organization-switcher/OrgSwitcher";
import Image from "next/image";
import { Suspense } from "react";
import { Search } from "./components/Search";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-around bg-white p-4">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" height={50} width={50} alt="Logo" />
        <p className="text-muted-foreground text-2xl font-semibold">SyncEdit</p>
      </div>
      <Suspense
        fallback={
          <div className="w-3xs animate-pulse rounded-full bg-gray-300 p-4 lg:w-xl">
            <p className="invisible">k</p>
          </div>
        }
      >
        <Search />
      </Suspense>
      <div className="flex items-center gap-3">
        <Suspense fallback={<p>Loading.....</p>}>
          <OrgSwitcher />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-[50px] w-[50px] animate-pulse rounded-full" />
          }
        >
          <KindeUserButton />
        </Suspense>
      </div>
    </nav>
  );
}
