import { customCtx } from "convex-helpers/server/customFunctions";
import { zCustomMutation, zCustomQuery } from "convex-helpers/server/zod";
import { mutation, query } from "./_generated/server";

export const zAuthQuery = zCustomQuery(
  query,
  customCtx(async ({ auth }) => {
    const user = await auth.getUserIdentity();
    if (user == null)
      return {
        success: false,
        cause: "User not authenticated",
      };

    return { success: true, value: user };
  }),
);

export const zAuthMutation = zCustomMutation(
  mutation,
  customCtx(async ({ auth }) => {
    const user = await auth.getUserIdentity();
    if (user == null)
      return {
        success: false,
        cause: "User not authenticated",
      };

    return { success: true, value: user };
  }),
);
