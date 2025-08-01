"use server";

import { api } from "@convex/_generated/api";
import { Doc, Id } from "@convex/_generated/dataModel";
import { userSchema } from "@convex/schema";
import { Result } from "@convex/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { withSystemFields, zid } from "convex-helpers/server/zod";
import { fetchMutation } from "convex/nextjs";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

const mapSchema = z.map(
  userSchema.extend(withSystemFields("users", userSchema.shape)),
  z.boolean(),
);

export async function saveDocumentAccess(
  newAccesses: Map<Doc<"users">, boolean>,
  documentId: Id<"documents">,
): Promise<Result<string, string>> {
  const { getAccessTokenRaw, getUser, isAuthenticated } =
    getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) return redirect("/api/auth/login", RedirectType.replace);

  const parseResult = mapSchema
    .transform((val) =>
      val
        .entries()
        .toArray()
        .map(([user, canEdit]) => [user._id, canEdit ? "edit" : "read"]),
    )
    .pipe(
      z.array(
        z.tuple([
          zid("users"),
          z.union([z.literal("read"), z.literal("edit")]),
        ]),
      ),
    )
    .safeParse(newAccesses);
  if (!parseResult.success)
    return { success: false, cause: parseResult.error.errors[0].message };

  const token = (await getAccessTokenRaw()) ?? undefined;

  return await fetchMutation(
    api.permissions.mutations.updateDocumentAccess,
    {
      documentId,
      newAccesses: parseResult.data,
    },
    { token },
  );
}
