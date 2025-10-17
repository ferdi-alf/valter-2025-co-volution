import CircularGallery from "@/components/CircularGallery";
import GradientText from "@/components/GradientText";
import { AnimatedBeamDemo } from "@/components/Kegiatan";

const Poster = () => {
  return (
    <div className="" id="kegiatan">
      <h1 className=" text-3xl mt-15 md:text-6xl   font-medium font-funky tracking-tighte">
        <GradientText
          colors={["#5d0ec0", "#9810fa", "#8a0194", "#9810fa", "#5d0ec0"]}
          animationSpeed={6}
          showBorder={false}
          className="custom-class"
        >
          Kegiatan Valter
        </GradientText>
      </h1>
      <p className="text-white text-lg font-light text-center ">
        Ayo ikuti kegiatan dan event-event menarik di Valter
      </p>
      <div style={{ height: "550px", position: "relative" }}>
        <div
          className="[mask-image:linear-gradient(to_right,transparent_0%,#000000_15%,#000000_85%,transparent_100%)]"
          style={{ height: "100%", width: "100%" }}
        >
          <CircularGallery bend={5} textColor="#ffffff" />
        </div>
      </div>
      <AnimatedBeamDemo />
    </div>
  );
};

export default Poster;
