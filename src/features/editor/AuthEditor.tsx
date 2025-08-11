"use client";

import { Doc } from "@convex/_generated/dataModel";
import { permissionSchema } from "@convex/schema";
import { FloatingToolbar } from "@liveblocks/react-tiptap";
import { EditorContent } from "@tiptap/react";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { BaseEditor } from "./BaseEditor";
import { LinkBubbleMenu } from "./components/LinkBubbleMenu";
import { SlashProvider } from "./extensions/slash/SlashProvider";
import { useAuthEditorConfig } from "./hooks/useAuthEditorConfig";
import { Topbar } from "./Topbar";

export function AuthEditor({
  document,
  authButton,
}: {
  document: Doc<"documents"> & {
    access: z.infer<typeof permissionSchema.shape.accessLevel>;
  };
  authButton: ReactNode;
}) {
  const authEditor = useAuthEditorConfig(document);

  useEffect(() => {
    toast.info(`Your access has been modified to ${document.access}`);
    authEditor?.setEditable(document.access === "edit");
  }, [authEditor, document.access]);

  return (
    <BaseEditor
      topbar={<Topbar authButton={authButton} documentTitle={document.title} />}
      editor={
        <>
          {authEditor && <LinkBubbleMenu />}
          <SlashProvider editor={authEditor}>
            <EditorContent
              className="mx-auto min-h-screen w-5xl min-w-max overflow-x-auto px-8 print:w-full print:min-w-0 print:overflow-visible"
              editor={authEditor}
            />
            <FloatingToolbar editor={authEditor} />
          </SlashProvider>
        </>
      }
    />
  );
}
