import { Doc } from "@convex/_generated/dataModel";
import { zAuthQuery } from "@convex/customQueries";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";

export const getInvitation = zAuthQuery({
  args: { inviteId: zid("organizationInvites") },
  async handler(
    { success, db, ...ctx },
    { inviteId },
  ): Promise<Result<Doc<"organizationInvites">, string>> {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const invitation = await db.get(inviteId);
    if (invitation == null)
      return { success: false, cause: "Invitation not found" };

    return { success: true, value: invitation };
  },
});
