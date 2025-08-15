"use client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";
import { getAllRoomMembers } from "./actions";

export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams();
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={async ({ userIds }) => {
        const actionResult = await getAllRoomMembers(userIds);
        if (!actionResult.success) {
          toast.error("Failed to fetch room members");
          return;
        }

        return actionResult.value;
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
