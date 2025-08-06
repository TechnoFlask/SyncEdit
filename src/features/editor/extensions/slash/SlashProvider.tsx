import { SlashCmd, SlashCmdProvider } from "@harshtalks/slash-tiptap";
import { Editor } from "@tiptap/core";
import { ReactNode } from "react";
import { suggestions } from "./suggestions";

export function SlashProvider({
  children,
  editor,
}: {
  children: ReactNode;
  editor: Editor | null;
}) {
  return (
    <SlashCmdProvider>
      {children}
      <SlashCmd.Root editor={editor}>
        <SlashCmd.Cmd>
          <SlashCmd.Empty>No commands available</SlashCmd.Empty>
          <SlashCmd.List className="bg-white p-1 shadow-sm inset-shadow-sm [&>div]:flex [&>div]:flex-col">
            {suggestions.map((item) => (
              <SlashCmd.Item
                className="slashcmd flex cursor-pointer items-center gap-3 px-2 py-1 text-lg transition-colors duration-200 hover:bg-gray-100 data-[selected=true]:bg-gray-100"
                value={item.title}
                onCommand={(val) => item.command(val)}
                keywords={item.searchTerms}
                key={item.title}
              >
                {item.icon}
                <p>{item.title}</p>
              </SlashCmd.Item>
            ))}
          </SlashCmd.List>
        </SlashCmd.Cmd>
      </SlashCmd.Root>
    </SlashCmdProvider>
  );
}
