"use client";

import { EditorContent } from "@tiptap/react";
import { ReactNode } from "react";
import { BaseEditor } from "./BaseEditor";
import { Topbar } from "./Topbar";
import { LinkBubbleMenu } from "./components/LinkBubbleMenu";
import { SlashProvider } from "./extensions/slash/SlashProvider";
import { useGuestEditorConfig } from "./hooks/useGuestEditorConfig";

export function GuestEditor({ authButton }: { authButton: ReactNode }) {
  const guestEditor = useGuestEditorConfig();

  return (
    <BaseEditor
      topbar={<Topbar authButton={authButton} documentTitle="" />}
      editor={
        <>
          {guestEditor && <LinkBubbleMenu />}
          <SlashProvider editor={guestEditor}>
            <EditorContent
              className="mx-auto min-h-screen w-5xl min-w-max overflow-x-auto px-8 print:w-full print:min-w-0 print:overflow-visible"
              editor={guestEditor}
            />
          </SlashProvider>
        </>
      }
    />
  );
}
