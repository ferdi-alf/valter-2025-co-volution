"use client";

import { useState, useEffect } from "react";
import About from "@/sections/About";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Main from "@/sections/Main";
import MediaPartner from "@/sections/MediaPartner";
import Poster from "@/sections/Poster";
import Sponsorship from "@/sections/Sponsorship";
import { TeaserVideo } from "@/sections/TeaserVideo";
import Timeline from "@/sections/Timeline";

enum LoadStage {
  NONE = 0,
  TEASER_VIDEO = 1,
  POSTER = 2,
  TIMELINE = 3,
  MEDIA_PARTNER = 4,
  SPONSORSHIP = 5,
}

export default function Home() {
  const [loadStage, setLoadStage] = useState<LoadStage>(LoadStage.NONE);

  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadStage(LoadStage.TEASER_VIDEO), 1900),
      setTimeout(() => setLoadStage(LoadStage.POSTER), 2200),
      setTimeout(() => setLoadStage(LoadStage.TIMELINE), 2500),
      setTimeout(() => setLoadStage(LoadStage.MEDIA_PARTNER), 2800),
      setTimeout(() => setLoadStage(LoadStage.SPONSORSHIP), 3100),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <>
      <Main />
      <div className="w-full">
        <div className="w-full flex flex-col justify-center">
          <div className="lg:px-36 px-3">
            <About />
            <div className="relative">
              <Features />

              <div className="mt-[1300px] sm:mt-[550px] md:mt-[500px] w-full lg:mt-[500px]">
                {loadStage >= LoadStage.TEASER_VIDEO ? (
                  <TeaserVideo />
                ) : (
                  <div
                    style={{ minHeight: "60vh", visibility: "hidden" }}
                    aria-hidden="true"
                  />
                )}

                {loadStage >= LoadStage.POSTER ? (
                  <Poster />
                ) : (
                  <div
                    style={{ minHeight: "80vh", visibility: "hidden" }}
                    aria-hidden="true"
                  />
                )}

                {loadStage >= LoadStage.TIMELINE ? (
                  <Timeline />
                ) : (
                  <div
                    style={{ minHeight: "60vh", visibility: "hidden" }}
                    aria-hidden="true"
                  />
                )}

                {loadStage >= LoadStage.MEDIA_PARTNER ? (
                  <MediaPartner />
                ) : (
                  <div
                    style={{ minHeight: "40vh", visibility: "hidden" }}
                    aria-hidden="true"
                  />
                )}

                {loadStage >= LoadStage.SPONSORSHIP && <Sponsorship />}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
