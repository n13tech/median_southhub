'use client';
import { AccordionsBlock } from "./blocks/accordions-block";
import { GrowthPointsBlock } from "./blocks/growth-points-block";
import { Footer } from "./blocks/footer";
import { Header } from "./blocks/header"
import { InfinityBanner } from "./blocks/infinity-banner";
import { MainBanner } from "./blocks/main-banner";
import { SimpleBlock } from "./blocks/simple-block";
import { CommunityInNumbers } from "./blocks/community-in-numbers";
import { AboutUsBlock } from "./blocks/about-us-block";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
      setTimeout(() => {
        const video = document.querySelector('#home-video');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        video?.play();
      }, 250);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
        <Header />

        <div className="video-wrapper">
          <video muted className='home-video' id='home-video' loop={false} playsInline>
              <source src={'/AnimLettera.mp4'} type="video/mp4"  />
          </video>
        </div>

        <main >
            <MainBanner />
            <SimpleBlock />
            <AccordionsBlock />

            <InfinityBanner />

            <GrowthPointsBlock />
            <CommunityInNumbers />

            <InfinityBanner />

            <AboutUsBlock />
        </main>

        <Footer />
    </div>
  );
}
