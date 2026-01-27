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
    const playAttemptRef = useRef<number>(0);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Функция для определения Safari
    const isSafari = useCallback(() => {
        const ua = navigator.userAgent.toLowerCase();
        const isSafari = ua.includes('safari') && !ua.includes('chrome');
        const isIOS = /iphone|ipad|ipod/.test(ua);
        const isMac = /macintosh/.test(ua);
        
        return {
            isSafari: isSafari || isIOS,
            isIOS,
            isMac,
            isDesktopSafari: isSafari && isMac && !isIOS
        };
    }, []);

    // Приоритетная загрузка видео для Safari
    const loadVideoWithPriority = useCallback(async () => {
        const video = videoRef.current;
        if (!video) return false;

        const browserInfo = isSafari();
        console.log('Browser info:', browserInfo);

        try {
            // Для Safari: используем более агрессивную стратегию загрузки
            if (browserInfo.isSafari) {
                // Устанавливаем приоритетные атрибуты для Safari
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = 'auto';
                video.load(); // Принудительная загрузка
                
                // Для iOS Safari добавляем специальные атрибуты
                if (browserInfo.isIOS) {
                    video.setAttribute('webkit-playsinline', 'true');
                    video.setAttribute('playsinline', 'true');
                    
                    // Делаем несколько попыток воспроизведения
                    const playWithRetry = async (attempt: number = 0): Promise<boolean> => {
                        if (attempt >= 3) return false;
                        
                        try {
                            await video.play();
                            return true;
                        } catch (error) {
                            console.log(`Play attempt ${attempt + 1} failed, retrying...`);
                            
                            // Ждем немного перед следующей попыткой
                            await new Promise(resolve => setTimeout(resolve, 300));
                            
                            // Если это первая попытка и она провалилась,
                            // ждем немного дольше для загрузки видео
                            if (attempt === 0) {
                                await new Promise(resolve => setTimeout(resolve, 500));
                            }
                            
                            return playWithRetry(attempt + 1);
                        }
                    };

                    const played = await playWithRetry();
                    if (played) {
                        setVideoReady(true);
                        return true;
                    }
                } else {
                    // Для desktop Safari
                    await video.play();
                    setVideoReady(true);
                    return true;
                }
            } else {
                // Для других браузеров стандартный подход
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = 'auto';
                
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    setVideoReady(true);
                    return true;
                }
            }
        } catch (error) {
            console.log('Video autoplay failed:', error);
            
            // Если автозапуск не сработал, пробуем альтернативный метод
            try {
                // Перезагружаем видео
                video.load();
                
                // Ждем пока видео будет готово
                await new Promise<void>((resolve) => {
                    if (video.readyState >= 4) {
                        resolve();
                    } else {
                        video.addEventListener('canplaythrough', () => resolve(), { once: true });
                    }
                });

                // Пробуем снова с задержкой
                await new Promise(resolve => setTimeout(resolve, 100));
                await video.play();
                setVideoReady(true);
                return true;
            } catch (retryError) {
                console.log('Retry also failed:', retryError);
                return false;
            }
        }
        
        return false;
    }, [isSafari]);

    // Инициализация видео
    const initializeVideo = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        // Устанавливаем базовые атрибуты
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('muted', 'true');

        // Обработчик для ручного зацикливания (на случай если loop не работает)
        const handleVideoEnd = () => {
            video.currentTime = 0;
            video.play().catch(e => console.log('Video replay error:', e));
        };

        video.addEventListener('ended', handleVideoEnd);

        // Настраиваем размеры видео
        const setupVideoSize = () => {
            const containerHeight = windowHeight;
            const containerWidth = window.innerWidth;
            
            const videoAspectRatio = 16 / 9;
            const containerAspectRatio = containerWidth / containerHeight;
            
            let videoWidth, videoHeight;
            
            if (containerAspectRatio > videoAspectRatio) {
                videoHeight = containerHeight;
                videoWidth = containerHeight * videoAspectRatio;
            } else {
                videoWidth = containerWidth;
                videoHeight = containerWidth / videoAspectRatio;
            }
            
            video.style.width = `${videoWidth}px`;
            video.style.height = `${videoHeight}px`;
            video.style.left = `${(containerWidth - videoWidth) / 2}px`;
            video.style.top = `${(containerHeight - videoHeight) / 2}px`;
        };

        setupVideoSize();

        // Обработчик успешной загрузки
        const handleLoadedData = () => {
            console.log('Video loaded, attempting to play...');
            loadVideoWithPriority().then(success => {
                if (success) {
                    console.log('Video playback started successfully');
                } else {
                    console.log('Video could not start automatically');
                    
                    // Показываем кнопку для ручного запуска если нужно
                    const browserInfo = isSafari();
                    if (browserInfo.isIOS) {
                        // Для iOS добавляем обработчик для ручного запуска
                        const handleUserInteraction = () => {
                            video.play().then(() => {
                                setVideoReady(true);
                                document.removeEventListener('click', handleUserInteraction);
                                document.removeEventListener('touchstart', handleUserInteraction);
                            }).catch(e => console.log('Manual play failed:', e));
                        };
                        
                        document.addEventListener('click', handleUserInteraction);
                        document.addEventListener('touchstart', handleUserInteraction);
                    }
                }
            });
        };

        // Обработчик ошибки загрузки
        const handleError = (e: ErrorEvent) => {
            console.error('Video loading error:', e);
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('ended', handleVideoEnd);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
        };
    }, [windowHeight, loadVideoWithPriority, isSafari]);

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
        const cleanupVideo = initializeVideo();
        
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
            
            // Очищаем обработчики видео
            if (cleanupVideo) cleanupVideo();
            
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
                        src="/Pigeon.mp4"
                        preload="auto"
                        webkit-playsinline="true"
                        playsInline
                        muted
                        loop
                        autoPlay
                        // Добавляем fetchpriority для приоритетной загрузки
                        // (поддерживается в современных браузерах)
                        fetchPriority="high"
                        // Добавляем атрибут для предзагрузки
                        loading="eager"
                    />
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