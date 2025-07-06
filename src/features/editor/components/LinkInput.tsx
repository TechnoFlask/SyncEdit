"use client";

import { Hover } from "@/components/custom/Hover";
import { toast } from "@/components/custom/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn, isValidLink } from "@/lib/utils";
import { IconLink } from "@tabler/icons-react";
import { useCallback, useState } from "react";

export function LinkInput() {
  const { editor } = useEditorContext();
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const isLink = editor?.isActive("link");

  const cleanInputs = useCallback(() => {
    setContent("");
    setUrl("");
  }, []);

  const getTextUnderSelection = useCallback(() => {
    const { from, to } = editor?.state.selection!;
    return editor?.state.doc.textBetween(from, to) ?? "";
  }, [editor]);

  const extractSelection = useCallback(() => {
    const urlUnderCursor = editor?.getAttributes("link").href ?? "";
    editor?.commands.extendMarkRange("link");

    const contentUnderSelection = getTextUnderSelection();

    setContent(contentUnderSelection);
    setUrl(urlUnderCursor);
  }, [editor]);

  const createLinkNode = useCallback(
    (content: string, url: string) => {
      if (!isValidLink(url)) {
        toast.error("Invalid Link. Allowed: http/https");
        return;
      }

      editor
        ?.chain()
        .deleteSelection()
        .insertContent([
          {
            type: "text",
            text: content,
            marks: [
              {
                type: "link",
                attrs: {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            ],
          },
          {
            type: "text",
            text: " ",
          },
        ])
        .run();
      toast.success("Link generated successfully");
    },
    [editor],
  );

  return (
    <Popover
      onOpenChange={() => {
        cleanInputs();
        extractSelection();
      }}
    >
      <Hover
        trigger={
          <PopoverTrigger asChild>
            <button
              className={cn(
                "cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-gray-300 focus:outline-none",
                {
                  "bg-gray-300": isLink,
                },
              )}
            >
              <IconLink />
            </button>
          </PopoverTrigger>
        }
        content={"Add link"}
      />
      <PopoverContent align="start" className="w-xs space-y-4 p-8">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Link name"
          className="!text-lg"
        />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") createLinkNode(content, url);
          }}
          placeholder="Type or paste a link"
          className="!text-lg"
        />
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            className="text-lg"
            onClick={() => {
              createLinkNode(content, url);
            }}
          >
            Add link
          </Button>
          <Button
            disabled={!isLink}
            variant="secondary"
            className="not-disabled:hover:bg-destructive/60 text-lg not-disabled:hover:text-white"
            onClick={() => editor?.commands.unsetLink()}
          >
            Remove link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
