import { Doc } from "@convex/_generated/dataModel";
import { internalQuery } from "@convex/_generated/server";
import { type Result } from "@convex/types";
import { v } from "convex/values";

export const queryDocumentById = internalQuery({
  args: { documentId: v.id("documents") },
  async handler(
    { auth, db },
    { documentId },
  ): Promise<Result<Doc<"documents">, string>> {
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null) {
      return { success: false, cause: "User not authenticated" };
    }

    const targetDocument = await db.get(documentId);
    if (targetDocument == null)
      return { success: false, cause: "Target document not found" };

    if (targetDocument.ownerId !== userIdentity.subject)
      return {
        success: false,
        cause: "Current user is not the owner of the document",
      };

    return { success: true, value: targetDocument };
  },
});
