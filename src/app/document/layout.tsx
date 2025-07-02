import EditorContextProvider from "@/app/document/editor/EditorContext";
import { ReactNode } from "react";

export default function DocumentLayout({ children }: { children: ReactNode }) {
  return (
    <EditorContextProvider>
    </EditorContextProvider>
  );
}
