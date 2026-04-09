'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './our-projects-scrollable-block.css';
import { getOurProjectItems } from './constants';
import { FONT_MONT_BOOK } from '@/app/fonts';
import { Button } from 'antd';
import { ImageWithFallback } from '@/app/components/image-with-fallback';
import { useGetLinkWithUtm } from '@/app/hooks/use-get-link-with-utm';

// Снизу вверх при скролле раньше убирать хедер
export const OurProjectsScrollableBlock = () => {
  const getLinkWIthUtm = useGetLinkWithUtm();

  const containerRef = useRef<HTMLDivElement>(null);
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

    const raf = () => {
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Set z-index for images
    const imgWrappers = document.querySelectorAll('.our-projects-item-right-img-wrapper');
    imgWrappers.forEach((wrapper, index) => {
      if (wrapper) {
        wrapper.setAttribute('data-index', (index + 1).toString());
        (wrapper as HTMLElement).style.zIndex = (imgWrappers.length - index).toString();
      }
    });

    // GSAP Animation
    const imgs = gsap.utils.toArray('.our-projects-item-right-img') as HTMLImageElement[];
    const infoSections = gsap.utils.toArray('.our-projects-item-left-info') as HTMLElement[];

    // Очищаем только наши предыдущие ScrollTrigger
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];
    
    // Убиваем предыдущие анимации
    if (mobileAnimationRef.current) {
      mobileAnimationRef.current.kill();
      mobileAnimationRef.current = null;
    }

    // СБРАСЫВАЕМ СТИЛИ ПРАВОЙ КОЛОНКИ ПЕРЕД ПРИМЕНЕНИЕМ НОВЫХ
    if (rightColumnRef.current) {
      // Сбрасываем все инлайновые стили
      rightColumnRef.current.removeAttribute('style');
      
      // Также сбрасываем стили для всех картинок
      imgs.forEach(img => {
        if (img && img.style) {
          img.removeAttribute('style');
        }
      });
    }

    // Функция для управления видимостью header
    const updateHeaderVisibility = (isPinned: boolean) => {
      const header = document.getElementById('header');
      if (!header) return;
      
      // Header видим только когда блок НЕ в pinned состоянии
      header.style.opacity = isPinned ? '0' : '1';
      header.style.transition = 'opacity 0.3s ease';
      header.style.pointerEvents = isPinned ? 'none' : 'auto';
    };

    // Десктоп анимация (1025px+)
    if (!isMobile) {
      // Убедимся, что правый столбец имеет правильные стили для десктопа
      if (rightColumnRef.current) {
        // Сбрасываем мобильные стили
        rightColumnRef.current.style.height = '';
        rightColumnRef.current.style.marginTop = '';
        
        // Добавляем класс для десктопа если нужно
        rightColumnRef.current.classList.remove('mobile');
        rightColumnRef.current.classList.add('desktop');
      }

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".our-projects-scrollable-block",
          start: "top top",
          end: "bottom bottom",
          pin: ".our-projects-item-right",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // Сохраняем созданный триггер
      if (mainTimeline.scrollTrigger) {
        scrollTriggersRef.current.push(mainTimeline.scrollTrigger);
      }

      // Сбрасываем стили картинок для десктопа
      gsap.set(imgs, {
        clearProps: "all", // Очищаем все предыдущие свойства
      });

      // Устанавливаем начальные стили для десктопа
      gsap.set(imgs, {
        clipPath: "inset(0)",
        objectPosition: "0px 0%",
        objectFit: "cover"
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
        rightColumnRef.current.style.marginTop = '72px';
        
        // Добавляем класс для мобилки если нужно
        rightColumnRef.current.classList.remove('desktop');
        rightColumnRef.current.classList.add('mobile');
      }

      // Оптимизация: включаем аппаратное ускорение
      // Сначала очищаем все стили
      gsap.set(imgs, {
        clearProps: "all",
      });

      // Затем устанавливаем мобильные стили
      gsap.set(imgs, {
        willChange: 'clip-path',
        force3D: true,
        objectFit: 'cover',
        objectPosition: 'center center'
      });

      // Создаем одну общую timeline для всей анимации
      const mobileTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".our-projects-scrollable-block",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          pin: ".our-projects-item-right",
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
              } else {
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

      // Устанавливаем начальные состояния для мобилки
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

      const sectionDuration = 1 / infoSections.length;
      
      for (let i = 0; i < imgs.length - 1; i++) {
        const currentImg = imgs[i];
        const nextImg = imgs[i + 1];
        const startPosition = i * sectionDuration;

        mobileTimeline.to(currentImg, {
          clipPath: "inset(0% 0% 100% 0%)",
          objectPosition: "center 70%",
          duration: sectionDuration * 0.8,
          ease: "none"
        }, startPosition + sectionDuration * 0.1);

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

    const boundaryTrigger = ScrollTrigger.create({
      trigger: ".our-projects-scrollable-block",
      start: "top 70px",
      end: "bottom top",
      onEnter: () => updateHeaderVisibility(true),
      onLeave: () => updateHeaderVisibility(false),
      onEnterBack: () => updateHeaderVisibility(true),
      onLeaveBack: () => updateHeaderVisibility(false),
    });

    scrollTriggersRef.current.push(boundaryTrigger);

    return () => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
      
      if (mobileAnimationRef.current) {
        mobileAnimationRef.current.kill();
        mobileAnimationRef.current = null;
      }
      window.removeEventListener('resize', checkMobile);

      const header = document.getElementById('header');
      if (header) {
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
      }
    };
  }, [isMobile]);

  const ITEMS = getOurProjectItems(getLinkWIthUtm);

  return (
    <>
      <div className="our-projects-scrollable-block-wrapper" ref={containerRef} id='our-projects-block'>
        <div className="our-projects-scrollable-block">
          {/* Левая колонка - текст */}
          <div className="our-projects-item-left" ref={leftColumnRef}>
            {ITEMS.map((item) => (
              <div key={item.id} className="our-projects-item-left-info" id={item.id}>
                <h2 className={`${FONT_MONT_BOOK.className} our-projects-item-left-info-title`}>
                  {item.title}
                </h2>
                <p className={`${FONT_MONT_BOOK.className} our-projects-item-left-info-description`}>
                  {item.description}
                </p>
                <Button
                  className={`our-projects-item-left-info-button base-button`}
                  onClick={item.onClick}
                  type='primary'
                >
                  <span className={`${FONT_MONT_BOOK.className}`}>{item.buttonTitle}</span>
                </Button>
              </div>
            ))}
          </div>

          {/* Правая колонка - картинки */}
          <div className="our-projects-item-right" ref={rightColumnRef}>
            <h2 className={`${FONT_MONT_BOOK.className} our-projects-item-right-title`}>где встречаемся</h2>

            {ITEMS.slice().map((item, index) => (
              <div
                key={`img-${item.id}`}
                className="our-projects-item-right-img-wrapper"
                data-index={ITEMS.length - index}
              >
                <ImageWithFallback
                  src={item.imageSrc}
                  altSrc={item.altSrc}
                  alt={item.imageAlt}
                  width={isMobile ? 612 : 900}
                  height={isMobile ? 275 : 536}
                  className="our-projects-item-right-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};