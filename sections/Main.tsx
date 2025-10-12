import CountdownCards from "@/components/CountdownCards";
import DarkVeil from "@/components/DarkVeil";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { Highlighter } from "@/components/ui/highlighter";
import { SparklesText } from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Main = () => {
  return (
    <>
      <div style={{ width: "100%", height: "100svh", position: "absolute" }}>
        <DarkVeil hueShift={340} />
      </div>
      <div className="w-full backdrop-blur-lg relative">
        <div className="md:px-36 ">
          <div className="font-sans bg-transparent relative flex flex-col justify-evenly pt-7 items-center min-h-screen ">
            <Link
              href={"#event"}
              className="group backdrop-blur-3xl bg-white/20 relative mx-auto flex items-center justify-center  rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
            >
              <span
                className={cn(
                  "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                )}
                style={{
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "subtract",
                  WebkitClipPath: "padding-box",
                }}
              />
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
              <AnimatedGradientText className="text-sm font-medium">
                Lihat Event
              </AnimatedGradientText>
              <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </Link>

            <main className="flex justify-center text-center items-center w-full">
              <div className="flex flex-col text-white">
                <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white/30 to-zinc-900 font-medium font-funky tracking-tighte lg:text-7xl">
                  Valter 2025
                  <SparklesText
                    colors={{ first: "#A07CFE", second: "#4f39f6" }}
                  >
                    <AuroraText
                      className="md:text-4xl text-3xl"
                      speed={1}
                      colors={[
                        "oklch(49.1% 0.27 292.581)",
                        "oklch(49.6% 0.265 301.924)",
                        "oklch(40.1% 0.17 325.612)",
                        "oklch(54.1% 0.281 293.009)",
                      ]}
                    >
                      Creative Synergy
                    </AuroraText>
                  </SparklesText>
                  <p className="leading-relaxed text-white font-extralight text-sm md:text-lg md:p-0 p-1">
                    Kreativitas{" "}
                    <Highlighter action="underline" color="#FF9800">
                      Berdaya
                    </Highlighter>{" "}
                    Bersama{" "}
                    <Highlighter padding={2} action="highlight" color="#87CEFA">
                      {""}Teknologi
                    </Highlighter>{" "}
                    - Imajinasi Ciptakan Inovasi
                  </p>
                </h1>
              </div>
            </main>

            <CountdownCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
