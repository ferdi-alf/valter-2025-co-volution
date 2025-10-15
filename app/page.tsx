// ini halaman utama
import About from "@/sections/About";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Main from "@/sections/Main";
import MediaPartner from "@/sections/MediaPartner";
import Poster from "@/sections/Poster";
import Sponsorship from "@/sections/Sponsorship";
import { TeaserVideo } from "@/sections/TeaserVideo";
import Timeline from "@/sections/Timeline";

export default function Home() {
  return (
    <>
      <Main />
      <div className=" w-full ">
        <div className="w-full flex flex-col justify-center ">
          <div className="lg:px-36 px-3 ">
            <About />
            <div className="relative ">
              <Features />
              <div className="mt-[1300px] sm:mt-[550px] md:mt-[500px] w-full lg:mt-[500px] ">
                <TeaserVideo />
                <Poster />
                <Timeline />
                <MediaPartner />
                <Sponsorship />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
