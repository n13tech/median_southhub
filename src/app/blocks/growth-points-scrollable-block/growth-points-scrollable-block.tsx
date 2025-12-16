'use client';

import { useEffect, useRef, useState } from 'react';
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
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверка на мобильное устройство
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 1024px)").matches;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Lenis initialization
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
    const imgWrappers = document.querySelectorAll('.growth-points-item-right-img-wrapper');
    imgWrappers.forEach((wrapper, index) => {
      if (wrapper) {
        wrapper.setAttribute('data-index', (index + 1).toString());
        (wrapper as HTMLElement).style.zIndex = (imgWrappers.length - index).toString();
      }
    });

    // GSAP Animation
    const imgs = gsap.utils.toArray('.growth-points-item-right-img') as HTMLImageElement[];
    const infoSections = gsap.utils.toArray('.growth-points-item-left-info') as HTMLElement[];

    // Очищаем все предыдущие ScrollTrigger
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Десктоп анимация (1025px+)
    if (!isMobile) {
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".growth-points-scrollable-block",
          start: "top top",
          end: "bottom bottom",
          pin: ".growth-points-item-right",
          scrub: true,
          invalidateOnRefresh: true
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

    // Мобильная анимация (до 1024px)
    } else {
      // Переопределяем высоту контейнера для мобильных
      if (rightColumnRef.current) {
        rightColumnRef.current.style.height = '275px';
        rightColumnRef.current.style.marginTop = '90px';
      }

      // Устанавливаем начальные стили для картинок
      gsap.set(imgs, {
        objectPosition: "center center"
      });

      // ПЕРВАЯ КАРТИНКА: полностью видна
      if (imgs[0]) {
        gsap.set(imgs[0], {
          clipPath: "inset(0px 0px 0px 0px)",
          objectPosition: "center 50%"
        });
      }

      // ОСТАЛЬНЫЕ КАРТИНКИ: полностью скрыты
      for (let i = 1; i < imgs.length; i++) {
        if (imgs[i]) {
          gsap.set(imgs[i], {
            clipPath: "inset(100% 0px 0px 0px)",
            objectPosition: "center 50%"
          });
        }
      }

      // Создаем ScrollTrigger для каждого текстового блока
      infoSections.forEach((section, index) => {
        const currentImage = imgs[index];
        const nextImage = imgs[index + 1];
        
        // Убираем все анимации opacity и scale у текста
        // Текст просто появляется и исчезает
        
        if (nextImage) {
          // Создаем ScrollTrigger для синхронизации анимации картинки с текстовым блоком
          ScrollTrigger.create({
            trigger: section,
            start: "top center", // Когда блок появляется в центре экрана
            end: "bottom center", // Когда блок уходит из центра экрана
            scrub: true, // Линейная привязка к скроллу
            onUpdate: (self) => {
              const progress = self.progress;
              
              if (currentImage && nextImage) {
                // Текущая картинка скрывается снизу
                gsap.set(currentImage, {
                  clipPath: `inset(0px 0px ${progress * 100}%)`,
                  objectPosition: `center ${50 + progress * 20}%`
                });
                
                // Следующая картинка "заезжает" сверху
                gsap.set(nextImage, {
                  clipPath: `inset(${(1 - progress) * 100}% 0px 0px 0px)`,
                  objectPosition: `center ${30 + progress * 20}%`
                });
                
                // Скрываем предыдущие картинки
                for (let i = 0; i < index; i++) {
                  if (imgs[i]) {
                    gsap.set(imgs[i], {
                      clipPath: "inset(0px 0px 100%)"
                    });
                  }
                }
                
                // Скрываем будущие картинки
                for (let i = index + 2; i < imgs.length; i++) {
                  if (imgs[i]) {
                    gsap.set(imgs[i], {
                      clipPath: "inset(100% 0px 0px 0px)"
                    });
                  }
                }
              }
            },
            onEnterBack: () => {
              // При скролле обратно
              if (index > 0) {
                const prevImage = imgs[index - 1];
                if (prevImage && currentImage) {
                  // Показываем предыдущую картинку
                  gsap.set(prevImage, {
                    clipPath: "inset(0px 0px 0px 0px)",
                    objectPosition: "center 50%"
                  });
                  
                  // Скрываем текущую
                  gsap.set(currentImage, {
                    clipPath: "inset(100% 0px 0px 0px)",
                    objectPosition: "center 30%"
                  });
                }
              }
            }
          });
        }
      });

      // ПИН для картинки - чтобы она оставалась наверху
      ScrollTrigger.create({
        trigger: ".growth-points-scrollable-block",
        start: "top top",
        end: "bottom bottom",
        pin: ".growth-points-item-right",
        pinSpacing: false
      });
    }

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

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
          {/* Левая колонка - текст */}
          <div className="growth-points-item-left" ref={leftColumnRef}>
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
                    <path d="M1.16671e-06 7.49902L9.72279e-07 8.99902L15.4648 8.99902L15.4648 7.49902L1.16671e-06 7.49902ZM17.918 12.3154C20.1633 10.07 20.1631 6.42911 17.918 4.18359L13.7344 -7.78427e-07L12.6738 1.06055L16.8574 5.24414C18.5168 6.90387 18.517 9.59526 16.8574 11.2549L12.6738 15.4385L13.7344 16.5L17.918 12.3154Z" fill="#18436D" />
                  </svg>
                </Button>
              </div>
            ))}
          </div>

          {/* Правая колонка - картинки */}
          <div className="growth-points-item-right" ref={rightColumnRef}>
            {GROWTH_POINT_ITEMS.slice().map((item, index) => (
              <div
                key={`img-${item.id}`}
                className="growth-points-item-right-img-wrapper"
                data-index={GROWTH_POINT_ITEMS.length - index}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={isMobile ? 612 : 900}
                  height={isMobile ? 275 : 536}
                  priority
                  className="growth-points-item-right-img"
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};