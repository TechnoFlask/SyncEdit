import { Editor } from "@tiptap/core";

function download(blob: Blob, downloadName: string) {
  const aEl = document.createElement("a");
  aEl.href = URL.createObjectURL(blob);
  aEl.download = downloadName;

  aEl.click();
}

export function saveJSON(editor: Editor | null) {
  download(
    new Blob([JSON.stringify(editor?.getJSON())], {
      type: "application/json",
    }),
    "document.json",
  );
}

export function saveHTML(editor: Editor | null) {
  download(
    new Blob([JSON.stringify(editor?.getHTML())], { type: "text/html" }),
    "document.html",
  );
}

export function savePlainText(editor: Editor | null) {
  download(
    new Blob([JSON.stringify(editor?.getHTML())], { type: "text/plain" }),
    "document.txt",
  );
}
