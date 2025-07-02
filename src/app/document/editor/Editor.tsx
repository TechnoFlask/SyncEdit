"use client";

import { useEditorConfig } from "@/app/document/editor/EditorConfig";
import { MenuBar } from "@/app/document/editor/MenuBar";
import { EditorContent } from "@tiptap/react";

export function Editor() {
  const editor = useEditorConfig();

  return (
    <div className="flex size-full flex-col gap-8 overflow-x-auto pb-20 print:overflow-visible print:p-0">
      <div className="sticky top-0 z-10 flex bg-gray-100 px-5 py-10 shadow-sm">
        <MenuBar/>
      </div>
      <EditorContent
        className="mx-auto min-h-screen w-5xl min-w-max px-8 print:w-full print:min-w-0"
        editor={editor}
      />
    </div>
  );
}
