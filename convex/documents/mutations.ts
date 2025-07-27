import { Id } from "@convex/_generated/dataModel";
import { zAuthMutation } from "@convex/customQueries";
import { documentSchema } from "@convex/schema";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";
import { checkDocOrOrgOwner } from "./helpers";

export const createNewDocument = zAuthMutation({
  args: {
    title: documentSchema.shape.title.optional(),
    initialContent: documentSchema.shape.initialContent,
    organizationId: documentSchema.shape.organizationId,
  },
  async handler(
    { success, db, ...ctx },
    { title, initialContent, organizationId },
  ): Promise<Result<Id<"documents">, string>> {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    return {
      success: true,
      value: await db.insert(
        "documents",
        documentSchema.parse({
          title: title ?? "Untitled document",
          ownerId: userInDb._id,
          organizationId,
          initialContent,
        }),
      ),
    };
  },
});

export const deleteDocument = zAuthMutation({
  args: {
    documentId: zid("documents"),
  },
  async handler({ success, db, ...ctx }, { documentId }) {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const targetDocument = await db.get(documentId);
    if (targetDocument == null)
      return { success: false, cause: "Target document not found" };

    const isDocOrOrgOwner = await checkDocOrOrgOwner(
      db,
      targetDocument,
      userInDb,
    );

    if (!isDocOrOrgOwner)
      return {
        success: false,
        cause: "You are not authorized to delete this document",
      };

    await db.delete(documentId);
    return { success: true, value: "" };
  },
});

export const renameDocument = zAuthMutation({
  args: {
    documentId: zid("documents"),
    title: documentSchema.shape.title.optional(),
  },
  async handler({ success, db, ...ctx }, { documentId, title }) {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const targetDocument = await db.get(documentId);
    if (targetDocument == null)
      return { success: false, cause: "Target document not found" };

    const docOrOrgOwner = await checkDocOrOrgOwner(
      db,
      targetDocument,
      userInDb,
    );

    if (!docOrOrgOwner)
      return {
        success: false,
        cause: "You are not authorized to rename this document",
      };

    if (!title || title.trim() === "" || title === targetDocument.title.trim())
      return { success: false, cause: "Title did not change" };

    await db.patch(documentId, { title: title.trim() });
    return { success: true, value: "" };
  },
});
