import { safePromise } from "@/lib/helpers";
import { getUserName } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { fetchQuery } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  const { getAccessTokenRaw } = getKindeServerSession();
  const tokenPromise = getAccessTokenRaw();
  if (!tokenPromise)
    return NextResponse.json(
      {
        success: false,
        cause: "User not authenticated",
      },
      { status: 401 },
    );

  const [token, tokenErr] = await safePromise(tokenPromise);
  if (tokenErr)
    return NextResponse.json(
      { success: false, cause: tokenErr },
      { status: 400 },
    );

  const [userQueryResult, userQueryResultErr] = await safePromise(
    fetchQuery(api.users.queries.getCurrentUser, {}, { token }),
  );
  if (userQueryResultErr)
    return NextResponse.json(
      { success: false, cause: userQueryResultErr },
      { status: 400 },
    );

  if (!userQueryResult.success)
    return NextResponse.json(userQueryResult, { status: 400 });

  const currentUser = userQueryResult.value;

  const [{ room }, reqErr] = await safePromise(req.json());
  if (reqErr)
    return NextResponse.json(
      { success: false, cause: reqErr },
      { status: 400 },
    );
  const documentId = room as Id<"documents">;

  const [targetDocumentQueryResult, targetDocumentQueryResultErr] =
    await safePromise(
      fetchQuery(
        api.documents.queries.getDocumentById,
        { documentId },
        { token },
      ),
    );
  if (targetDocumentQueryResultErr)
    return NextResponse.json(
      { success: false, cause: targetDocumentQueryResultErr },
      { status: 400 },
    );

  if (!targetDocumentQueryResult.success)
    return NextResponse.json(targetDocumentQueryResult, { status: 400 });

  const targetDocument = targetDocumentQueryResult.value;

  const liveblocksId =
    currentUser._id + "-" + crypto.randomUUID().split("-").join("");

  const userSession = liveblocks.prepareSession(liveblocksId, {
    userInfo: {
      name: getUserName(currentUser),
      avatar: currentUser.image,
    },
  });
  userSession.allow(
    room,
    targetDocument.access === "read"
      ? userSession.READ_ACCESS
      : userSession.FULL_ACCESS,
  );
  const [sessionAuth, sessionAuthErr] = await safePromise(
    userSession.authorize(),
  );
  if (sessionAuthErr)
    return NextResponse.json(
      { success: false, cause: sessionAuthErr },
      { status: 403 },
    );

  const { body, status, error } = sessionAuth;
  if (error)
    return NextResponse.json({ success: false, cause: error }, { status });

  return new NextResponse(body, { status });
}
