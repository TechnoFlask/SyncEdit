import { isValidLink } from "@/lib/utils";
import { useCallback } from "react";
import { toast } from "sonner";
import { useEditorContext } from "../context/EditorContext";

export function useImage() {
  const { editor } = useEditorContext();

  const setImage = useCallback(
    (url: string) => {
      if (!isValidLink(url)) {
        toast.error("Invalid URL.");
        return;
      }

      editor?.chain().focus().setImage({ src: url }).run();
    },
    [editor],
  );

  const revokeImageBlobUrl = useCallback(() => {
    const currentImageBlob = editor?.getAttributes("image");
    if (currentImageBlob && currentImageBlob.src)
      URL.revokeObjectURL(currentImageBlob.src);
  }, [editor]);

  const uploadImage = useCallback(() => {
    revokeImageBlobUrl();
    const imageRegex = new RegExp("image/*");

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.hidden = true;
    imageInput.accept = "image/*";

    imageInput.onchange = () => {
      const image = imageInput.files?.[0];
      if (!image) return;

      if (!imageRegex.test(image.type)) {
        toast.error("Invalid file type. Image required");
        return;
      }

      const url = URL.createObjectURL(image);
      setImage(url);
      imageInput.value = "";
    };

    imageInput.click();
  }, [setImage, revokeImageBlobUrl]);

  return { setImage, uploadImage };
}
