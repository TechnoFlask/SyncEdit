import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { NextResponse } from "next/server";
import { z } from "zod";

const zUserCreatedSchema = z.object({
  user: z.object({
    id: z.string().startsWith("kp_"),
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    username: z.string().nullable().optional(),
  }),
});

type UserCreatedJWTPayload = z.infer<typeof zUserCreatedSchema>;

type KindeCreatedEvent<
  T extends UserCreatedJWTPayload = UserCreatedJWTPayload,
> = {
  type: "user.created";
  data: T;
};

type KindeEvent<
  A extends UserCreatedJWTPayload = UserCreatedJWTPayload,
  B = unknown,
> = JwtPayload &
  (
    | KindeCreatedEvent<A>
    | {
        type: "user.updated" | "user.deleted";
        data: B;
      }
  );

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

async function getSigningKey(header: JwtHeader): Promise<string> {
  if (!header.kid) throw new Error("No KID in JWT header");
  const key = await client.getSigningKey(header.kid);
  return key.getPublicKey();
}

async function decodeJWT(jwtToken: string) {
  const decodedHeader = jwt.decode(jwtToken, { complete: true }) as {
    header: JwtHeader;
  } | null;

  if (!decodedHeader) throw new Error("Invalid token");
  const signingKey = await getSigningKey(decodedHeader.header);

  return jwt.verify(jwtToken, signingKey) as KindeEvent;
}

async function handleUserCreatedJWT(userData: unknown) {
  const userDataParseResult = zUserCreatedSchema.safeParse(userData);
  if (!userDataParseResult.success)
    return NextResponse.json({ message: "Malformed JWT" }, { status: 400 });

  const parsedUserData = userDataParseResult.data.user;

  await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: "webhook/mutations:addUser",
      args: {
        secret: process.env.WEBHOOK_SECRET,
        userData: {
          userId: parsedUserData.id,
          firstName: parsedUserData.first_name,
          lastName: parsedUserData.last_name,
          userName: parsedUserData.username,
          email: parsedUserData.email,
        },
      },
      format: "json",
    }),
  });
}

async function handleUserUpdatedJWT() {}

async function handleUserDeletedJWT() {}

const eventActionMapper = Object.freeze({
  "user.created": handleUserCreatedJWT,
  "user.updated": handleUserUpdatedJWT,
  "user.deleted": handleUserDeletedJWT,
} as Record<KindeEvent["type"], (data: unknown) => void>);

export async function POST(request: Request) {
  try {
    const token = await request.text();

    const event = await decodeJWT(token);

    eventActionMapper[event.type](event.data);

    return NextResponse.json({ status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}
