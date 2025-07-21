import { mutation } from "@convex/_generated/server";
import { v } from "convex/values";

export const createNewDocument = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  async handler({ auth, db }, { title, initialContent }) {
    console.log("creating");
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null) {
      return { success: false, cause: "User not authenticated" };
    }

    return {
      success: true,
      value: await db.insert("documents", {
        title: title ?? "Untitled document",
        ownerId: userIdentity.subject,
        initialContent,
      }),
    };
  },
});

export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
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

export const renameDocument = mutation({
  args: { documentId: v.id("documents"), title: v.optional(v.string()) },
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
