import { Doc } from "@convex/_generated/dataModel";
import { zAuthQuery } from "@convex/customQueries";
import { getOrganizationMembersExceptSelf } from "@convex/organizations/helpers";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";

export const getDocumentPermissions = zAuthQuery({
  args: { documentId: zid("documents"), organizationId: zid("organizations") },
  async handler(
    { success, db, ...ctx },
    { documentId, organizationId },
  ): Promise<
    Result<(Doc<"users"> & { permission: Doc<"permissions"> | null })[], string>
  > {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const organizationMembers = await getOrganizationMembersExceptSelf(
      db,
      organizationId,
      userInDb,
    );

    const organizationMemberPermissions = await Promise.all(
      organizationMembers.map((om) =>
        db
          .query("permissions")
          .withIndex("by_documentId_userId", (q) =>
            q.eq("documentId", documentId).eq("userId", om._id),
          )
          .first(),
      ),
    );

    return {
      success: true,
      value: organizationMembers.map((om, i) => ({
        ...om,
        permission: organizationMemberPermissions[i],
      })),
    };
  },
});
