"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

export function NameInput() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${Math.max(100, spanWidth + 20)}px`;
    }
  }, [value]);

  return (
    <>
      <Input
        ref={inputRef}
        className="truncate !text-xl transition-all duration-200 not-focus:border-none not-focus:shadow-none hover:shadow-sm focus-visible:ring-0"
        placeholder="Untitled Document"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          e.target.setSelectionRange(0, 0);
        }}
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
