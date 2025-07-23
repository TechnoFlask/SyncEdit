import { mutation } from "@convex/_generated/server";
import { documentSchema } from "@convex/schema";
import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation, zid } from "convex-helpers/server/zod";

const zMutation = zCustomMutation(mutation, NoOp);

export const createNewDocument = zMutation({
  args: {
    title: documentSchema.shape.title.optional(),
    initialContent: documentSchema.shape.initialContent,
  },
  async handler({ auth, db }, { title, initialContent }) {
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null) {
      return { success: false, cause: "User not authenticated" };
    }

    return {
      success: true,
      value: await db.insert(
        "documents",
        documentSchema.parse({
          title: title ?? "Untitled document",
          ownerId: userIdentity.subject,
          initialContent,
        }),
      ),
    };
  },
});

export const deleteDocument = zMutation({
  args: { documentId: zid("documents") },
  async handler({ auth, db }, { documentId }) {
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null)
      return { success: false, cause: "User not authenticated" };

    const targetDocument = await db.get(documentId);
    if (targetDocument == null)
      return { success: false, cause: "Target document not found" };

    if (targetDocument.ownerId !== userIdentity.subject)
      return {
        success: false,
        cause: "Current user is not the owner of the document",
      };

    await db.delete(documentId);
    return { success: true, value: "" };
  },
});

export const renameDocument = zMutation({
  args: {
    documentId: zid("documents"),
    title: documentSchema.shape.title.optional(),
  },
  async handler({ auth, db }, { documentId, title }) {
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null)
      return { success: false, cause: "User not authenticated" };

    const targetDocument = await db.get(documentId);
    if (targetDocument == null)
      return { success: false, cause: "Target document not found" };

    if (targetDocument.ownerId !== userIdentity.subject)
      return {
        success: false,
        cause: "Current user is not the owner of the document",
      };

    if (!title || title.trim() === "" || title === targetDocument.title.trim())
      return { success: false, cause: "Title did not change" };

    await db.patch(documentId, { title: title.trim() });
    return { success: true, value: "" };
  },
});
