"use client";
import GradientText from "@/components/GradientText";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Timeline {
  id: number;
  title: string;
  waktu: string;
}

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
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-0 relative overflow-hidden">
      <div className="absolute inset-0 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl mt-15 md:text-6xl font-medium font-funky tracking-tight mb-4">
            <GradientText
              colors={["#5d0ec0", "#9810fa", "#8a0194", "#9810fa", "#5d0ec0"]}
              animationSpeed={6}
              showBorder={false}
              className="custom-class"
            >
              Timeline
            </GradientText>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Ikuti perjalanan acara kami dari awal hingga akhir
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-violet-500/50 to-purple-500/50" />

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative mb-12 md:mb-16 ${
        isEven ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
      }`}
    >
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-violet-500/50" />

      <div
        className={`flex items-center gap-6 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            delay: index * 0.1 + 0.3,
            type: "spring",
            stiffness: 200,
          }}
          className={`relative z-20 ${isEven ? "md:ml-auto" : "md:mr-auto"}`}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 shadow-lg shadow-purple-500/50 relative">
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>

            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex-1 ml-20 md:ml-0"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-2xl hover:border-purple-500/60 transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-bl-3xl rounded-tr-2xl" />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: index * 0.1 + 0.4 }}
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
                  <span className="text-sm font-medium text-purple-300">
                    {item.waktu}
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight"
                >
                  {item.title}
                </motion.h3>

                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-full mt-4"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Timeline;
