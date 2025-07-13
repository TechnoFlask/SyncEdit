"use client";

import { Input } from "@/components/ui/input";

export function NameInput() {
  return (
    <Input
      className="w-[16.5ch] truncate !text-xl"
      placeholder="Untitled Document"
      onBlur={(e) => {
        e.target.setSelectionRange(0, 0);
      }}
    />
  );
}
