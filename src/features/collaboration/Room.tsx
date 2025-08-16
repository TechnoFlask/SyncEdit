"use client";

import { getUserName } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams();
  const currentOrganizationId = useQuery(
    api.documents.queries.getDocumentOrganizationId,
    { documentId: documentId as Id<"documents"> },
  );
  const organizationMembersQuery = useQuery(
    api.organizations.queries.getCurrentOrganizationMembers,
    currentOrganizationId?.success && currentOrganizationId.value
      ? { organizationId: currentOrganizationId.value }
      : "skip",
  );

  if (!organizationMembersQuery?.success) return null;

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={async ({ userIds }) => {
        const allUsers = organizationMembersQuery.value;

        return userIds.map((uid) => {
          console.log(uid);
          const targetUser = allUsers.find((u) => uid.startsWith(u._id));
          console.log(targetUser);
          if (!targetUser) return undefined;

          return { name: getUserName(targetUser), avatar: targetUser.image };
        });
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const allUsers = organizationMembersQuery.value;

        if (text)
          return allUsers
            .filter((u) =>
              getUserName(u).toLowerCase().includes(text.toLowerCase()),
            )
            .map((u) => u._id);

        return allUsers.map((u) => u._id);
      }}
    >
      <RoomProvider id={documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
