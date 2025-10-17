"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useEffect, useState, useMemo, memo } from "react";
import Image from "next/image";
import GradientText from "@/components/GradientText";

interface Partner {
  id: number;
  photo: string;
}

const PartnerCard = memo(({ photo, id }: Partner) => {
  return (
    <figure
      className={cn(
        "relative h-32 w-48 cursor-pointer overflow-hidden rounded-xl p-4",
        "transition-transform duration-300 ease-out",
        "hover:scale-105 will-change-transform"
      )}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        contain: "layout style paint",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={photo}
          alt={`Partner ${id}`}
          fill
          className="object-contain"
          sizes="192px"
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjEyOCIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
          priority={false}
        />
      </div>
    </figure>
  );
});

PartnerCard.displayName = "PartnerCard";

const MediaPartner = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partner", {
          cache: "force-cache",
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

  const { firstRow, secondRow } = useMemo(() => {
    const midpoint = Math.ceil(partners.length / 2);
    return {
      firstRow: partners.slice(0, midpoint),
      secondRow: partners.slice(midpoint),
    };
  }, [partners]);

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

  return (
    <div style={{ contain: "layout style" }}>
      <h1
        id="partner"
        className="text-4xl mt-15 md:text-6xl font-medium font-funky tracking-tight mb-8"
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

      <div
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg py-10"
        style={{
          contain: "layout style paint",
          willChange: "auto",
        }}
      >
        <div className="w-full mb-4" style={{ contain: "layout" }}>
          <Marquee
            pauseOnHover
            className="[--duration:30s]"
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            {firstRow.map((partner) => (
              <PartnerCard key={partner.id} {...partner} />
            ))}
          </Marquee>
        </div>
        {secondRow.length > 0 && (
          <div className="w-full" style={{ contain: "layout" }}>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:25s]"
              style={{
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            >
              {secondRow.map((partner) => (
                <PartnerCard key={partner.id} {...partner} />
              ))}
            </Marquee>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 z-10"
          style={{
            background:
              "linear-gradient(to right, rgb(3 7 18) 0%, rgba(3, 7, 18, 0.8) 50%, transparent 100%)",
            willChange: "auto",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 z-10"
          style={{
            background:
              "linear-gradient(to left, rgb(3 7 18) 0%, rgba(3, 7, 18, 0.8) 50%, transparent 100%)",
            willChange: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default memo(MediaPartner);
