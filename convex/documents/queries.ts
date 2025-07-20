import { query } from "@convex/_generated/server";

export const getAllDocuments = query({
  async handler({ db, auth }) {
    const userIdentity = await auth.getUserIdentity();
    if (userIdentity == null) {
      console.error("Not authenticated");
      return null;
    }

    return await db.query("documents").collect();
  },
});
