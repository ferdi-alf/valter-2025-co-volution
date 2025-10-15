"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { LogoIntro } from "./LogoIntro";
import Navbar from "./Navbar";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  useEffect(() => {
    const contentPreloadTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        setShowContent(true);
      });
    }, 1200);

    const navbarTimer = setTimeout(() => {
      setShowNavbar(true);
    }, 1400);

    return () => {
      clearTimeout(navbarTimer);
      clearTimeout(contentPreloadTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && <LogoIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <Navbar show={showNavbar} />

      {showContent && children}
    </>
  );
}
