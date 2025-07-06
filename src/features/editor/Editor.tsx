"use client";

import { LinkBubbleMenu } from "@/features/editor/components/LinkBubbleMenu";
import { useEditorConfig } from "@/features/editor/hooks/useEditorConfig";
import { MenuBar } from "@/features/editor/MenuBar";
import { EditorContent } from "@tiptap/react";

export function Editor() {
  const editor = useEditorConfig();

  return (
    <div className="flex size-full flex-col gap-8 pb-20 print:p-0">
      <div className="sticky top-0 z-10 flex bg-gray-100 px-5 py-10 shadow-sm">
        <MenuBar />
      </div>
      {editor && <LinkBubbleMenu />}
      <EditorContent
        className="mx-auto min-h-screen w-5xl min-w-max overflow-x-auto px-8 print:w-full print:min-w-0 print:overflow-visible"
        editor={editor}
      />
    </div>
  );
}
