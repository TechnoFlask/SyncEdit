import { IconLoader } from "@tabler/icons-react";

export function LoadingScreen() {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="flex items-center gap-3">
        <IconLoader className="size-10 animate-spin" />
        <div className="flex gap-2 text-3xl font-medium">
          Loading document
          <div className="flex">
            <span className="animate-bounce [animation-delay:0s]">.</span>
            <span className="animate-bounce [animation-delay:0.2s]">.</span>
            <span className="animate-bounce [animation-delay:0.4s]">.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
