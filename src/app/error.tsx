"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function getTitle(message: string) {
  if (message.includes("not auth")) return "Access Denied";
  if (message.includes("not found")) return "Page Not Found";
  return "Something Went Wrong";
}

function getDescription(message: string) {
  if (message.includes("not auth"))
    return "You don't have permission to view this document.";
  if (message.includes("not found"))
    return "The document you're looking for doesn't exist.";
  return "An unexpected error occurred. Please try again later.";
}

function getAction(message: string): "goBack" | "goHome" | "retry" {
  if (message.includes("not auth")) return "goHome";
  if (message.includes("Not Found")) return "goBack";
  return "retry";
}
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const title = getTitle(error.message);
  const description = getDescription(error.message);
  const action = getAction(error.message);
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/alert-triangle.svg"
        width={90}
        height={90}
        alt="Alert triangle logo"
      />
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mb-4 text-xl">{description}</p>
      <div className="flex gap-4">
        {action === "goBack" && (
          <Button
            variant="secondary"
            className="text-lg transition-colors duration-200 hover:bg-gray-600 hover:text-white"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        )}

        {action === "goHome" && (
          <Button
            variant="secondary"
            className="text-lg transition-colors duration-200 hover:bg-gray-600 hover:text-white"
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        )}

        {action === "retry" && (
          <Button
            variant="secondary"
            className="text-lg transition-colors duration-200 hover:bg-gray-600 hover:text-white"
            onClick={() => reset()}
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}
