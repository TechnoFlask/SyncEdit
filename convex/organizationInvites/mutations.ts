import { Id } from "@convex/_generated/dataModel";
import { zAuthMutation } from "@convex/customQueries";
import { organizationInviteSchema } from "@convex/schema";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";

export const registerInvitation = zAuthMutation({
  args: {
    organizationId: zid("organizations"),
    allowedEmails: organizationInviteSchema.shape.allowedEmails,
  },
  async handler(
    { success, db, ...ctx },
    { organizationId, allowedEmails },
  ): Promise<Result<Id<"organizationInvites">, string>> {
    if (!success) return { success, cause: ctx.cause! };

    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const targetOrganization = await getOneFrom(
      db,
      "organizations",
      "by_id",
      organizationId,
      "_id",
    );

    if (targetOrganization == null)
      return { success: false, cause: "Invalid organization" };

    if (targetOrganization.ownerId !== userInDb._id)
      return {
        success: false,
        cause: "You are not authorized to invite members in this organization",
      };

    if (allowedEmails.length === 0)
      return { success: false, cause: "At least one invitee required" };

    const inviteId = await db.insert("organizationInvites", {
      allowedEmails,
      organizationId,
      inviter: userInDb._id,
    });

    return { success: true, value: inviteId };
  },
});

export const acceptInvitation = zAuthMutation({
  args: {
    organizationId: zid("organizations"),
    invitationId: zid("organizationInvites"),
    newAllowedEmails: organizationInviteSchema.shape.allowedEmails,
  },
  async handler(
    { success, db, ...ctx },
    { organizationId, newAllowedEmails, invitationId },
  ) {
    if (!success) return { success, cause: ctx.cause! };

    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    await Promise.all([
      await db.insert("organizationMembers", {
        organizationId,
        userId: userInDb._id,
      }),
      await db.patch(invitationId, {
        allowedEmails: newAllowedEmails,
      }),
    ]);

    return { success: true, value: "" };
  },
});
