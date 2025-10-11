"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Navbar muncul sebelum logo sampai
    const navbarTimer = setTimeout(() => {
      setShowNavbar(true);
    }, 1500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1600);

    return () => {
      clearTimeout(navbarTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

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
