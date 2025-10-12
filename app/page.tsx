import About from "@/sections/About";
import Features from "@/sections/Features";
import Main from "@/sections/Main";
import { TeaserVideo } from "@/sections/TeaserVideo";

export default function Home() {
  return (
    <>
      <Main />
      <div className="relative w-full  ">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-zinc-950 opacity-50 blur-3xl"></div>
          <div className="absolute top-1/4 left-0 w-full h-1/3 bg-zinc-950 opacity-40 blur-2xl"></div>
          <div className="absolute top-1/2 left-0 w-full h-1/3 bg-zinc-950 opacity-60 blur-xl"></div>
          <div className="absolute top-3/4 left-0 w-full h-1/3 bg-zinc-950 opacity-80 blur-lg"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-zinc-950 opacity-100"></div>
        </div>

        <div className="lg:px-36 px-3 absolute w-full flex flex-col justify-center  ">
          <About />
          <div className="relative">
            <Features />
            <div className="mt-[950px] w-full lg:mt-[650px]">
              <TeaserVideo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
