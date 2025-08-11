"use client";

import { ReactNode } from "react";

export function BaseEditor({
  topbar,
  editor,
}: {
  topbar: ReactNode;
  editor: ReactNode;
}) {
  return (
    <div className="flex size-full flex-col gap-8 pb-20 print:p-0">
      {topbar}
      {editor}
    </div>
  );
}
