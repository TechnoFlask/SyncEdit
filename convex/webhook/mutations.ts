import { mutation } from "@convex/_generated/server";
import { userSchema } from "@convex/schema";
import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation } from "convex-helpers/server/zod";
import { ConvexError } from "convex/values";
import { z } from "zod";

const zMutation = zCustomMutation(mutation, NoOp);

export const addUser = zMutation({
  args: { secret: z.string(), userData: userSchema },
  async handler({ db }, { secret, userData }) {
    if (secret !== process.env.WEBHOOK_SECRET)
      throw new ConvexError("Operation not authorized");

    const userId = await db.insert("users", userData);
    const organizationId = await db.insert("organizations", {
      name: "Default",
    });
    await db.insert("organizationMembers", {
      organizationId,
      userId,
    });
  },
});
