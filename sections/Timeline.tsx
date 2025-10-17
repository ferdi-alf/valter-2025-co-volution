/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useRef } from "react";

interface Timeline {
  id: number;
  title: string;
  waktu: string;
}

const GradientText = ({ children, className }: any) => (
  <span
    className={`bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

const Timeline = () => {
  const [data, setData] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/timeline");
        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.log("error mendapatkan data", error);

        setData([
          { id: 1, title: "Pembukaan VALTER 2025", waktu: "15 Januari 2025" },
          {
            id: 2,
            title: "Seminar AI & Content Creation",
            waktu: "20 Januari 2025",
          },
          { id: 3, title: "Workshop Multimedia", waktu: "25 Januari 2025" },
          { id: 4, title: "Kompetisi Desain", waktu: "1 Februari 2025" },
          {
            id: 5,
            title: "Penutupan & Pengumuman Pemenang",
            waktu: "10 Februari 2025",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="relative flex h-[300px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Loading Timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-0 relative overflow-hidden ">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 opacity-0 animate-fadeInDown">
          <h1 className="text-4xl mt-15 md:text-6xl font-medium font-funky tracking-tight mb-4">
            <GradientText className="custom-class">Timeline</GradientText>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Ikuti perjalanan acara kami dari awal hingga akhir
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-violet-500/50 to-purple-500/50 transform -translate-x-1/2" />

          {data.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

interface TimelineItemProps {
  item: Timeline;
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // Intersection Observer untuk detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking - HANYA saat hover
  useEffect(() => {
    if (!isHovered || !cardRef.current) return;

    const card = cardRef.current;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
        setMouseY(e.clientY - rect.top);
        rafId = null;
      });
    };

    card.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHovered]);

  return (
    <div
      ref={itemRef}
      className={`relative mb-12 md:mb-16 ${
        isEven ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0)"
          : `translateX(${isEven ? "-30px" : "30px"})`,
        transition: `all 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Mobile vertical line */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-violet-500/50" />

      <div
        className={`flex items-center gap-6 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Number Circle */}
        <div
          className={`relative z-20 ${isEven ? "md:ml-auto" : "md:mr-auto"}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0)",
            transition: `all 0.5s ease-out ${index * 0.1 + 0.2}s`,
          }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 shadow-lg shadow-purple-500/50 relative">
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>

            {/* Ping effect - hanya sekali saat muncul */}
            {isVisible && (
              <div
                className="absolute inset-0 rounded-full bg-purple-500 opacity-50 animate-ping"
                style={{
                  animationIterationCount: "1",
                  animationDuration: "1.5s",
                }}
              />
            )}
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 ml-3 md:ml-0">
          <div
            ref={cardRef}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Hover glow effects */}
            {isHovered && (
              <>
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl opacity-30 blur-xl transition-opacity duration-500"
                  style={{ willChange: "opacity" }}
                />
                <div
                  className="absolute -inset-1 rounded-2xl opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
                  }}
                />
              </>
            )}

            <div
              className="relative bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-300"
              style={{
                borderColor: isHovered
                  ? "rgba(168, 85, 247, 0.6)"
                  : "rgba(168, 85, 247, 0.3)",
              }}
            >
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-bl-3xl rounded-tr-2xl" />

              <div className="relative z-10">
                {/* Date badge */}
                <div
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.9)",
                    transition: `all 0.5s ease-out ${index * 0.1 + 0.3}s`,
                  }}
                >
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="md:text-sm text-xs font-medium text-purple-300">
                    {item.waktu}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg md:text-2xl font-bold text-white mb-2 leading-tight"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(5px)",
                    transition: `all 0.5s ease-out ${index * 0.1 + 0.35}s`,
                  }}
                >
                  {item.title}
                </h3>

                {/* Bottom gradient line */}
                <div
                  className="h-1 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-full mt-4"
                  style={{
                    width: isVisible ? "100%" : "0%",
                    transition: `width 0.8s ease-out ${index * 0.1 + 0.4}s`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
