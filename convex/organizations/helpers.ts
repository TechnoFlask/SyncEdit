import { Doc, Id } from "@convex/_generated/dataModel";
import { QueryCtx } from "@convex/_generated/server";
import { getAll, getManyFrom } from "convex-helpers/server/relationships";

export async function getOrganizationMembersExceptSelf(
  db: QueryCtx["db"],
  organizationId: Id<"organizations">,
  userInDb: Doc<"users">,
) {
  const currentOrganizationMembers = await getManyFrom(
    db,
    "organizationMembers",
    "by_organizationId_userId",
    organizationId,
    "organizationId",
  );

  // Exclude current user
  const currentOrganizationOtherMemberNames = (
    await getAll(
      db,
      currentOrganizationMembers
        .filter((o) => o.userId !== userInDb._id)
        .map((o) => o.userId),
    )
  ).filter((o) => o != null);

  return currentOrganizationOtherMemberNames;
}
