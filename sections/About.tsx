import { AuroraText } from "@/components/ui/aurora-text";
import { TextReveal } from "@/components/ui/text-reveal";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="  lg:px-24 sm:px-6 px-4 py-5 lg:py-12 md:px-16 md:py-7 w-full lg:w-full bg-gray-900/60 backdrop-blur-xl  rounded-3xl border-t border-gray-600 ">
      <Image
        height={580}
        width={580}
        src={"/assets/tiva-face.png"}
        className="md:w-32 w-24 absolute right-[-10px] md:right-[-30px] md:top-[-100px] top-[-80px]"
        alt="tiva-face"
      />
      <div className="p-3 ">
        <h1 className="md:text-4xl sm:text-3xl text-xl  font-funky font-normal tracking-tighter text-white">
          Apa Itu <AuroraText>Valter?</AuroraText>
        </h1>
        <div className="mt-5 text-white font-semibold sm:text-sm text-xs  lg:text-xl">
          <AuroraText
            colors={["#8a0194", "#59168b", "#4f39f6", "#6e11b0"]}
            className="md:text-3xl text-lg font-funky"
          >
            Valter {""}
          </AuroraText>{" "}
          <span className="">
            <TextReveal color="#ffffff">
              Festival Multimedia & Komputer merupakan salah satu event tahunan
              HMJ TEKNIK KOMPUTER POLITEKNIK NEGERI SRIWIJAYA . Tahun ini,
            </TextReveal>{" "}
            <AuroraText
              colors={["#8a0194", "#59168b", "#4f39f6", "#6e11b0"]}
              className="md:text-3xl text-lg font-funky"
            >
              Valter {""}
            </AuroraText>{" "}
            <TextReveal>
              hadir lebih dekat dengan dunia content creator dengan mengusung
              tema
            </TextReveal>{" "}
            <span className="font-funky font-normal">
              {" "}
              Creative Synergy : “ Kreativitas Berdaya bersama Teknologi “.{" "}
            </span>
            <TextReveal>
              Disini rangkaian acara seru siap menemani kamu! Mulai dari
              pelatihan, 3 kompetisi digital, hingga seminar inspiratif sebagai
              acara puncak! Saatnya wujudkan ide kreatifmu, kolaborasikan dengan
              teknologi, dan jadilah bagian dari energi baru di dunia digital!
            </TextReveal>
          </span>
          <span>
            <AuroraText
              colors={["#8a0194", "#59168b", "#4f39f6", "#6e11b0"]}
              className="md:text-3xl text-lg font-funky"
            >
              VALTER 2025
            </AuroraText>{" "}
            - Imajinasi Ciptakan Inovasi!
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
