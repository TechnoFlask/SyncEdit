import { safePromise } from "@/lib/helpers";
import { Doc } from "@convex/_generated/dataModel";
import { zAuthQuery } from "@convex/customQueries";
import { Result } from "@convex/types";
import { getAll, getOneFrom } from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";
import { z } from "zod";

export async function getUserInDb() {}

export const getCurrentUser = zAuthQuery({
  args: {},
  async handler({
    success,
    db,
    ...ctx
  }): Promise<Result<Doc<"users">, string>> {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    return { success: true, value: userInDb };
  },
});

export const getUsersFromId = zAuthQuery({
  args: { userIds: z.array(zid("users")) },
  async handler(
    { success, db, ...ctx },
    { userIds },
  ): Promise<Result<Doc<"users">[], string>> {
    if (!success) return { success, cause: ctx.cause! };

    const [users, err] = await safePromise(getAll(db, userIds));
    if (err) return { success: false, cause: err.message };

    if (users.some((u) => u == null))
      return { success: false, cause: "Invalid user detected" };

    return { success: true, value: users.filter((u) => u != null) };
  },
});
