"use server";

import { safePromise } from "@/lib/helpers";
import { getUserName } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Result } from "@convex/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { zid } from "convex-helpers/server/zod";
import { fetchQuery } from "convex/nextjs";
import { z } from "zod";

export async function getAllRoomMembers(
  roomUserIds: string[],
): Promise<Result<{ name: string; avatar: string | undefined }[], string>> {
  const { getAccessTokenRaw } = getKindeServerSession();
  const tokenPromise = getAccessTokenRaw();
  if (!tokenPromise) return { success: false, cause: "User not authenticated" };

  const [token, tokenErr] = await safePromise(tokenPromise);
  if (tokenErr) return { success: false, cause: tokenErr.message };

  const actualIds = roomUserIds.map((id) => id.split("-")[0]);
  const parseResult = z.array(zid("users")).safeParse(actualIds);

  if (!parseResult.success)
    return { success: false, cause: parseResult.error.errors[0].message };

  const [queryResult, queryError] = await safePromise(
    fetchQuery(
      api.users.queries.getUsersFromId,
      { userIds: parseResult.data },
      { token },
    ),
  );

  if (queryError) return { success: false, cause: queryError.message };
  if (!queryResult.success) return { success: false, cause: queryResult.cause };

  const resolvedUsers = queryResult.value.map((u) => ({
    name: getUserName(u!),
    avatar: u?.image,
  }));

  return { success: true, value: resolvedUsers };
}
