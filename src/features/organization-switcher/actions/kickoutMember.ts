"use server";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Result } from "@convex/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { zid } from "convex-helpers/server/zod";
import { fetchMutation } from "convex/nextjs";
import { redirect, RedirectType } from "next/navigation";

export async function kickoutMember(
  organizationId: Id<"organizations">,
  userId: Id<"users">,
): Promise<Result<string, string>> {
  const { getAccessTokenRaw, isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect("/api/auth/login", RedirectType.replace);

  const orgIdParseResult = zid("organizations").safeParse(organizationId);
  if (!orgIdParseResult.success)
    return { success: false, cause: orgIdParseResult.error.errors[0].message };

  const userIdParseResult = zid("users").safeParse(userId);
  if (!userIdParseResult.success)
    return { success: false, cause: userIdParseResult.error.errors[0].message };

  const token = (await getAccessTokenRaw()) ?? undefined;

  const mutationResult = await fetchMutation(
    api.organizationMembers.mutations.kickoutMember,
    {
      organizationId: orgIdParseResult.data,
      userId: userIdParseResult.data,
    },
    { token },
  );

  return mutationResult;
}
