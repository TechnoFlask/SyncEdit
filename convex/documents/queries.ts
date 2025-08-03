import { Doc } from "@convex/_generated/dataModel";
import { zAuthQuery } from "@convex/customQueries";
import { documentSchema, permissionSchema } from "@convex/schema";
import { type Result } from "@convex/types";
import { filter } from "convex-helpers/server/filter";
import { getAll, getOneFrom } from "convex-helpers/server/relationships";
import { convexToZod, zid } from "convex-helpers/server/zod";
import { paginationOptsValidator } from "convex/server";
import { z } from "zod";
import {
  checkDocOrOrgOwner,
  checkDocumentAccess,
  getDocumentAccessLevel,
} from "./helpers";

export const getSearchedDocuments = zAuthQuery({
  args: {
    search: z.string(),
    organizationId: documentSchema.shape.organizationId,
  },
  async handler(
    { success, db, ...ctx },
    { search, organizationId },
  ): Promise<
    Result<
      (Doc<"documents"> & { isOwner: boolean; user: Doc<"users"> })[],
      string
    >
  > {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const query = organizationId
      ? db
          .query("documents")
          .withIndex("by_organizationId", (q) =>
            q.eq("organizationId", organizationId),
          )
      : db
          .query("documents")
          .withIndex("by_ownerId_organizationId", (q) =>
            q.eq("ownerId", userInDb._id).eq("organizationId", undefined),
          );

    const queryResults = await filter(query.order("desc"), (document) =>
      document.title.toLowerCase().includes(search.toLowerCase()),
    ).collect();

    const resultDocumentOwners = (
      await getAll(
        db,
        queryResults.map((qr) => qr.ownerId),
      )
    ).filter((rdo) => rdo != null);

    return {
      success: true,
      value: queryResults.map((qr, i) => ({
        ...qr,
        isOwner: qr.ownerId === userInDb._id,
        user: resultDocumentOwners[i],
      })),
    };
  },
});

export const getAllDocuments = zAuthQuery({
  args: {
    paginationOpts: convexToZod(paginationOptsValidator),
    organizationId: documentSchema.shape.organizationId,
  },
  async handler({ success, db, ...ctx }, { paginationOpts, organizationId }) {
    if (!success)
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null)
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };

    const query = organizationId
      ? db
          .query("documents")
          .withIndex("by_organizationId", (q) =>
            q.eq("organizationId", organizationId),
          )
      : db
          .query("documents")
          .withIndex("by_ownerId_organizationId", (q) =>
            q.eq("ownerId", userInDb._id).eq("organizationId", undefined),
          );

    const { page: queryResultPage, ...queryResult } = await query
      .order("desc")
      .paginate(paginationOpts);

    const pageDocumentOwners = (
      await getAll(
        db,
        queryResultPage.map((qrp) => qrp.ownerId),
      )
    ).filter((pdo) => pdo != null);

    return {
      ...queryResult,
      page: queryResultPage.map((qrp, i) => ({
        ...qrp,
        isOwner: qrp.ownerId === userInDb._id,
        user: pageDocumentOwners[i],
      })),
    };
  },
});

export const getDocumentById = zAuthQuery({
  args: { documentId: zid("documents") },
  async handler(
    { success, db, ...ctx },
    { documentId },
  ): Promise<
    Result<
      Doc<"documents"> & {
        access: z.infer<typeof permissionSchema.shape.accessLevel>;
      },
      string
    >
  > {
    if (!success) return { success, cause: ctx.cause! };
    const user = ctx.value!;

    const userInDb = await getOneFrom(db, "users", "by_userId", user.subject);
    if (userInDb == null) return { success: false, cause: "Invalid user" };

    const targetDocument = await db.get(documentId);
    if (targetDocument == null)
      return { success: false, cause: "Target document not found" };

    const isDocOrOrgOwner = await checkDocOrOrgOwner(
      db,
      targetDocument,
      userInDb,
    );
    if (isDocOrOrgOwner)
      return { success: true, value: { ...targetDocument, access: "edit" } };

    const hasDocumentAccess = await checkDocumentAccess(
      db,
      targetDocument,
      userInDb,
    );
    if (!hasDocumentAccess)
      return {
        success: false,
        cause: "You are not authorized to access this document",
      };

    const documentAccessLevel = await getDocumentAccessLevel(
      db,
      targetDocument,
      userInDb,
    );
    return {
      success: true,
      value: { ...targetDocument, access: documentAccessLevel },
    };
  },
});

// export const getDocumentTitle = zAuthQuery({
//   args: { documentId: zid("documents") },
//   async handler(
//     { runQuery },
//     { documentId },
//   ): Promise<Result<Doc<"documents">["title"], string>> {
//     const internalQueryResult = await runQuery(
//       internal.documents.internal.queries.queryDocumentById,
//       {
//         documentId,
//       },
//     );

//     if (!internalQueryResult.success) return internalQueryResult;

//     return { success: true, value: internalQueryResult.value.title };
//   },
// });
