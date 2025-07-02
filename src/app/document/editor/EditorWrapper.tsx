"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@/app/document/editor/Editor").then((mod) => mod.Editor),
  { ssr: false },
);

export default function EditorWrapper() {
  return <Editor />;
}
