import { zAuthMutation } from "@convex/customQueries";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";
import { removeMember } from "./helpers";

export const leaveOrganization = zAuthMutation({
  args: { organizationId: zid("organizations") },
  async handler(
    { success, db, ...ctx },
    { organizationId },
  ): Promise<Result<string, string>> {
    if (!success) return { success, cause: ctx.cause! };

    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    return await removeMember(db, organizationId, userInDb._id);
  },
});

export const kickoutMember = zAuthMutation({
  args: { organizationId: zid("organizations"), userId: zid("users") },
  async handler(
    { success, db, ...ctx },
    { organizationId, userId },
  ): Promise<Result<string, string>> {
    if (!success) return { success, cause: ctx.cause! };

    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const currentOrganization = await getOneFrom(
      db,
      "organizations",
      "by_id",
      organizationId,
      "_id",
    );
    if (currentOrganization == null)
      return { success: false, cause: "Invalid organization" };

    if (userInDb._id !== currentOrganization.ownerId)
      return {
        success: false,
        cause: "You are not authorized to kickout members",
      };

    return await removeMember(db, organizationId, userId);
  },
});
