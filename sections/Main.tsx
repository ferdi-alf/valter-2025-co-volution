import CountdownCards from "@/components/CountdownCards";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { SparklesText } from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Main = () => {
  return (
    <div className="md:px-36">
      <div className="font-sans relative flex flex-col justify-evenly pt-7 items-center min-h-screen ">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 w-full "
          )}
        />
        <Link
          href={"#event"}
          className="group relative mx-auto flex items-center justify-center  rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
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
            <h1 className="text-4xl font-medium font-funky tracking-tighte lg:text-6xl">
              Valter 2025
              <SparklesText colors={{ first: "#A07CFE", second: "#4f39f6" }}>
                <AuroraText
                  className="md:text-4xl text-3xl"
                  speed={1}
                  colors={["#8a0194", "#59168b", "#4f39f6", "#6e11b0"]}
                >
                  Creative Synergy
                </AuroraText>
              </SparklesText>
              <p className="leading-relaxed font-extralight text-xs">
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
  );
};

export default Main;
