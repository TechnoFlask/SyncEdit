"use server";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Result } from "@convex/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { zid } from "convex-helpers/server/zod";
import { fetchMutation } from "convex/nextjs";
import { redirect, RedirectType } from "next/navigation";

export async function leaveOrganization(
  organizationId: Id<"organizations">,
): Promise<Result<string, string>> {
  const { getAccessTokenRaw, isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect("/api/auth/login", RedirectType.replace);

  const parseResult = zid("organizations").safeParse(organizationId);
  if (!parseResult.success)
    return { success: false, cause: parseResult.error.errors[0].message };

  const token = (await getAccessTokenRaw()) ?? undefined;

  const mutationResult = await fetchMutation(
    api.organizationMembers.mutations.leaveOrganization,
    {
      organizationId: parseResult.data,
    },
    { token },
  );

  return mutationResult;
}
