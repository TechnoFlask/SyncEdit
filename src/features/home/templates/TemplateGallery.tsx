import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TemplatePreview } from "./components/TemplatePreview";

const TEMPLATES = Object.freeze([
  {
    src: "/blank-document.svg",
    label: "Blank document",
  },
  { src: "/business-letter.svg", label: "Business letter" },
  { src: "/cover-letter.svg", label: "Cover letter" },
  { src: "/letter.svg", label: "Letter" },
  { src: "/project-proposal.svg", label: "Project proposal" },
  { src: "/resume.svg", label: "Resume" },
  { src: "/software-proposal.svg", label: "Software proposal" },
] as const);

export function TemplateGallery() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-4 px-16 py-6">
      <p className="ml-8 text-xl font-medium">Start a new document</p>
      <Carousel>
        <CarouselContent className="ml-4">
          {TEMPLATES.map((template) => (
            <TemplatePreview
              key={template.label}
              src={template.src}
              label={template.label}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="2xl:invisible" />
        <CarouselNext className="2xl:invisible" />
      </Carousel>
    </div>
  );
}
