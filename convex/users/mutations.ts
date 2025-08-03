import { zAuthMutation } from "@convex/customQueries";
import { userSchema } from "@convex/schema";
import { Result } from "@convex/types";
import { getOneFrom } from "convex-helpers/server/relationships";

export const updateUser = zAuthMutation({
  args: {
    userUpdateData: userSchema.pick({
      firstName: true,
      lastName: true,
      userName: true,
    }),
  },
  async handler(
    { success, db, ...ctx },
    { userUpdateData },
  ): Promise<Result<string, string>> {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    db.patch(userInDb._id, {
      ...userUpdateData,
    });

    return { success: true, value: "Updated user successfully" };
  },
});
