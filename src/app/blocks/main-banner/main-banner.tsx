/* eslint-disable react-hooks/set-state-in-effect */

// MainBanner.tsx
import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './main-banner.css';

const ANIMATION_SPEED_FACTOR = 1.1;

export const MainBanner = () => {
    const [windowHeight, setWindowHeight] = useState(0);

    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const mainBannerText1 = useRef<HTMLDivElement>(null);
    const mainBannerText2 = useRef<HTMLDivElement>(null);
    const mainBannerText3 = useRef<HTMLDivElement>(null);
    const mainBannerText4 = useRef<HTMLDivElement>(null);

    const buttonRef = useRef<HTMLDivElement>(null);

    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const textAnimationsRef = useRef<ScrollTrigger[]>([]);

    useEffect(() => {
        setWindowHeight(window.innerHeight);

        const handleResize = () => setWindowHeight(window.innerHeight);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Анимация появления первого текста при загрузке
    useEffect(() => {
        if (mainBannerText1.current) {
            // Устанавливаем начальное состояние
            gsap.set(mainBannerText1.current, {
                opacity: 0,
                y: 30,
            });

            // Анимируем появление через 0.5 секунды
            gsap.to(mainBannerText1.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.5,
                ease: "power3.out",
            });
        }
    }, []);

    const setupTextAnimations = useCallback(() => {
        textAnimationsRef.current.forEach(animation => animation.kill());
        textAnimationsRef.current = [];

        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const elements = [
            { element: mainBannerText1.current },
            { element: mainBannerText2.current },
            { element: mainBannerText3.current },
            { element: mainBannerText4.current },
        ];

        // Изначально устанавливаем opacity для текстов
        if (mainBannerText1.current) {
            gsap.set(mainBannerText1.current, {
                opacity: 1,
                y: 0,
            });
        }

        // Остальные тексты скрываем
        elements.slice(1).forEach(({ element }) => {
            if (element) {
                gsap.set(element, {
                    opacity: 0,
                    y: 30,
                });
            }
        });

        // Анимация для mainBannerText1 - исчезает на 35%
        if (mainBannerText1.current) {
            const animation1 = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'top+=35% top',
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                    gsap.to(mainBannerText1.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                },
                onLeave: () => {
                    gsap.to(mainBannerText1.current, {
                        opacity: 0,
                        y: -30,
                        duration: 0.5,
                        ease: "power3.in",
                    });
                },
                onEnterBack: () => {
                    gsap.to(mainBannerText1.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                },
            });

            textAnimationsRef.current.push(animation1);
        }

        // Анимация для mainBannerText2 - появляется на 20% и исчезает на 35%
        if (mainBannerText2.current) {
            const animation2 = ScrollTrigger.create({
                trigger: section,
                start: 'top+=20% top',
                end: 'top+=35% top',
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                    gsap.to(mainBannerText2.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                },
                onLeave: () => {
                    gsap.to(mainBannerText2.current, {
                        opacity: 0,
                        y: -30,
                        duration: 0.5,
                        ease: "power3.in",
                    });
                },
                onEnterBack: () => {
                    gsap.to(mainBannerText2.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to(mainBannerText2.current, {
                        opacity: 0,
                        y: -30,
                        duration: 0.5,
                        ease: "power3.in",
                    });
                },
            });

            textAnimationsRef.current.push(animation2);
        }

        // Анимации для остальных элементов
        const otherElements = [
            { element: mainBannerText3.current, percent: 45 },
            { element: mainBannerText4.current, percent: 65 },
        ];

        otherElements.forEach(({ element, percent }) => {
            if (!element) return;

            const animation = ScrollTrigger.create({
                trigger: section,
                start: `top+=${percent}% top`,
                end: `top+=${percent + 5}% top`,
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to(element, {
                        opacity: 0,
                        y: 30,
                        duration: 0.5,
                        ease: "power3.in",
                    });
                },
            });

            textAnimationsRef.current.push(animation);
        });
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const content = contentRef.current;
        const pin = pinRef.current;
        const videoWrapper = videoWrapperRef.current;
        
        if (!section || !content || !pin || !videoWrapper || !windowHeight) return;

        const calculateSectionHeight = () => {
            const isMobile = window.innerWidth <= 1024;
            
            const scrollDistance = 5000;
            const mobileScrollDistance = scrollDistance * ANIMATION_SPEED_FACTOR;
            
            if (isMobile) {
                return mobileScrollDistance + windowHeight;
            }
            
            return scrollDistance + windowHeight;
        };

        const sectionHeight = calculateSectionHeight();
        section.style.minHeight = `${sectionHeight}px`;

        const initScrollAnimation = () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }

            const isMobile = window.innerWidth <= 1024;

            // Определяем расстояние для анимации
            const scrollDistance = 5000;
            const mobileScrollDistance = scrollDistance * ANIMATION_SPEED_FACTOR;

            // Основной пин для видео и контента
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: `+=${isMobile ? mobileScrollDistance : scrollDistance}`,
                scrub: true,
                pin: pin,
                pinSpacing: false,
                onRefresh: () => {
                    setupTextAnimations();
                }
            });

            if (videoWrapper) {
                gsap.to(videoWrapper, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: `+=${isMobile ? mobileScrollDistance : scrollDistance}`,
                        scrub: true,
                    },
                });
            }

            // Настраиваем анимации текстовых элементов
            setupTextAnimations();

            ScrollTrigger.refresh();
        };

        // Обработчик ресайза
        const handleResize = () => {
            initScrollAnimation();
        };

        initScrollAnimation();
        window.addEventListener('resize', handleResize);

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            
            // Очищаем текстовые анимации
            textAnimationsRef.current.forEach(animation => animation.kill());
            textAnimationsRef.current = [];
            
            window.removeEventListener('resize', handleResize);
            
            // Убиваем все ScrollTrigger экземпляры
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [windowHeight, setupTextAnimations]);

    return (
        <div className="main-banner-wrapper" id="main-banner" ref={sectionRef}>
            <div className="main-banner-pin-wrapper" ref={pinRef}>
                {/* Видео - теперь с отдельным ref для анимации */}
                <div className="video-wrapper" ref={videoWrapperRef}>
                    <video
                        ref={videoRef}
                        className="home-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src="./v2/U_V17_notxt.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Текстовые блоки */}
                <div className="main-banner-content" ref={contentRef}>
                    <div
                        ref={mainBannerText1}
                        className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-1`}
                    >
                        сообщество C-level в IT
                    </div>

                    <div
                        ref={mainBannerText2}
                        className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-2`}
                    >
                        здесь лидеры находят партнёрства,<br />
                        ресурсы и смыслы, которых<br />
                        не встретить онлайн.
                    </div>

                    <div
                        ref={mainBannerText3}
                        className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-3`}
                    >
                        <span>мы переизобрели нетворкинг и получили</span>

                        <div className={`${FONT_MONT_BOOK.className} main-banner-text-3-netwarming`}>
                            netwarming &mdash;
                        </div>
                    </div>

                    <div
                        ref={mainBannerText4}
                        className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-4`}
                    >
                        это искусство встречаться по-настоящему:
                        с теплом, доверием и искренностью.
                        это свежий воздух вместо офисных переговорок,
                        живой смех вместо холодных встреч,
                        свобода вместо тесных рамок.
                        и юг как состояние души.
                    </div>

                    {/* Кнопка всегда видна */}
                    <div ref={buttonRef} className="main-banner-button-wrapper">
                        <MainBannerButton />
                    </div>
                </div>
            </div>
        </div>
    );
};