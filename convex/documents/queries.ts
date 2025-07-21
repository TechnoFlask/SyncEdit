import { query } from "@convex/_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getAllDocuments = query({
  args: { paginationOpts: paginationOptsValidator },
  async handler({ db, auth }, { paginationOpts }) {
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    return await db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", userIdentity.subject))
      .paginate(paginationOpts);
  },
});
