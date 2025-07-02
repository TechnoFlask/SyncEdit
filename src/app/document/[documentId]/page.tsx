import Editor from "@/app/document/editor/EditorWrapper";
import { Suspense } from "react";

export default function DocumentPage() {
  return (
    <Suspense fallback={<span>Loading.....</span>}>
      <div className="min-h-screen bg-gray-100">
        <Editor />
      </div>
    </Suspense>
  );
}
