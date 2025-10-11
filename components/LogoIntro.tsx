"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const LogoIntro = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-zinc-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute w-64 h-64 blur-3xl bg-purple-500/30 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        layoutId="logo-transition"
        style={{
          width: 128,
          height: 128,
        }}
        animate={{ opacity: 1 }}
      >
        <Image
          src="/assets/logo.png"
          alt="Valter 2025"
          width={128}
          height={128}
          priority
          className="w-full h-full"
        />
      </motion.div>
      <motion.p
        className="absolute font-funky text-2xl font-bold text-white"
        style={{ top: "calc(50% + 90px)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -90,
          scale: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
      >
        Valter 2025
      </motion.p>
    </motion.div>
  );
};
