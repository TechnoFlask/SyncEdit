import { Navbar } from "@/features/home/navigation/Navbar";
import { TemplateGallery } from "@/features/home/templates/TemplateGallery";
export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-200">
      <Navbar />
      <TemplateGallery />
    </div>
  );
}
