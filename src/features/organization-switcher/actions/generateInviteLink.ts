"use server";

import { redis } from "@/redis";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Result } from "@convex/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { zid } from "convex-helpers/server/zod";
import { fetchMutation } from "convex/nextjs";
import { z } from "zod";

export async function generateInviteLink(
  inviteeEmails: string[],
  organizationId: Id<"organizations">,
): Promise<Result<Id<"organizationInvites">, string>> {
  const { getAccessTokenRaw, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) return { success: false, cause: "User not authenticated" };
  const token = await getAccessTokenRaw();

  const parseResult = z.array(z.string().email()).safeParse(inviteeEmails);
  if (!parseResult.success)
    return { success: false, cause: parseResult.error.errors[0].message };

  if (parseResult.data.length === 0)
    return { success: false, cause: "At least one invitee required" };

  const organizationIdParseResult =
    zid("organizations").safeParse(organizationId);
  if (!organizationIdParseResult.success)
    return {
      success: false,
      cause: organizationIdParseResult.error.errors[0].message,
    };

  const invitationIdMutationResult = await fetchMutation(
    api.organizationInvites.mutations.registerInvitation,
    {
      allowedEmails: parseResult.data,
      organizationId: organizationIdParseResult.data,
    },
    { token: token ?? undefined },
  );

  if (!invitationIdMutationResult.success)
    return {
      success: false,
      cause: `Invitation Id creation failed\n${invitationIdMutationResult.cause}`,
    };

  await redis.setex(
    `org-invite:${invitationIdMutationResult.value}`,
    15 * 60,
    true,
  );

  return invitationIdMutationResult;
}
