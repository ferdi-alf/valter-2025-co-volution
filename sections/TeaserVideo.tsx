import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export function TeaserVideo() {
  return (
    <div className="">
      <div className="text-center">
        <h1 className="font-funky text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white/50 to-zinc-900 font-medium font-funky tracking-tighte">
          Teaser Video
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
