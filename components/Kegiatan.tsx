"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 hover:cursor-pointer items-center justify-center rounded-full border-2 bg-white p-1.5 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

interface ContactPerson {
  nama: string;
  nohp: string;
}

interface Timeline {
  judul: string;
  waktu: string;
}

interface Kegiatan {
  id: number;
  title: string;
  description: string;
  logo: string;
  harga: {
    idr: number;
  };
  contactPerson: ContactPerson;
  timeline: Timeline;
}

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await fetch("/api/kegiatan");
        const result = await response.json();

        if (result.success) {
          setKegiatan(result.data);
        }
      } catch (error) {
        console.error("Error fetching kegiatan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKegiatan();
  }, []);

  if (loading) {
    return (
      <div className="relative flex h-[300px] w-full items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden py-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            {kegiatan[0] && (
              <Image
                height={580}
                width={580}
                src={kegiatan[0].logo}
                alt={kegiatan[0].title}
                className="w-full h-full object-contain"
              />
            )}
          </Circle>
          <Circle ref={div2Ref}>
            {kegiatan[1] && (
              <Image
                height={580}
                width={580}
                src={kegiatan[1].logo}
                alt={kegiatan[1].title}
                className="w-full h-full object-contain"
              />
            )}
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-center">
          <Circle ref={centerRef} className="size-16">
            <Image
              height={580}
              width={580}
              src="/assets/logo.png"
              alt="Logo Website"
              className="w-full h-full object-contain"
            />
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            {kegiatan[2] && (
              <Image
                height={580}
                width={580}
                src={kegiatan[2].logo}
                alt={kegiatan[2].title}
                className="w-full h-full object-contain"
              />
            )}
          </Circle>
          <Circle ref={div4Ref}>
            {kegiatan[3] && (
              <Image
                height={580}
                width={580}
                src={kegiatan[3].logo}
                alt={kegiatan[3].title}
                className="w-full h-full object-contain"
              />
            )}
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        pathWidth={3}
        pathColor="#ffffff"
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
      />

      <AnimatedBeam
        pathWidth={3}
        pathColor="#ffffff"
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={centerRef}
        curvature={75}
        endYOffset={-10}
      />

      <AnimatedBeam
        pathWidth={3}
        pathColor="#ffffff"
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={centerRef}
        curvature={-75}
        endYOffset={10}
      />

      <AnimatedBeam
        pathWidth={3}
        pathColor="#ffffff"
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
      />
    </div>
  );
}
