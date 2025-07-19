import Image from "next/image";
import { Search } from "./components/Search";

export function Navbar() {
  return (
    <nav className="flex items-center justify-around bg-white p-4">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" height={50} width={50} alt="Logo" />
        <p className="text-muted-foreground text-2xl font-semibold">SyncEdit</p>
      </div>
      <Search />
      <div />
    </nav>
  );
}
