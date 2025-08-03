import { Id } from "@convex/_generated/dataModel";
import { MutationCtx } from "@convex/_generated/server";
import { Result } from "@convex/types";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";

export async function removeMember(
  db: MutationCtx["db"],
  organizationId: Id<"organizations">,
  userId: Id<"users">,
): Promise<Result<string, string>> {
  // Transfer docs and delete member records
  const currentMemberRecord = await db
    .query("organizationMembers")
    .withIndex("by_organizationId_userId", (q) =>
      q.eq("organizationId", organizationId).eq("userId", userId),
    )
    .first();

  if (currentMemberRecord == null)
    return {
      success: false,
      cause: "User is not a member of the organization",
    };

  const currentOrganization = await getOneFrom(
    db,
    "organizations",
    "by_id",
    organizationId,
    "_id",
  );
  if (currentOrganization == null)
    return { success: false, cause: "Invalid organization" };

  const ownedDocuments = await db
    .query("documents")
    .withIndex("by_ownerId_organizationId", (q) =>
      q.eq("ownerId", userId).eq("organizationId", organizationId),
    )
    .collect();

  await Promise.all([
    ...ownedDocuments.map((od) =>
      db.patch(od._id, {
        ownerId: currentOrganization.ownerId,
      }),
    ),
    db.delete(currentMemberRecord._id),
  ]);

  // Delete org permissions
  const orgDocuments = await getManyFrom(
    db,
    "documents",
    "by_organizationId",
    organizationId,
  );

  await Promise.all(
    orgDocuments.map(async (od) => {
      const permission = await db
        .query("permissions")
        .withIndex("by_documentId_userId", (q) =>
          q.eq("documentId", od._id).eq("userId", userId),
        )
        .first();

      if (permission) return db.delete(permission._id);
    }),
  );

  return { success: true, value: "" };
}
