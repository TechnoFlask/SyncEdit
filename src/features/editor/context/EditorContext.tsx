"use client";

import { type Editor } from "@tiptap/react";
import { createContext, ReactNode, useContext, useState } from "react";

type EditorContextType = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export default function EditorContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const editorContext = useContext(EditorContext);
  if (editorContext == undefined)
    throw new Error(
      "useEditorContext must be used within an EditorContextProvider",
    );
  return editorContext;
}
