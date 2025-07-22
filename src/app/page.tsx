import { Navbar } from "@/features/home/navigation/Navbar";
import { RecentDocuments } from "@/features/home/recents/RecentDocuments";
import { TemplateGallery } from "@/features/home/templates/TemplateGallery";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-200">
      <Navbar />
      <TemplateGallery />

      <Suspense
        fallback={<div className="w-full grow animate-pulse bg-white" />}
      >
        <RecentDocuments />
      </Suspense>
    </div>
  );
}
