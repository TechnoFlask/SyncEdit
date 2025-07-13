"use client";

import { Input } from "@/components/ui/input";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function TableGrid() {
  const { editor } = useEditorContext();
  const [hoveredCell, setHoveredCell] = useState<[number, number]>([0, 0]);

  useEffect(
    () => () => {
      setHoveredCell([0, 0]);
    },
    [],
  );

  return (
    <div className="space-y-3 p-3">
      <div
        className="grid grid-cols-8 gap-1"
        onMouseLeave={() => setHoveredCell([0, 0])}
      >
        {Array.from({ length: 8 }).map((v, i) =>
          Array.from({ length: 8 }).map((v, j) => (
            <div
              key={`${i} - ${j}`}
              className={cn(
                "border-muted-foreground/20 h-4 w-4 rounded-xs border bg-gray-100",
                {
                  "bg-gray-300": i <= hoveredCell[0] && j <= hoveredCell[1],
                },
              )}
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .insertTable({
                    rows: i + 1,
                    cols: j + 1,
                  })
                  .run()
              }
              onMouseEnter={() => {
                setHoveredCell([i, j]);
              }}
            />
          )),
        )}
      </div>
      <div className="flex items-center justify-center gap-1">
        <Input
          className="w-[5ch] text-center"
          value={hoveredCell[0] + 1}
          onBeforeInput={(e) => {
            if (!/^\d*$/.test(e.data ?? "")) {
              e.preventDefault();
            }
          }}
          onChange={(e) =>
            setHoveredCell((prev) => [
              parseInt(e.target.value || "1") - 1,
              prev[1],
            ])
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            editor
              ?.chain()
              .focus()
              .insertTable({
                rows: hoveredCell[0] + 1,
                cols: hoveredCell[1] + 1,
              })
              .run()
          }
        />
        <IconX />
        <Input
          className="w-[5ch] text-center"
          value={hoveredCell[1] + 1}
          onBeforeInput={(e) => {
            if (!/^\d*$/.test(e.data ?? "")) {
              e.preventDefault();
            }
          }}
          onChange={(e) =>
            setHoveredCell((prev) => [
              prev[0],
              parseInt(e.target.value || "1") - 1,
            ])
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            editor
              ?.chain()
              .focus()
              .insertTable({
                rows: hoveredCell[0] + 1,
                cols: hoveredCell[1] + 1,
              })
              .run()
          }
        />
      </div>
    </div>
  );
}
