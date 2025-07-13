"use client";

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { cn } from "@/lib/utils";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignLeft2,
  IconAlignRight,
  IconBallpen,
  IconBaselineDensitySmall,
  IconBold,
  IconClearFormatting,
  IconItalic,
  IconLineHeight,
  IconList,
  IconListCheck,
  IconListDetails,
  IconListNumbers,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconUnderline,
} from "@tabler/icons-react";

export function FormatMenu() {
  const { editorOptionsActions, editorOptionsActive } = useEditorContext();

  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer text-lg transition-colors duration-200 hover:bg-gray-200 data-[state=open]:bg-gray-200">
        Format
      </MenubarTrigger>
      <MenubarContent className="w-3xs print:hidden [&_*]:text-lg">
        <MenubarSub>
          <MenubarSubTrigger className="flex gap-2">
            <IconBallpen className="size-6" />
            Text
          </MenubarSubTrigger>
          <MenubarSubContent className="w-xs">
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.bold(),
              })}
              onClick={() => editorOptionsActions.bold?.()}
            >
              <IconBold className="size-6 text-black" />
              Bold <MenubarShortcut>Ctrl+B</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.italic(),
              })}
              onClick={() => editorOptionsActions.italic?.()}
            >
              <IconItalic className="size-6 text-black" />
              Italic
              <MenubarShortcut>Ctrl+I</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.underline(),
              })}
              onClick={() => editorOptionsActions.underline?.()}
            >
              <IconUnderline className="size-6 text-black" />
              Underline
              <MenubarShortcut>Ctrl+U</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.strikethrough(),
              })}
              onClick={() => editorOptionsActions.strikethrough?.()}
            >
              <IconStrikethrough className="size-6 text-black" />
              Strikethrough
              <MenubarShortcut>Ctrl+Sh+S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.superscript(),
              })}
              onClick={() => editorOptionsActions.superscript?.()}
            >
              <IconSuperscript className="size-6 text-black" />
              Superscript
              <MenubarShortcut>Ctrl+.</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.subscript(),
              })}
              onClick={() => editorOptionsActions.subscript?.()}
            >
              <IconSubscript className="size-6 text-black" />
              Subscript
              <MenubarShortcut>Ctrl+,</MenubarShortcut>
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex gap-2">
            <IconBaselineDensitySmall className="size-6" />
            Paragraph
          </MenubarSubTrigger>
          <MenubarSubContent>{/* TODO */}</MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex gap-2">
            <IconAlignLeft2 className="size-6" />
            Alignment
          </MenubarSubTrigger>
          <MenubarSubContent className="w-3xs">
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.alignment("left"),
              })}
              onClick={() => editorOptionsActions.alignment?.("left")}
            >
              <IconAlignLeft className="size-6 text-black" />
              Left <MenubarShortcut>Ctrl+Sh+L</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.alignment("center"),
              })}
              onClick={() => editorOptionsActions.alignment?.("center")}
            >
              <IconAlignCenter className="size-6 text-black" />
              Center <MenubarShortcut>Ctrl+Sh+E</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.alignment("right"),
              })}
              onClick={() => editorOptionsActions.alignment?.("right")}
            >
              <IconAlignRight className="size-6 text-black" />
              Right <MenubarShortcut>Ctrl+Sh+R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className={cn({
                "bg-gray-100": editorOptionsActive.alignment("justify"),
              })}
              onClick={() => editorOptionsActions.alignment?.("justify")}
            >
              <IconAlignJustified className="size-6 text-black" />
              Justified <MenubarShortcut>Ctrl+Sh+J</MenubarShortcut>
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex gap-2">
            <IconLineHeight className="size-6" />
            Spacing
          </MenubarSubTrigger>
          <MenubarSubContent>{/* TODO */}</MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex gap-2">
            <IconListDetails className="size-6" />
            List
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              onClick={() => editorOptionsActions.bulletedList?.()}
              className={cn({
                "bg-gray-100": editorOptionsActive.bulletedList(),
              })}
            >
              <IconList className="size-6 text-black" />
              Bulleted List
            </MenubarItem>
            <MenubarItem
              onClick={() => editorOptionsActions.numberedList?.()}
              className={cn({
                "bg-gray-100": editorOptionsActive.numberedList(),
              })}
            >
              <IconListNumbers className="size-6 text-black" />
              Numbered List
            </MenubarItem>
            <MenubarItem
              onClick={() => editorOptionsActions.checkList?.()}
              className={cn({
                "bg-gray-100": editorOptionsActive.checkList(),
              })}
            >
              <IconListCheck className="size-6 text-black" />
              Check List
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarItem onClick={() => editorOptionsActions.removeFormatting?.()}>
          <IconClearFormatting className="size-6 text-black" />
          Remove formatting
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
