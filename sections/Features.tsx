"use client";

import LaserFlow from "@/components/LaserFlow";
import MagicBento from "@/components/MagicBento";
import { useState, useEffect, useRef } from "react";

export default function Features() {
  const [isMobile, setIsMobile] = useState(false);
  const lanyardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !lanyardRef.current) return;

    const lanyardArea = lanyardRef.current;

    // Prevent scroll only when touching lanyard area
    const preventScroll = (e: TouchEvent) => {
      e.stopPropagation();
    };

    lanyardArea.addEventListener("touchstart", preventScroll, {
      passive: false,
    });
    lanyardArea.addEventListener("touchmove", preventScroll, {
      passive: false,
    });

    return () => {
      lanyardArea.removeEventListener("touchstart", preventScroll);
      lanyardArea.removeEventListener("touchmove", preventScroll);
    };
  }, [isMobile]);

  const topPosition = isMobile ? "50%" : "50%";

  const verticalBeamOffset = isMobile ? 0.0 : 0.0;

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.2}
        verticalBeamOffset={verticalBeamOffset}
        color="#6e11b0"
      />

      <div
        className="rounded-3xl"
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
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
    </div>
  );
}
