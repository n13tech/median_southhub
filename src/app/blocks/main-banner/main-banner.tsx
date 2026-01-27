/* eslint-disable react-hooks/set-state-in-effect */
import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';
import { NBSP } from '@/app/constants';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './main-banner.css';

export const MainBanner = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    
    // Refs для текстовых элементов
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);
    const title3Ref = useRef<HTMLHeadingElement>(null);
    const title4Ref = useRef<HTMLHeadingElement>(null);
    const title5Ref = useRef<HTMLParagraphElement>(null);
    const title6Ref = useRef<HTMLDivElement>(null);
    
    const [windowHeight, setWindowHeight] = useState(0);
    const [videoReady, setVideoReady] = useState(false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const textAnimationsRef = useRef<ScrollTrigger[]>([]);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Инициализация видео
    const initializeVideo = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        // Устанавливаем атрибуты для Safari
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('muted', 'true');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('preload', 'auto');

        // Для iOS: добавляем обработчик для ручного зацикливания
        const handleVideoEnd = () => {
            video.currentTime = 0;
            video.play().catch(e => console.log('Video replay error:', e));
        };

        video.addEventListener('ended', handleVideoEnd);

        // Попытка запустить видео
        const playVideo = () => {
            // Для iOS Safari - используем requestAnimationFrame
            const tryPlay = () => {
                video.play()
                    .then(() => {
                        console.log('Video started playing');
                        setVideoReady(true);
                    })
                    .catch(error => {
                        console.log('Autoplay failed, trying with user gesture:', error);
                        
                        // Для iOS Safari: добавляем обработчик для всего документа
                        const handleFirstInteraction = () => {
                            video.play()
                                .then(() => {
                                    console.log('Video started after user interaction');
                                    setVideoReady(true);
                                })
                                .catch(e => console.log('Failed to play after interaction:', e));
                            
                            // Удаляем обработчики после первого взаимодействия
                            document.removeEventListener('click', handleFirstInteraction);
                            document.removeEventListener('touchstart', handleFirstInteraction);
                            document.removeEventListener('scroll', handleFirstInteraction);
                        };
                        
                        document.addEventListener('click', handleFirstInteraction, { once: true });
                        document.addEventListener('touchstart', handleFirstInteraction, { once: true });
                        document.addEventListener('scroll', handleFirstInteraction, { once: true });
                    });
            };

            requestAnimationFrame(tryPlay);
        };

        // Обработчик для загрузки видео
        const handleLoaded = () => {
            // Ждем немного перед попыткой воспроизведения
            setTimeout(playVideo, 100);
        };

        // Если видео уже загружено
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA
            handleLoaded();
        } else {
            // Ждем, когда видео будет готово
            video.addEventListener('loadeddata', handleLoaded, { once: true });
            video.addEventListener('canplay', handleLoaded, { once: true });
        }

        // Настройка видео при загрузке
        const setupVideo = () => {
            const containerHeight = windowHeight;
            const containerWidth = window.innerWidth;
            
            // Рассчитываем масштабирование видео
            const videoAspectRatio = 16 / 9;
            const containerAspectRatio = containerWidth / containerHeight;
            
            let videoWidth, videoHeight;
            
            if (containerAspectRatio > videoAspectRatio) {
                // Контейнер шире, чем видео - видео заполняет по высоте
                videoHeight = containerHeight;
                videoWidth = containerHeight * videoAspectRatio;
            } else {
                // Контейнер уже, чем видео - видео заполняет по ширине
                videoWidth = containerWidth;
                videoHeight = containerWidth / videoAspectRatio;
            }
            
            // Центрируем видео
            video.style.width = `${videoWidth}px`;
            video.style.height = `${videoHeight}px`;
            video.style.left = `${(containerWidth - videoWidth) / 2}px`;
            video.style.top = `${(containerHeight - videoHeight) / 2}px`;
        };

        setupVideo();

        return () => {
            video.removeEventListener('ended', handleVideoEnd);
        };
    }, [windowHeight]);

    // Функция для настройки анимации появления текстовых элементов
    const setupTextAnimations = useCallback(() => {
        // Очищаем предыдущие анимации
        textAnimationsRef.current.forEach(animation => animation.kill());
        textAnimationsRef.current = [];

        const section = sectionRef.current;
        if (!section) return;

        const elements = [
            { element: title1Ref.current, percent: 10 },
            { element: title2Ref.current, percent: 20 },
            { element: title3Ref.current, percent: 35 },
            { element: title4Ref.current, percent: 50 },
            { element: title5Ref.current, percent: 65 },
            { element: title6Ref.current, percent: 75 },
        ];

        // Сначала скрываем все элементы
        elements.forEach(({ element }) => {
            if (element) {
                gsap.set(element, {
                    opacity: 0,
                    y: 30,
                });
            }
        });

        // Создаем анимации для каждого элемента
        elements.forEach(({ element, percent }) => {
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
        
        if (!section || !content || !pin || !windowHeight) return;

        const calculateSectionHeight = () => {
            const scrollDistance = 5000;
            return scrollDistance + windowHeight;
        };

        const sectionHeight = calculateSectionHeight();
        section.style.minHeight = `${sectionHeight}px`;

        const initScrollAnimation = () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }

            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: `+=5000`,
                scrub: true,
                pin: pin,
                pinSpacing: false,
                onRefresh: () => {
                    setupTextAnimations();
                }
            });

            // Настраиваем анимации текстовых элементов
            setupTextAnimations();

            ScrollTrigger.refresh();
        };

        // Инициализируем видео
        initializeVideo();
        
        // Инициализируем анимацию скролла
        initScrollAnimation();

        // Обработчик ресайза
        const handleResize = () => {
            initScrollAnimation();
        };

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
        };
    }, [windowHeight, setupTextAnimations, initializeVideo]);

    const handleScrollIntoView = () => {
        const element = document.getElementById('our-projects-block');
        const yOffset = window.innerWidth > 1024 ? -20 : 0;

        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    return (
        <div className='main-banner-wrapper' id='main-banner' ref={sectionRef}>
            <div className="main-banner-pin-wrapper" ref={pinRef}>
                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        className='home-video'
                        id='home-video'
                        preload="auto"
                        playsInline
                        muted
                        loop
                        autoPlay
                        webkit-playsinline="true"
                        style={{ display: 'block' }}
                    >
                        <source src="./Pigeon.mp4" type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                    </video>
                </div>

                <div className="main-banner-content" ref={contentRef}>
                    <div className='main-banner-title-wrapper'>
                        <h1 
                            ref={title1Ref}
                            className={`${FONT_MONT_BOOK.className} main-banner-title main-banner-title-1`}
                        >
                            {'Масштаб'}
                        </h1>
                        <h1 
                            ref={title2Ref}
                            className={`${FONT_MONT_BOOK.className} main-banner-title main-banner-title-2`}
                        >
                            {'людей, идей'}
                        </h1>
                        <h1 
                            ref={title3Ref}
                            className={`${FONT_MONT_BOOK.className} main-banner-title main-banner-title-3`}
                        >
                            {'и тёплых'}
                        </h1>
                        <h1 
                            ref={title4Ref}
                            className={`${FONT_MONT_BOOK.className} main-banner-title main-banner-title-4`}
                        >
                            {'связей'}
                        </h1>
                    </div>

                    <p 
                        ref={title5Ref}
                        className={`${FONT_MONT_BOOK.className} main-banner-description main-banner-title-5`}
                    >
                        {`Сообщество C-level в${NBSP}IT,\nгде рождаются партнёрства,\nдружба и${NBSP}смыслы, которых\nне найти онлайн`}
                    </p>

                    <div 
                        ref={title6Ref}
                        className='main-banner-title-6'
                    >
                        <MainBannerButton />
                    </div>
                </div>
                
                <div className='scroll-icon-wrapper' onClick={handleScrollIntoView}>
                    <div className='scroll-icon'>
                        <div className='scroll-icon-dot' />
                    </div>
                    <div>
                        <svg className='scroll-icon-bottom' width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.472337 1.57884L4.46415 5.57065C6.27506 7.38156 9.26183 7.33094 11.1352 5.45758L15.2646 1.32812L14.4093 0.472737L10.2798 4.6022C8.89513 5.98686 6.68754 6.02428 5.34903 4.68577L1.35722 0.693958L0.472337 1.57884Z"
                                fill="#BFBFBF"
                                stroke="#BFBFBF"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};