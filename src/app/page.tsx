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
import { useEffect, useState } from "react";
import { Button } from "antd";
import { NBSP } from "./constants";
import { FONT_MONT_BOOK } from "./fonts";
import { AccessibleBlock } from "./blocks/accessible-block";
import { HowBecomeCommunityBlock } from "./blocks/how-become-community-block";
import { NetwarmingBlock } from "./blocks/netwarming-block";
import { PhilosophyBlock } from "./blocks/philosophy-block/philosophy-block";
import { HotToSouthubBlock } from "./blocks/hot-to-southub-block/hot-to-southub-block";
import { CarouselBlock } from "./blocks/carousel-block";
import { ForWhoScrollableBlock } from "./blocks/for-who-scrollable-block";

export default function Home() {
  const [isOpenCookieModal, setOpenCookieModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.localStorage.getItem('isVisibleCookieAlert')) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpenCookieModal(true);
    }
  }, []);

  useEffect(() => {
      setTimeout(() => {
        const video = document.querySelector('#home-video');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        video?.play();
      }, 250);
  }, []);

  return (
    <div style={{ position: 'relative', top: '0', left: '0' }}>
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

            <ForWhoScrollableBlock />
            <HotToSouthubBlock />
            <CarouselBlock />
            <PhilosophyBlock />
            <NetwarmingBlock />
            <HowBecomeCommunityBlock />
            <AccessibleBlock />
            <AboutUsBlock />
        </main>

        <Footer />

        {isOpenCookieModal && (
            <div className="cookie-banner">
                <p className={`${FONT_MONT_BOOK.className} cookie-banner-text`}>
                    {`Мы собираем cookies, потому что они помогают сайту помнить вас и${NBSP}оставаться таким${NBSP}же внимательным, как${NBSP}люди в${NBSP}сообществе South${NBSP}HUВ. Просто скажите «да»`}
                </p>

                <Button
                    className={`${FONT_MONT_BOOK.className} cookie-banner-button`}
                    onClick={() => {
                        setOpenCookieModal(false)
                        window.localStorage.setItem('isVisibleCookieAlert', 'true')}
                    }
                >
                    да
                </Button>
            </div>
        )}
    </div>
  );
}
