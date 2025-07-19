import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { isValidElement, ReactNode } from "react";

export function Hover({
  trigger,
  content,
  className,
}: {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger
        asChild={isValidElement(trigger) && trigger.type === "a"}
      >
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent
        className={cn("z-[999999] flex w-fit items-center gap-3", className)}
      >
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}
