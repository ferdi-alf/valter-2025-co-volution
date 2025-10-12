"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";

const Navbar = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="lg:px-36 px-2 fixed z-[9999] w-full">
      <div className="pt-3 z-50 flex justify-center items-center top-0 right-0">
        <div className="w-full">
          <motion.div
            className="relative backdrop-blur-xl overflow-hidden text-white p-3 border-t border-gray-600 bg-gray-800/10 shadow-2xl rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2 items-center">
              {/* Logo dengan layoutId SAMA */}
              <motion.div
                layoutId="logo-transition"
                style={{
                  width: 40,
                  height: 40,
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

              <motion.p
                className="lg:text-lg text-xs font-funky"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Valter 2025
              </motion.p>
            </div>

            <BorderBeam
              duration={12}
              size={150}
              className="from-transparent via-purple-500 to-fuchsia-900"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
