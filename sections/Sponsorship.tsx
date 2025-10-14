/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { motion, easeInOut } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  colors: string[];
  animationSpeed: number;
  showBorder: boolean;
  className?: string;
}

interface Contact {
  name: string;
  phone: string;

  icon: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors,
  animationSpeed,
  showBorder,
  className,
}) => {
  return (
    <span
      className={`bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};

const Sponsorship: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const contacts: Contact[] = [
    {
      name: "Khaidir",
      phone: "+62 813-7340-3806",
      icon: "👤",
    },
    {
      name: "Fathir",
      phone: "+62 851-4254-5842",

      icon: "👤",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="relative py-20 px-4 md:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-medium font-funky tracking-tight mb-6">
          <GradientText
            colors={["#5d0ec0", "#9810fa", "#8a0194", "#9810fa", "#5d0ec0"]}
            animationSpeed={6}
            showBorder={false}
            className="custom-class"
          >
            Open Sponsorship
          </GradientText>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Tertarik untuk berkolaborasi? Hubungi tim kami untuk membahas peluang
          sponsorship
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
      >
        {contacts.map((contact: Contact, index: number) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative group"
          >
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
            />

            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500">
              <motion.div
                transition={{ type: "spring", stiffness: 300 }}
                className="text-6xl mb-4"
              >
                {contact.icon}
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {contact.name}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">{contact.phone}</span>
                </div>

                <motion.a
                  href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contact via WhatsApp
                </motion.a>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-tr-2xl" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 text-sm md:text-base">
          Alamat{" "}
          <a
            href="https://maps.app.goo.gl/RNZ4rMLSV2qfAtVx8"
            target="_blank"
            className="text-purple-400 hover:text-purple-300 underline decoration-purple-500/50 hover:decoration-purple-500 transition-colors"
          >
            Kesekretariatan HMJ Teknik Komputer, Politeknik Negeri Sriwijaya
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Sponsorship;
