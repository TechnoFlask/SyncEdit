import { useEditorConfig } from "@/app/document/editor/EditorConfig";
import { EditorContent } from "@tiptap/react";

export function Editor() {
  const editor = useEditorConfig();

  return (
    <div className="flex size-full flex-col overflow-x-auto p-6 print:overflow-visible print:p-0">
      <div className="grow">
        <EditorContent
          className="mx-auto h-full max-w-5xl min-w-max print:w-full print:min-w-0"
          editor={editor}
        />
      </div>
    </div>
  );
}
