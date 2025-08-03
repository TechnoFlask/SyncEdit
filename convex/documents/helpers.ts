import { Doc } from "@convex/_generated/dataModel";
import { QueryCtx } from "@convex/_generated/server";

export async function checkDocOrOrgOwner(
  db: QueryCtx["db"],
  targetDocument: Doc<"documents">,
  userInDb: Doc<"users">,
) {
  const isDocumentOwner = targetDocument.ownerId === userInDb._id;

  let isOrganizationOwner = false;
  if (!isDocumentOwner && targetDocument.organizationId) {
    const documentOrganization = await db.get(targetDocument.organizationId);
    isOrganizationOwner =
      documentOrganization != null &&
      documentOrganization.ownerId === userInDb._id;
  }

  return isDocumentOwner || isOrganizationOwner;
}

export async function checkDocumentAccess(
  db: QueryCtx["db"],
  targetDocument: Doc<"documents">,
  userInDb: Doc<"users">,
) {
  if (
    targetDocument.organizationId == undefined &&
    targetDocument.visibility === "limited"
  ) {
    return false;
  }

  const memberRecord = await db
    .query("organizationMembers")
    .withIndex("by_organizationId_userId", (q) =>
      q
        .eq("organizationId", targetDocument.organizationId!)
        .eq("userId", userInDb._id),
    )
    .first();

  if (memberRecord == null) return false;

  return true;
}

export async function getDocumentAccessLevel(
  db: QueryCtx["db"],
  targetDocument: Doc<"documents">,
  userInDb: Doc<"users">,
) {
  const userDocumentPermission = await db
    .query("permissions")
    .withIndex("by_documentId_userId", (q) =>
      q.eq("documentId", targetDocument._id).eq("userId", userInDb._id),
    )
    .first();

  if (
    userDocumentPermission == null ||
    userDocumentPermission.accessLevel == null
  )
    return "read";

  return userDocumentPermission.accessLevel;
}
