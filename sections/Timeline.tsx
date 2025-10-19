/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useInView, Variants, useReducedMotion } from "framer-motion";

interface Timeline {
  id: number;
  title: string;
  waktu: string;
}

const GradientText = ({ children, className }: any) => (
  <span
    className={`bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent ${className}`}
    style={{
      willChange: "background-position",
      transform: "translateZ(0)",
    }}
  >
    {children}
  </span>
);

const Timeline = () => {
  const [data, setData] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div
      className="min-h-screen py-20 px-4 md:px-8 lg:px-0 relative overflow-hidden bg-slate-950"
      style={{
        contain: "layout style",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            type: "tween" as const,
          }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl mt-15 md:text-6xl font-medium font-funky tracking-tight mb-4">
            <GradientText className="custom-class">Timeline</GradientText>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Ikuti perjalanan acara kami dari awal hingga akhir
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-violet-500/50 to-purple-500/50 transform -translate-x-1/2" />

          {data.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              totalItems={data.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  item: Timeline;
  index: number;
  totalItems: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  });
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  const [isCardVisible, setIsCardVisible] = useState(false);

  const containerVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        x: prefersReducedMotion ? 0 : isEven ? -30 : 30,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.4,
          delay: index * 0.06,
          type: "tween" as const,
          ease: "easeOut" as const,
        },
      },
    }),
    [isEven, index, prefersReducedMotion]
  );

  const numberVariants = useMemo<Variants>(
    () => ({
      hidden: { scale: 0 },
      visible: {
        scale: 1,
        transition: {
          delay: index * 0.06 + 0.2,
          type: "tween" as const,
          duration: 0.3,
          ease: "easeOut" as const,
        },
      },
    }),
    [index]
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (Math.abs(x - lastX) > 5 || Math.abs(y - lastY) > 5) {
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
          lastX = x;
          lastY = y;
        }
      });
    };

    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative mb-12 md:mb-16 ${
        isEven ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
      }`}
      style={{
        contain: "layout style",
      }}
    >
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-violet-500/50" />

      <div
        className={`flex items-center gap-6 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <motion.div
          variants={numberVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`relative z-20 ${isEven ? "md:ml-auto" : "md:mr-auto"}`}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 shadow-lg shadow-purple-500/50 relative">
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>

            {isCardVisible && isInView && (
              <div
                className="absolute inset-0 rounded-full bg-purple-500 opacity-50"
                style={{
                  animation: `ping-slow 2s cubic-bezier(0, 0, 0.2, 1) 3`,
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            )}
          </div>
        </motion.div>

        <div className="flex-1 ml-3 md:ml-0">
          <div
            ref={cardRef}
            className="relative group timeline-card"
            style={
              {
                "--mouse-x": "0px",
                "--mouse-y": "0px",
              } as React.CSSProperties
            }
          >
            {isCardVisible && (
              <>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(147, 51, 234, 0.15), transparent 40%)`,
                  }}
                />
              </>
            )}

            <div
              className="relative bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-2xl hover:border-purple-500/60 transition-all duration-300"
              style={{
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-bl-3xl rounded-tr-2xl" />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    delay: index * 0.06 + 0.25,
                    duration: 0.3,
                    type: "tween" as const,
                  }}
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full"
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
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 5 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }
                  }
                  transition={{
                    delay: index * 0.06 + 0.3,
                    duration: 0.3,
                    type: "tween" as const,
                  }}
                  className="text-lg md:text-2xl font-bold text-white mb-2 leading-tight"
                >
                  {item.title}
                </motion.h3>

                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{
                    delay: index * 0.06 + 0.35,
                    duration: 0.5,
                    type: "tween" as const,
                  }}
                  className="h-1 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-full mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
