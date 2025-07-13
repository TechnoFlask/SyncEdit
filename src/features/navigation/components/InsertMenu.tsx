"use client";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  IconLinkPlus,
  IconPhotoPlus,
  IconTablePlus,
} from "@tabler/icons-react";
import { TableGrid } from "./TableGrid";

export function InsertMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
        Insert
      </MenubarTrigger>
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg">
        <MenubarItem className="flex gap-2">
          {/*            TODO*/}
          <IconLinkPlus className="size-6 text-black" />
          Link
        </MenubarItem>
        <MenubarItem className="flex gap-2">
          {/*            TODO*/}
          <IconPhotoPlus className="size-6 text-black" />
          Image
        </MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger className="flex gap-2">
            <IconTablePlus className="size-6 text-black" />
            Table
          </MenubarSubTrigger>
          <MenubarSubContent>
            <TableGrid />
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  );
}
