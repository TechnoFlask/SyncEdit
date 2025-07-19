"use client";

import { cn } from "@/lib/utils";
import { IconSearch, IconX } from "@tabler/icons-react";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useState } from "react";
export function Search() {
  const [value, setValue] = useState("");
  const setSearchQuery = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  )[1];

  const handleSubmit = useCallback(() => {
    setSearchQuery(value);
    setValue("");
  }, [value, setSearchQuery]);

  const handleClear = useCallback(() => {
    setValue("");
    setSearchQuery("");
  }, [setSearchQuery]);

  return (
    <form
      className="flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2 transition-colors duration-200 [&:has(input:focus)]:bg-white [&:has(input:focus)]:shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <button
        className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-gray-200"
        type="submit"
      >
        <IconSearch />
      </button>
      <input
        className="w-3xs text-xl placeholder:text-xl focus-visible:outline-none lg:w-xl"
        name="search"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className={cn(
          "cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-gray-200",
          {
            invisible: !value,
          },
        )}
        onMouseDown={handleClear}
      >
        <IconX />
      </div>
    </form>
  );
}
