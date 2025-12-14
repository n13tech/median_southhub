'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './growth-points-scrollable-block.css';
import Image from 'next/image';
import { GROWTH_POINT_ITEMS } from './constants';
import { FONT_MONT_BOOK } from '@/app/fonts';
import { Button } from 'antd';
import { NBSP } from '@/app/constants';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const GrowthPointsScrollableBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
      lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          gestureOrientation: "vertical",
          syncTouch: true,
          touchMultiplier: 2
      });

      const raf = (time: number) => {
          lenisRef.current?.raf(time);
          ScrollTrigger.update();
          requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      // Set z-index for images
      const imgWrappers = document.querySelectorAll('.growth-points-img-wrapper');

      imgWrappers.forEach((wrapper, index) => {
          wrapper.setAttribute('data-index', (index + 1).toString());
          (wrapper as HTMLElement).style.zIndex = (imgWrappers.length - index).toString();
      });

      // GSAP Animation
      const imgs = gsap.utils.toArray('.growth-points-img') as HTMLImageElement[];

      // Desktop animation
      if (window.matchMedia("(min-width: 769px)").matches) {
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".growth-points-scrollable-block",
                start: "top top",
                end: "bottom bottom",
                pin: ".growth-points-arch-right",
                scrub: true
            }
          });

        gsap.set(imgs, {
            clipPath: "inset(0)",
            objectPosition: "0px 0%"
        });

        imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

            const sectionTimeline = gsap.timeline();

            if (nextImage) {
                sectionTimeline
                  .to(
                      currentImage,
                      {
                        clipPath: "inset(0px 0px 100%)",
                        objectPosition: "0px 60%",
                        duration: 1.5,
                        ease: "none"
                      },
                      0
                  )
                .to(
                    nextImage,
                    {
                      objectPosition: "0px 40%",
                      duration: 1.5,
                      ease: "none"
                    },
                    0
                );
            }

            mainTimeline.add(sectionTimeline);
        });
        // Mobile animation
        } else {
        const mbTimeline = gsap.timeline();
        gsap.set(imgs, {
          objectPosition: "0px 60%"
        });

        imgs.forEach((image) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top-=70% top+=50%",
              end: "bottom+=200% bottom",
              scrub: true
            }
          });

          innerTimeline
            .to(image, {
              objectPosition: "0px 30%",
              duration: 5,
              ease: "none"
            });

          mbTimeline.add(innerTimeline);
        });
      }

      // Cleanup
      return () => {
          lenisRef.current?.destroy();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
  }, []);

  return (
    <>
        <div className='growth-points-block-wrapper' id='growth-points-block'>
            <h2 className={`${FONT_MONT_BOOK.className} growth-points-block-title`}>
                {'Точки роста'}
            </h2>

            <p className={`${FONT_MONT_BOOK.className} growth-points-block-description`}>
                {'Форматы взаимодействия сообщества'}
            </p>
        </div>

        <div className="growth-points-scrollable-block-wrapper" ref={containerRef}>
            <div className="growth-points-scrollable-block">
                <div className="growth-points-item-left">
                  {GROWTH_POINT_ITEMS.map((item) => (
                      <div key={item.id} className="growth-points-item-left-info" id={item.id}>
                          <h2 className={`${FONT_MONT_BOOK.className} growth-points-item-left-info-title`}>
                              {item.title}
                          </h2>
                          <p className={`${FONT_MONT_BOOK.className} growth-points-item-left-info-description`}>
                              {item.description}
                          </p>
                          <Button
                              className={`${FONT_MONT_BOOK.className} growth-points-item-left-info-button`}
                              onClick={item.onClick}
                              type='text'
                          >
                              {item.buttonTitle}
                              {NBSP}
                              <svg width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1.16671e-06 7.49902L9.72279e-07 8.99902L15.4648 8.99902L15.4648 7.49902L1.16671e-06 7.49902ZM17.918 12.3154C20.1633 10.07 20.1631 6.42911 17.918 4.18359L13.7344 -7.78427e-07L12.6738 1.06055L16.8574 5.24414C18.5168 6.90387 18.517 9.59526 16.8574 11.2549L12.6738 15.4385L13.7344 16.5L17.918 12.3154Z" fill="#18436D"/>
                              </svg>
                          </Button>
                      </div>
                  ))}
                </div>

                <div className="growth-points-arch-right">
                  {GROWTH_POINT_ITEMS.slice().map((item, index) => (
                      <div
                        key={`img-${item.id}`}
                        className="growth-points-img-wrapper"
                        data-index={GROWTH_POINT_ITEMS.length - index}
                      >
                          <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              width={900}
                              height={536}
                              priority
                              className="growth-points-img"
                          />
                      </div>
                  ))}
                </div>
            </div>
        </div>
    </>
  );
};
