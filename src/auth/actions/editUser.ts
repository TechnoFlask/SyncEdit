"use server";

import { api } from "@convex/_generated/api";
import { userSchema } from "@convex/schema";
import { Result } from "@convex/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export async function editUser(
  userData: unknown,
): Promise<Result<string, string>> {
  const { getAccessTokenRaw, isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect("/api/auth/login");

  const parseResult = userSchema
    .pick({
      firstName: true,
      lastName: true,
      userName: true,
    })
    .safeParse(userData);

  if (!parseResult.success)
    return {
      success: false,
      cause: parseResult.error.errors.reduce(
        (acc, curr) => `${acc}\n ${curr}`,
        "",
      ),
    };

  const token = (await getAccessTokenRaw()) ?? undefined;

  const mutationResult = await fetchMutation(
    api.users.mutations.updateUser,
    {
      userUpdateData: parseResult.data,
    },
    { token },
  );

  return mutationResult;
}
