import GradientText from "@/components/GradientText";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export function TeaserVideo() {
  return (
    <div className="mb-5">
      <div className="text-center">
        <h1 className="font-funky text-4xl mb-3 md:text-7xl   font-medium font-funky tracking-tighte">
          <GradientText
            colors={["#5d0ec0", "#9810fa", "#8a0194", "#9810fa", "#5d0ec0"]}
            animationSpeed={6}
            showBorder={false}
            className="custom-class"
          >
            Teaser Video
          </GradientText>
        </h1>
      </div>
      <HeroVideoDialog
        className="block w-full"
        animationStyle="from-center"
        videoSrc="/assets/teaser.mp4"
        thumbnailSrc="/assets/tiva.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
