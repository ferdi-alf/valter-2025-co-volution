/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, memo, useCallback } from "react";
import { Phone, MessageCircle } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
}

const GradientText = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => {
    return (
      <span
        className={`bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent ${className}`}
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

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const cleanPhone = useMemo(
    () => contact.phone.replace(/[^0-9]/g, ""),
    [contact.phone]
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl transition-opacity duration-300 ${
          isHovered ? "opacity-20 blur-lg" : "opacity-0"
        }`}
      />

      <div className="relative bg-gray-900 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition-colors duration-300">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {contact.name}
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-300">
            <Phone className="w-5 h-5 text-purple-400 shrink-0" />
            <span className="text-sm md:text-base">{contact.phone}</span>
          </div>

          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              boxShadow: "0 4px 14px 0 rgba(168, 85, 247, 0.4)",
            }}
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            Contact via WhatsApp
          </a>
        </div>

        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-tr-2xl pointer-events-none" />
      </div>
    </div>
  );
});

ContactCard.displayName = "ContactCard";

const Sponsorship: React.FC = () => {
  const contacts = useMemo<Contact[]>(
    () => [
      {
        name: "Khaidir",
        phone: "+62 813-7340-3806",
      },
      {
        name: "Fathir",
        phone: "+62 851-4254-5842",
      },
    ],
    []
  );

  return (
    <div id="sponsor" className="relative py-20 px-4 md:px-8 overflow-hidden">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-funky md:text-6xl font-medium tracking-tight mb-6">
          <GradientText>Open Sponsorship</GradientText>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Tertarik untuk berkolaborasi? Hubungi tim kami untuk membahas peluang
          sponsorship
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {contacts.map((contact, index) => (
          <ContactCard key={contact.phone} contact={contact} index={index} />
        ))}
      </div>

      <div className="text-center mt-16">
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
      </div>
    </div>
  );
};

export default memo(Sponsorship);
