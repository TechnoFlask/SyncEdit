import { Doc } from "@convex/_generated/dataModel";
import { zAuthQuery } from "@convex/customQueries";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";

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
