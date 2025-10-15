"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { BorderBeam } from "./ui/border-beam";
import { useState } from "react";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/#about" },
  { name: "Kegiatan", href: "/#kegiatan" },
  { name: "Partner", href: "/#partner" },
  { name: "Sponsor", href: "/#sponsor" },
];

const Navbar = ({ show }: { show: boolean }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navbarPadding = useTransform(scrollY, [0, 100], [12, 8]);
  const logoSize = useTransform(scrollY, [0, 100], [40, 32]);

  if (!show) return null;

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="lg:px-36 px-2 fixed z-[9999] w-full">
        <div className="pt-3 z-50 flex justify-center items-center top-0 right-0">
          <div className="w-full">
            <motion.div
              className="relative  backdrop-blur-xl overflow-hidden text-white border-t border-purple-500/20 bg-slate-900/40 shadow-2xl rounded-2xl"
              style={{ padding: navbarPadding }}
            >
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className="flex gap-2 items-center group"
                  onClick={closeMobileMenu}
                >
                  <motion.div
                    layoutId="logo-transition"
                    style={{
                      width: logoSize,
                      height: logoSize,
                    }}
                    transition={{
                      type: "tween",
                      stiffness: 150,
                      damping: 20,
                    }}
                  >
                    <Image
                      src="/assets/logo.png"
                      height={40}
                      width={40}
                      alt="logo valter 2025"
                      className="w-full h-full"
                    />
                  </motion.div>

                  <motion.p className="lg:text-lg text-xs font-funky bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Valter 2025
                  </motion.p>
                </Link>

                <nav className="hidden lg:flex items-center gap-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                        {hoveredIndex === index && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 bg-purple-500/10 rounded-lg border border-purple-500/20"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.button
                  className="lg:hidden p-2 text-gray-300 hover:text-white relative z-50"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMobileMenuClick}
                >
                  <motion.div
                    animate={mobileMenuOpen ? "open" : "closed"}
                    className="w-6 h-6 flex flex-col justify-center items-center"
                  >
                    <motion.span
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: 45, y: 6 },
                      }}
                      className="w-6 h-0.5 bg-current block mb-1.5"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                      }}
                      className="w-6 h-0.5 bg-current block mb-1.5"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: -45, y: -6 },
                      }}
                      className="w-6 h-0.5 bg-current block"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.button>
              </div>

              <BorderBeam
                duration={12}
                size={100}
                className="from-transparent via-purple-500 to-fuchsia-900"
              />
              <BorderBeam
                duration={12}
                size={100}
                delay={6}
                className="from-transparent via-purple-500 to-fuchsia-900"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
              onClick={closeMobileMenu}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-purple-500/20 shadow-2xl rounded-t-3xl z-[9999] lg:hidden max-h-[70vh] overflow-y-auto"
            >
              <div className="flex flex-col px-6 py-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1.5 bg-purple-500/30 rounded-full" />
                </div>

                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg border border-transparent hover:border-purple-500/20 transition-all duration-200"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-6 pt-4 border-t border-purple-500/10">
                  <p className="text-xs text-gray-500 text-center">
                    © 2025 Valter. All rights reserved.
                  </p>
                </div>
              </div>

              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
