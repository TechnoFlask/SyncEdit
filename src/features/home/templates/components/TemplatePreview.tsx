import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export function TemplatePreview({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  return (
    <CarouselItem
      key={label}
      className="flex basis-1/2 flex-col gap-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.2857%]"
    >
      <div className="group relative overflow-hidden">
        <Image
          src={src}
          alt={label}
          height={150}
          width={150}
          className="cursor-pointer"
        />
        <div className="absolute inset-0 -translate-y-full bg-black/30 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100" />
      </div>
      <p className="font-semibold">{label}</p>
    </CarouselItem>
  );
}
