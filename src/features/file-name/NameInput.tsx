"use client";

import { Input } from "@/components/ui/input";
import { useDocumentRename } from "@/hooks/useDocumentRename";
import { Id } from "@convex/_generated/dataModel";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function NameInput({ documentTitle }: { documentTitle: string }) {
  const pathName = usePathname();
  const documentId = pathName.replace("/document/", "");

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  // To synchronize between convex state and input state
  useEffect(() => {
    setValue(documentTitle);
  }, [documentTitle]);

  // To synchronize input state and input length
  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${Math.max(100, spanWidth + 20)}px`;
    }
  }, [value]);

  const { isRenaming, handleDocumentRenaming } = useDocumentRename();

  return (
    <>
      <Input
        ref={inputRef}
        disabled={isRenaming}
        className="truncate !text-xl transition-all duration-200 not-focus:border-none not-focus:shadow-none hover:shadow-sm focus-visible:ring-0"
        placeholder="Untitled Document"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
          }
        }}
        onBlur={() =>
          handleDocumentRenaming(
            documentId as Id<"documents">,
            value,
            documentTitle,
          )
        }
        style={{ width: "100px" }}
      />
      <span
        ref={spanRef}
        className="invisible absolute px-2 font-sans text-xl whitespace-pre"
        style={{
          fontFamily: "inherit",
          fontWeight: "inherit",
        }}
      >
        {value || "Untitled Document"}
      </span>
    </>
  );
}
