"use client";

import { Hover } from "@/components/custom/Hover";
import { toast } from "@/components/custom/toast";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { IconCopy, IconExternalLink, IconLinkMinus } from "@tabler/icons-react";
import { BubbleMenu } from "@tiptap/react";
import "tippy.js/animations/scale-extreme.css";

export function LinkBubbleMenu() {
  const { editor } = useEditorContext();
  const linkHref = editor?.getAttributes("link")!.href as string;

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive("link")}
      tippyOptions={{
        animation: "scale-extreme",
        placement: "bottom-start",
        onMount(instance) {
          instance.popper.style.opacity = "0";
          instance.popper.style.pointerEvents = "none";
        },
        onShow(instance) {
          setTimeout(() => {
            instance.popper.style.opacity = "1";
            instance.popper.style.transition = "opacity 100ms";
            instance.popper.style.pointerEvents = "auto";
            instance.setProps({ interactive: true });
          }, 300);
        },
      }}
    >
      <div className="link-bubble-menu border-muted-foreground/30 flex items-center gap-3 rounded-md border bg-white p-4 shadow-md">
        <p className="truncate text-xl">{linkHref}</p>
        <Hover
          trigger={
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              <IconExternalLink className="text-blue-600" />
            </a>
          }
          content={"Go to link"}
        />
        <Hover
          trigger={
            <IconCopy
              className="cursor-pointer"
              onClick={async () => {
                await navigator.clipboard.writeText(linkHref);
                toast.success("Link copied to clipboard");
              }}
            />
          }
          content={"Copy link"}
        />
        <Hover
          trigger={
            <IconLinkMinus
              className="cursor-pointer text-red-500"
              onClick={() => editor?.commands.unsetLink()}
            />
          }
          content={"Remove link"}
        />
      </div>
    </BubbleMenu>
  );
}
