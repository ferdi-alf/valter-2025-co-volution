"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import GradientText from "@/components/GradientText";

interface Partner {
  id: number;
  photo: string;
}

const PartnerCard = ({ photo, id }: Partner) => {
  return (
    <figure
      className={cn(
        "relative  h-32 w-48 cursor-pointer overflow-hidden rounded-xl p-4 transition-all duration-300"
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={photo}
          alt={`Partner ${id}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 192px"
          loading="lazy"
          quality={85}
        />
      </div>
    </figure>
  );
};

const MediaPartner = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partner", {
          next: { revalidate: 3600 },
        });
        const result = await response.json();

        if (result.success) {
          setPartners(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
        <div className="flex items-center gap-2 text-purple-300">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          <span className="text-sm">Loading partners...</span>
        </div>
      </div>
    );
  }

  const firstRow = partners.slice(0, Math.ceil(partners.length / 2));
  const secondRow = partners.slice(Math.ceil(partners.length / 2));

  return (
    <>
      <h1
        id="partner"
        className=" text-4xl mt-15 md:text-6xl   font-medium font-funky tracking-tighte"
      >
        <GradientText
          colors={["#5d0ec0", "#9810fa", "#8a0194", "#9810fa", "#5d0ec0"]}
          animationSpeed={6}
          showBorder={false}
          className="custom-class"
        >
          Media Partner
        </GradientText>
      </h1>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  py-10">
        <Marquee pauseOnHover className="[--duration:30s] mb-4">
          {firstRow.map((partner) => (
            <PartnerCard key={partner.id} {...partner} />
          ))}
        </Marquee>

        {secondRow.length > 0 && (
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {secondRow.map((partner) => (
              <PartnerCard key={partner.id} {...partner} />
            ))}
          </Marquee>
        )}

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />

        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10" />
      </div>
    </>
  );
};

export default MediaPartner;
