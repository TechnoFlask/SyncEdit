"use client";

import { toast } from "@/components/custom/toast";
import { CarouselItem } from "@/components/ui/carousel";
import { useOrganizationContext } from "@/features/organization-switcher/context/OrganizationContext";
import { api } from "@convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import Image from "next/image";
import { useCallback, useState } from "react";

export function TemplatePreview({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const { isAuthenticated } = useConvexAuth();
  const { currentOrganization } = useOrganizationContext();
  const createDocument = useMutation(api.documents.mutations.createNewDocument);
  const [isCreating, setIsCreating] = useState(false);

  const handleDocumentCreation = useCallback(
    async (title: string | undefined, initialContent: string | undefined) => {
      if (!isAuthenticated) return window.open("/document/notAuthenticated");

      setIsCreating(true);

      try {
        const documentCreationResult = await createDocument({
          title,
          content: initialContent,
          organizationId:
            !currentOrganization.canInviteOthers &&
            currentOrganization.name === "Default"
              ? undefined
              : currentOrganization.id,
        });
        if (!documentCreationResult.success) {
          toast.error(documentCreationResult.cause);
          return;
        }

        window.open(`/document/${documentCreationResult.value}`, "_blank");
      } finally {
        setIsCreating(false);
      }
    },
    [createDocument, isAuthenticated, currentOrganization],
  );

  return (
    <CarouselItem
      key={label}
      className="flex basis-1/2 flex-col gap-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.2857%]"
    >
      <div>
        <button
          className="group relative overflow-hidden"
          disabled={isCreating}
          onClick={() => {
            handleDocumentCreation(label, "");
          }}
        >
          <Image
            src={src}
            alt={label}
            height={150}
            width={150}
            className="cursor-pointer group-disabled:cursor-not-allowed"
          />
          <div className="absolute inset-0 -translate-y-full bg-black/30 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-disabled:cursor-not-allowed group-disabled:bg-gray-500/30" />
        </button>
        <p className="font-semibold">{label}</p>
      </div>
    </CarouselItem>
  );
}
