import { redis } from "@/redis";
import { api } from "@convex/_generated/api";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { zid } from "convex-helpers/server/zod";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { redirect, RedirectType } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ inviteId: string }>;
  },
) {
  const { getAccessTokenRaw, isAuthenticated, getUser } =
    getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect("/api/auth/login", RedirectType.replace);

  const token = (await getAccessTokenRaw()) ?? undefined;

  const { inviteId } = await params;
  const parseResult = zid("organizationInvites").safeParse(inviteId);

  if (!parseResult.success)
    return NextResponse.json(
      { status: "failure", cause: "Invalid invite ID" },
      { status: 400 },
    );

  const cacheResult = await redis.get(`org-invite:${parseResult.data}`);
  if (!cacheResult)
    return NextResponse.json(
      {
        status: "failure",
        cause: "Invalid invite ID",
      },
      { status: 404 },
    );

  const queryResult = await fetchQuery(
    api.organizationInvites.queries.getInvitation,
    {
      inviteId: parseResult.data,
    },
    { token },
  );

  if (!queryResult.success)
    return NextResponse.json(
      { status: "failure", cause: queryResult.cause },
      { status: 400 },
    );

  const user = await getUser();

  const invitation = queryResult.value;

  if (!user?.email || !invitation.allowedEmails.includes(user?.email))
    return NextResponse.json(
      {
        status: "failure",
        cause: "You are not authorized for this invitation",
      },
      { status: 401 },
    );

  const mutationResult = await fetchMutation(
    api.organizationInvites.mutations.acceptInvitation,
    {
      invitationId: invitation._id,
      organizationId: invitation.organizationId,
      newAllowedEmails: invitation.allowedEmails.filter(
        (e) => e !== user?.email,
      ),
    },
    { token },
  );

  if (!mutationResult.success)
    return NextResponse.json(
      {
        status: "failure",
        cause: mutationResult.cause,
      },
      { status: 500 },
    );

  redirect("/", RedirectType.replace);
}
