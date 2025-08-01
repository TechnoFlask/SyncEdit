import { zAuthMutation } from "@convex/customQueries";
import { organizationSchema } from "@convex/schema";
import { Result } from "@convex/types";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";

export const createOrganization = zAuthMutation({
  args: { name: organizationSchema.shape.name },
  async handler(
    { success, db, ...ctx },
    { name },
  ): Promise<Result<"", string>> {
    if (!success) return { success, cause: ctx.cause! };

    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    if (name.trim().toLowerCase() === "default")
      return { success: false, cause: "Invalid organization name" };

    const joinedOrganizations = await getManyFrom(
      db,
      "organizations",
      "by_ownerId",
      userInDb._id,
    );
    if (
      joinedOrganizations.some(
        (o) => o.name.toLowerCase() === name.trim().toLowerCase(),
      )
    )
      return { success: false, cause: "Organization with name exists already" };

    const newOrgId = await db.insert("organizations", {
      ownerId: userInDb._id,
      name: name.trim(),
    });

    await db.insert("organizationMembers", {
      organizationId: newOrgId,
      userId: userInDb._id,
    });
    return { success: true, value: "" };
  },
});
