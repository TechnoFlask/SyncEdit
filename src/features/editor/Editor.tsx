"use client";

import { LinkBubbleMenu } from "@/features/editor/components/LinkBubbleMenu";
import { useEditorConfig } from "@/features/editor/hooks/useEditorConfig";
import { Toolbar } from "@/features/editor/Toolbar";
import { Doc } from "@convex/_generated/dataModel";
import { permissionSchema } from "@convex/schema";
import { EditorContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { NameInput } from "../file-name/NameInput";
import { MenuOptions } from "./navigation/MenuOptions";

export function Editor({
  document,
}: {
  document?: Doc<"documents"> & {
    access: z.infer<typeof permissionSchema.shape.accessLevel>;
  };
}) {
  const editor = useEditorConfig(
    document == null || document?.access === "edit",
    document?.content,
  );
  return (
    <div className="flex size-full flex-col gap-8 pb-20 print:p-0">
      <div className="sticky top-0 z-10 flex flex-col gap-3 bg-gray-100 p-5 pt-2 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="/logo.svg" width={50} height={50} alt="Logo" />
          </Link>
          <div className="space-y-1">
            <NameInput documentTitle={document?.title ?? ""} />
            <MenuOptions />
          </div>
        </div>
        <Toolbar />
      </div>
      {editor && <LinkBubbleMenu />}
      <EditorContent
        className="mx-auto min-h-screen w-5xl min-w-max overflow-x-auto px-8 print:w-full print:min-w-0 print:overflow-visible"
        editor={editor}
      />
    </div>
  );
}
