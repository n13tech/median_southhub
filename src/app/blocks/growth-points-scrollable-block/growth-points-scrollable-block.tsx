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

export const GrowthPointsScrollableBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mobileAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    // Очищаем только наши предыдущие ScrollTrigger
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];
    
    // Убиваем предыдущие анимации
    if (mobileAnimationRef.current) {
      mobileAnimationRef.current.kill();
      mobileAnimationRef.current = null;
    }

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

      // Сохраняем созданный триггер
      if (mainTimeline.scrollTrigger) {
        scrollTriggersRef.current.push(mainTimeline.scrollTrigger);
      }

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

      // Оптимизация: включаем аппаратное ускорение
      gsap.set(imgs, {
        willChange: 'clip-path',
        force3D: true
      });

      // Создаем одну общую timeline для всей анимации
      const mobileTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".growth-points-scrollable-block",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: ".growth-points-item-right",
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Синхронизация с текстовыми блоками
            const progress = self.progress;
            const activeIndex = Math.floor(progress * infoSections.length);
            
            // Показываем/скрываем текстовые блоки
            infoSections.forEach((section, index) => {
              if (index === activeIndex) {
                gsap.set(section, { opacity: 1, scale: 1 });
              }
            });
          }
        }
      });

      // Сохраняем созданный триггер
      if (mobileTimeline.scrollTrigger) {
        scrollTriggersRef.current.push(mobileTimeline.scrollTrigger);
      }

      // Устанавливаем начальные состояния
      imgs.forEach((img, index) => {
        if (index === 0) {
          // Первая картинка - видима
          gsap.set(img, {
            clipPath: "inset(0% 0% 0% 0%)",
            objectPosition: "center 50%"
          });
        } else {
          // Остальные - скрыты
          gsap.set(img, {
            clipPath: "inset(100% 0% 0% 0%)",
            objectPosition: "center 50%"
          });
        }
      });

      // Создаем анимации переходов между картинками
      const sectionDuration = 1 / infoSections.length;
      
      for (let i = 0; i < imgs.length - 1; i++) {
        const currentImg = imgs[i];
        const nextImg = imgs[i + 1];
        const startPosition = i * sectionDuration;
        const endPosition = (i + 1) * sectionDuration;
        
        // Анимация скрытия текущей картинки
        mobileTimeline.to(currentImg, {
          clipPath: "inset(0% 0% 100% 0%)",
          objectPosition: "center 70%",
          duration: sectionDuration * 0.8, // 80% секции на переход
          ease: "none"
        }, startPosition + sectionDuration * 0.1); // Начинаем через 10% секции
        
        // Анимация появления следующей картинки
        mobileTimeline.fromTo(nextImg,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            objectPosition: "center 30%"
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            objectPosition: "center 50%",
            duration: sectionDuration * 0.8,
            ease: "none"
          },
          startPosition + sectionDuration * 0.1
        );
      }

      mobileAnimationRef.current = mobileTimeline;
    }

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
      
      // Убиваем только наши триггеры
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
      
      if (mobileAnimationRef.current) {
        mobileAnimationRef.current.kill();
        mobileAnimationRef.current = null;
      }
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
                    objectFit: 'cover',
                    willChange: 'transform'
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