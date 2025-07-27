import { Doc } from "@convex/_generated/dataModel";
import { zAuthQuery } from "@convex/customQueries";
import { Result } from "@convex/types";
import {
  getAll,
  getManyFrom,
  getOneFrom,
} from "convex-helpers/server/relationships";
import { zid } from "convex-helpers/server/zod";

export const getUserOrganizations = zAuthQuery({
  args: {},
  async handler(
    { success, db, ...ctx },
    {},
  ): Promise<
    Result<
      (Omit<Doc<"organizations">, "ownerId"> & {
        isOwner: boolean;
      })[],
      string
    >
  > {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const organizations = await getManyFrom(
      db,
      "organizationMembers",
      "by_userId",
      userInDb._id,
    );

    const organizationNames = (
      await getAll(
        db,
        organizations.map((o) => o.organizationId),
      )
    ).filter((o) => o != null);

    return {
      success: true,
      value: organizationNames
        .map(({ ownerId, ...o }) => ({
          ...o,
          isOwner: ownerId === userInDb._id,
        }))
        .toSorted((_, b) => (b.name === "Default" || b.isOwner ? 1 : -1)),
    };
  },
});

export const getCurrentOrganizationMembers = zAuthQuery({
  args: { organizationId: zid("organizations") },
  async handler(
    { success, db, ...ctx },
    { organizationId },
  ): Promise<Result<Doc<"users">[], string>> {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const currentOrganizationMembers = await getManyFrom(
      db,
      "organizationMembers",
      "by_organizationId_userId",
      organizationId,
      "organizationId",
    );

    // Exclude owner
    const currentOrganizationOtherMemberNames = await getAll(
      db,
      currentOrganizationMembers
        .filter((o) => o.userId !== userInDb._id)
        .map((o) => o.userId),
    );

    return {
      success: true,
      value: currentOrganizationOtherMemberNames.filter((o) => o != null),
    };
  },
});
