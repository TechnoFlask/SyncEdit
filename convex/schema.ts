import { zid, zodOutputToConvex } from "convex-helpers/server/zod";
import { defineSchema, defineTable } from "convex/server";
import { z } from "zod";

export const userSchema = z.object({
  userId: z.string().startsWith("kp_"),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  userName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export const organizationSchema = z.object({
  name: z.string().min(5),
  ownerId: zid("users"),
  imageUrl: z.string().optional(),
});

export const documentSchema = z.object({
  title: z.string().min(1),
  initialContent: z.string().optional(),
  ownerId: zid("users"),
  organizationId: zid("organizations").optional(),
  roomId: z.string().optional(),
  visibility: z
    .union([z.literal("public"), z.literal("limited")])
    .default("limited"),
});

export const permissionSchema = z.object({
  documentId: zid("documents"),
  userId: zid("users").optional(),
  accessLevel: z.union([z.literal("read"), z.literal("edit")]).default("read"),
});

export const organizationMemberSchema = z.object({
  organizationId: zid("organizations"),
  userId: zid("users"),
});

export default defineSchema({
  users: defineTable(zodOutputToConvex(userSchema))
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),
  documents: defineTable(zodOutputToConvex(documentSchema))
    .index("by_ownerId_organizationId", ["ownerId", "organizationId"])
    .index("by_organizationId", ["organizationId"]),
  organizations: defineTable(zodOutputToConvex(organizationSchema)).index(
    "by_ownerId",
    ["ownerId"],
  ),
  permissions: defineTable(zodOutputToConvex(permissionSchema)).index(
    "by_documentId_userId",
    ["documentId", "userId"],
  ),
  organizationMembers: defineTable(zodOutputToConvex(organizationMemberSchema))
    .index("by_organizationId_userId", ["organizationId", "userId"])
    .index("by_userId", ["userId"]),
});
