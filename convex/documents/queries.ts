import { query } from "@convex/_generated/server";
import { filter } from "convex-helpers/server/filter";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const getSearchedDocuments = query({
  args: { search: v.string() },
  async handler({ auth, db }, { search }) {
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null) {
      return;
    }

    return await filter(
      db
        .query("documents")
        .withIndex("by_owner_id", (q) => q.eq("ownerId", userIdentity.subject))
        .order("desc"),
      (document) => document.title.toLowerCase().includes(search.toLowerCase()),
    ).collect();
  },
});

export const getAllDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
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
      .order("desc")
      .paginate(paginationOpts);
  },
});
