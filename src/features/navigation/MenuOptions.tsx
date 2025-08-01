import { Menubar } from "@/components/ui/menubar";
import { EditMenu } from "./components/EditMenu";
import { FileMenu } from "./components/FileMenu";
import { FormatMenu } from "./components/FormatMenu";
import { InsertMenu } from "./components/InsertMenu";
import { TableOptions } from "./components/TableOptions";

export function MenuOptions() {
  return (
    <Menubar className="border-none bg-gray-100 shadow-none">
      <FileMenu />
      <EditMenu />
      <InsertMenu />
      <FormatMenu />
      <TableOptions />
      {/*       <EditMenu />
      <InsertMenu />
      <FormatMenu /> */}
    </Menubar>
  );
}
