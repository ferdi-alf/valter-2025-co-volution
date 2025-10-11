"use client";
import Lanyard from "@/components/Lanyard";
import LaserFlow from "@/components/LaserFlow";
import { ShineBorder } from "@/components/ui/shine-border";
import { useState, useEffect } from "react";

export default function Features() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const topPosition = isMobile ? "50%" : "50%";
  const lanyardSize: [number, number, number] = isMobile
    ? [0, 0, 15]
    : [0, 0, 12];
  const verticalBeamOffset = isMobile ? 0.0 : 0.0;

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={verticalBeamOffset}
        color="#6e11b0"
      />

      <div
        className="rounded-3xl "
        style={{
          position: "absolute",
          top: topPosition,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          zIndex: 6,
        }}
      >
        <div className="relative w-full h-full rounded-3xl ">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#7f22fe"]} />
          <div className="grid justify-end grid-cols-1 divide-y-reverse md:grid-cols-2">
            <div className="p-5 lg:order-1 order-2">
              <h1 className="font-black text-center lg:order-1 text-4xl md:mb-3">
                Co-Create or <br /> Compete
              </h1>
              <p className="md:text-xl text-sm md:text-center text-start font-light text font-serif mt-5 md:mt-32">
                Seminar VALTER 2025 hadir sebagai acara puncak dari Festival
                Multimedia dan Komputer (VALTER)! Dengan mengusung tema
                “CoCreate or Compete: Kolaborasi atau Kompetisi bersama AI”,
                seminar ini menjadi momen spesial yang menghadirkan Kevin
                Anggara, content creator dan penulis muda sebagai GUEST STAR
                inspiratif untuk berbagi pengalaman dan insight terbaru. Seminar
                ini menggali bagaimana kreativitas, teknologi, dan AI dapat
                berjalan berdampingan, sekaligus menjadi tantangan di era
                digital dan content creation
              </p>
            </div>
            <div className="lg:order-2 order-1">
              <Lanyard position={lanyardSize} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
