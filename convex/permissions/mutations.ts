import { zAuthMutation } from "@convex/customQueries";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";
import { z } from "zod";

export const updateDocumentAccess = zAuthMutation({
  args: {
    documentId: zid("documents"),
    newAccesses: z.array(
      z.tuple([zid("users"), z.union([z.literal("read"), z.literal("edit")])]),
    ),
  },
  async handler(
    { success, db, ...ctx },
    { documentId, newAccesses },
  ): Promise<Result<string, string>> {
    if (!success) return { success, cause: ctx.cause! };

    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    await Promise.all(
      newAccesses.map(async ([userId, accessLevel]) => {
        const existingPermission = await db
          .query("permissions")
          .withIndex("by_documentId_userId", (q) =>
            q.eq("documentId", documentId).eq("userId", userId),
          )
          .first();

        if (existingPermission == null)
          return db.insert("permissions", {
            documentId,
            userId,
            accessLevel,
          });
        else
          return db.patch(existingPermission._id, {
            accessLevel,
          });
      }),
    );

    return { success: true, value: "" };
  },
});
