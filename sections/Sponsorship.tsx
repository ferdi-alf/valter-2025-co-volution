"use client";
import React, { useState, useMemo, memo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Contact {
  name: string;
  phone: string;
  icon: string;
}

const GradientText = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => {
    return (
      <span
        className={`bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent ${className}`}
        style={{
          // GPU acceleration
          willChange: "background-position",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = "GradientText";

const ContactCard = memo<{
  contact: Contact;
  index: number;
}>(({ contact, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Memoize callbacks
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Memoize phone number cleanup
  const cleanPhone = useMemo(
    () => contact.phone.replace(/[^0-9]/g, ""),
    [contact.phone]
  );

  // Simplified animation variants
  const cardVariants = useMemo(
    () => ({
      hidden: {
        y: prefersReducedMotion ? 0 : 30,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "tween" as const, // ⚡ Fix TypeScript: tambahkan 'as const'
          duration: 0.4,
          ease: "easeOut" as const,
          delay: index * 0.08,
        },
      },
    }),
    [index, prefersReducedMotion]
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-100px",
        amount: 0.3,
      }}
      variants={cardVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group"
      style={{
        willChange: isHovered ? "transform" : "auto",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl transition-opacity duration-300 ${
          isHovered ? "opacity-20" : "opacity-0"
        }`}
        style={{
          willChange: "opacity",

          filter: isHovered ? "blur(8px)" : "blur(0px)",
        }}
      />

      <div
        className="relative bg-gray-900 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition-colors duration-300"
        style={{
          contain: "layout style paint",
        }}
      >
        <div
          className="text-6xl mb-4 transition-transform duration-200"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            willChange: isHovered ? "transform" : "auto",
          }}
        >
          {contact.icon}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {contact.name}
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-300">
            <svg
              className="w-5 h-5 text-purple-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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

          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            style={{
              boxShadow: "0 4px 14px 0 rgba(168, 85, 247, 0.4)",
              willChange: "transform",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contact via WhatsApp
          </a>
        </div>

        <div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-tr-2xl pointer-events-none"
          style={{
            willChange: "auto",
          }}
        />
      </div>
    </motion.div>
  );
});

ContactCard.displayName = "ContactCard";

const Sponsorship: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const contacts = useMemo<Contact[]>(
    () => [
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
    ],
    []
  );

  const headerVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : -20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "tween" as const,
          duration: 0.5,
          ease: "easeOut" as const,
        },
      },
    }),
    [prefersReducedMotion]
  );

  const footerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay: 0.2,
          duration: 0.5,
        },
      },
    }),
    []
  );

  return (
    <div
      id="sponsor"
      className="relative py-20 px-4 md:px-8 overflow-hidden"
      style={{
        contain: "layout style",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-150px",
          amount: 0.2,
        }}
        variants={headerVariants}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-medium font-funky tracking-tight mb-6">
          <GradientText className="custom-class">Open Sponsorship</GradientText>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Tertarik untuk berkolaborasi? Hubungi tim kami untuk membahas peluang
          sponsorship
        </p>
      </motion.div>

      <div
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
        style={{
          contain: "layout style",
        }}
      >
        {contacts.map((contact, index) => (
          <ContactCard key={contact.phone} contact={contact} index={index} />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-150px",
          amount: 0.3,
        }}
        variants={footerVariants}
        className="text-center mt-16"
      >
        <p className="text-gray-400 text-sm md:text-base">
          Alamat{" "}
          <a
            href="https://maps.app.goo.gl/RNZ4rMLSV2qfAtVx8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline decoration-purple-500/50 hover:decoration-purple-500 transition-colors"
          >
            Kesekretariatan HMJ Teknik Komputer, Politeknik Negeri Sriwijaya
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default memo(Sponsorship);
