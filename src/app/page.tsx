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
import { Button, Modal } from "antd";
import { NBSP } from "./constants";
import { FONT_MONT_BOOK } from "./fonts";
import { AccessibleBlock } from "./blocks/accessible-block";

export default function Home() {
  const [isOpenCookieModal, setOpenCookieModal] = useState(!localStorage.getItem('isVisibleCookieAlert'));

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

            <AccessibleBlock />
            <AboutUsBlock />
        </main>

        <Footer />

        <Modal
            open={isOpenCookieModal}
            closable={false}
            className='cookie-banner'
            rootClassName='cookie-banner-root'
            wrapClassName='cookie-banner-wrapp'
            footer={null}
        >
            <p className={`${FONT_MONT_BOOK.className} cookie-banner-text`}>
                {`Немного данных, чтобы вам было уютно и${NBSP}всё работало гладко. Мы собираем Cookies, потому что они помогают сайту помнить вас и${NBSP}оставаться таким же внимательным, как люди в${NBSP}сообществе South HUB. Просто скажите «да»`}
            </p>

            <Button
                className={`${FONT_MONT_BOOK.className} cookie-banner-button`}
                onClick={() => {
                    setOpenCookieModal(false)
                    localStorage.setItem('isVisibleCookieAlert', 'true')}
                }
            >
                да
            </Button>
        </Modal>
    </div>
  );
}
