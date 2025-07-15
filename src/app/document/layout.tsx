import ColorContextProvider from "@/features/editor/context/ColorContext";
import EditorContextProvider from "@/features/editor/context/EditorContext";
import { ReactNode } from "react";

export default function DocumentLayout({ children }: { children: ReactNode }) {
  return (
    <EditorContextProvider>
      <ColorContextProvider>{children}</ColorContextProvider>
    </EditorContextProvider>
  );
}
