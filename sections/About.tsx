import { AuroraText } from "@/components/ui/aurora-text";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="lg:px-24 sm:px-6 px-4 py-5 lg:py-12 md:px-16 md:py-7 w-full lg:w-full bg-gray-900/60 backdrop-blur-xl  rounded-3xl border-t border-gray-600 "
    >
      <Image
        height={580}
        width={580}
        src={"/assets/tiva-face.png"}
        className="md:w-32 w-24 absolute right-[-10px] md:right-[-5px] md:top-[-105px] top-[-80px]"
        alt="tiva-face"
      />
      <div className="p-3 ">
        <h1 className="md:text-4xl sm:text-3xl text-xl  font-funky font-normal tracking-tighter text-white">
          Apa Itu <AuroraText>Valter?</AuroraText>
        </h1>
        <div className="mt-5 text-white font-light sm:text-sm text-xs  lg:text-xl">
          Valter {""}
          Festival Multimedia & Komputer merupakan salah satu event tahunan HMJ
          TEKNIK KOMPUTER POLITEKNIK NEGERI SRIWIJAYA . Tahun ini, Valter {""}
          hadir lebih dekat dengan dunia content creator dengan mengusung tema{" "}
          Creative Synergy : “Kreativitas Berdaya bersama Teknologi“. Disini
          rangkaian acara seru siap menemani kamu! Mulai dari pelatihan, 3
          kompetisi digital, hingga seminar inspiratif sebagai acara puncak!
          Saatnya wujudkan ide kreatifmu, kolaborasikan dengan teknologi, dan
          jadilah bagian dari energi baru di dunia digital!{" "}
          <span className="font-semibold">
            VALTER 2025 - Imajinasi Ciptakan Inovasi!
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
