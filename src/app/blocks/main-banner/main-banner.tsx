/* eslint-disable react-hooks/set-state-in-effect */
import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';
import { NBSP } from '@/app/constants';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './main-banner.css';

const totalCountImg = 120;

// > Дольше, < Быстрее
const ANIMATION_SPEED_FACTOR = 0.8;

export const MainBanner = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollBoxRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalCountImg).fill(null));
    
    // Refs для текстовых элементов
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);
    const title3Ref = useRef<HTMLHeadingElement>(null);
    const title4Ref = useRef<HTMLHeadingElement>(null);
    const title5Ref = useRef<HTMLParagraphElement>(null);
    const title6Ref = useRef<HTMLDivElement>(null);
    
    const [windowHeight, setWindowHeight] = useState(0);
    const loadedFramesRef = useRef<Set<number>>(new Set());
    const loadingQueueRef = useRef<number[]>([]);
    const isCurrentlyLoadingRef = useRef(false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const textAnimationsRef = useRef<ScrollTrigger[]>([]);

    // Используем ref для функции, чтобы избежать проблем с порядком объявления
    const processLoadingQueueRef = useRef<() => Promise<void>>();

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Функция для загрузки пачки кадров
    const loadFrameBatch = useCallback(async (frameIndices: number[]): Promise<void> => {
        const promises = frameIndices.map(frameIndex => {
            return new Promise<void>((resolve, reject) => {
                if (imagesRef.current[frameIndex]?.complete || loadedFramesRef.current.has(frameIndex)) {
                    resolve();
                    return;
                }

                const img = new Image();
                img.src = `/main/AnimLettera_MOV_Prores4444_${frameIndex.toString().padStart(5, '0')}.webp`;
                
                img.onload = () => {
                    imagesRef.current[frameIndex] = img;
                    loadedFramesRef.current.add(frameIndex);
                    resolve();
                };
                
                img.onerror = () => {
                    resolve();
                };
            });
        });

        await Promise.all(promises);
    }, []);

    // Инициализируем processLoadingQueueRef после объявления loadFrameBatch
    useEffect(() => {
        const processLoadingQueue = async () => {
            if (isCurrentlyLoadingRef.current || loadingQueueRef.current.length === 0) {
                return;
            }

            isCurrentlyLoadingRef.current = true;

            // Берем следующую пачку из 10 кадров из очереди
            const batch = loadingQueueRef.current.splice(0, 10);
            
            if (batch.length > 0) {
                await loadFrameBatch(batch);
            }

            isCurrentlyLoadingRef.current = false;

            // Проверяем есть ли еще кадры в очереди и запускаем следующую пачку
            if (loadingQueueRef.current.length > 0) {
                setTimeout(() => {
                    processLoadingQueueRef.current?.();
                }, 30);
            }
        };

        processLoadingQueueRef.current = processLoadingQueue;
    }, [loadFrameBatch]);

    // Добавление кадров в очередь загрузки
    const queueFramesForLoading = useCallback((frameIndices: number[]) => {
        const newFrames = frameIndices.filter(frame => 
            !loadedFramesRef.current.has(frame) && 
            !loadingQueueRef.current.includes(frame)
        );
        
        if (newFrames.length === 0) return;
        
        loadingQueueRef.current.push(...newFrames);
        
        // Запускаем обработку очереди если она не активна
        if (!isCurrentlyLoadingRef.current) {
            processLoadingQueueRef.current?.();
        }
    }, []);

    // Фоновая загрузка всех оставшихся кадров
    const loadAllRemainingFrames = useCallback(() => {
        const allFrames = Array.from({ length: totalCountImg }, (_, i) => i);
        const remainingFrames = allFrames.filter(frame => 
            !loadedFramesRef.current.has(frame)
        );
        
        if (remainingFrames.length > 0) {
            queueFramesForLoading(remainingFrames);
        }
    }, [queueFramesForLoading]);

    // Находим ближайший загруженный кадр
    const findNearestLoadedFrame = useCallback((targetFrame: number): number => {
        for (let offset = 0; offset < totalCountImg; offset++) {
            const before = targetFrame - offset;
            const after = targetFrame + offset;
            
            if (before >= 0 && loadedFramesRef.current.has(before)) return before;
            if (after < totalCountImg && loadedFramesRef.current.has(after)) return after;
        }
        return -1;
    }, []);

    // Предзагрузка первой пачки критических кадров и запуск фоновой загрузки
    const preloadCriticalAndStartBackground = useCallback(async () => {
        // Первая пачка: самые важные кадры для мгновенного отображения
        const criticalFrames = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 75, 99, 119];
        await loadFrameBatch(criticalFrames);
        
        // Немедленно запускаем фоновую загрузку всех оставшихся кадров
        loadAllRemainingFrames();
    }, [loadFrameBatch, loadAllRemainingFrames]);

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
                // play - когда триггер входит в viewport (onEnter)
                // reverse - когда триггер выходит из viewport (onLeaveBack)
                // play - когда триггер снова входит в viewport (onEnterBack)
                // reverse - когда триггер снова выходит из viewport (onLeave)
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
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (!section || !content || !pin || !canvas || !ctx || !windowHeight) return;

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

            const isTablet = window.innerWidth <= 1280 && window.innerWidth > 1024;
            const isMobile = window.innerWidth <= 1024;

            if (!isTablet && !isMobile) {
                canvas.width = 849;
                canvas.height = 849;
            } else if (isTablet) {
                canvas.width = 739;
                canvas.height = 739;
            } else if (isMobile) {
                canvas.width = 572;
                canvas.height = 572;
            }

            // Определяем расстояние для анимации
            const scrollDistance = 5000;
            const mobileScrollDistance = scrollDistance * ANIMATION_SPEED_FACTOR;
            
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: `+=${isMobile ? mobileScrollDistance : scrollDistance}`,
                scrub: true,
                pin: pin,
                pinSpacing: false,
                onUpdate: (self) => {
                    const totalFrames = totalCountImg;
                    const frameIndex = Math.min(
                        Math.floor(self.progress * totalFrames),
                        totalFrames - 1
                    );
                    
                    const currentImage = imagesRef.current[frameIndex];
                    if (currentImage && currentImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
                    } else {
                        // Показываем ближайший загруженный кадр
                        const nearestLoaded = findNearestLoadedFrame(frameIndex);
                        if (nearestLoaded !== -1 && imagesRef.current[nearestLoaded]) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(imagesRef.current[nearestLoaded]!, 0, 0, canvas.width, canvas.height);
                        }
                    }
                },
                onEnter: () => {
                    const firstImage = imagesRef.current[0];
                    if (firstImage && firstImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
                    }
                },
                onLeave: () => {
                    const lastImage = imagesRef.current[totalCountImg - 1];
                    if (lastImage && lastImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(lastImage, 0, 0, canvas.width, canvas.height);
                    }
                },
                onRefresh: () => {
                    setupTextAnimations();
                }
            });

            // Настраиваем анимации текстовых элементов
            setupTextAnimations();

            ScrollTrigger.refresh();
        };

        // Запускаем предзагрузку и фоновую загрузку
        preloadCriticalAndStartBackground().then(() => {
            initScrollAnimation();
        });

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
    }, [
        windowHeight, 
        findNearestLoadedFrame,
        preloadCriticalAndStartBackground,
        setupTextAnimations
    ]);

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
                    <canvas
                        ref={canvasRef}
                        className='home-video'
                        id='home-video'
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
                
                <div ref={scrollBoxRef} className='scroll-icon-wrapper' onClick={handleScrollIntoView}>
                    <div className='scroll-icon'>
                        <div className='scroll-icon-dot' />
                    </div>
                    <div>
                        <svg className='scroll-icon-bottom' width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.472337 1.57884L4.46415 5.57065C6.27506 7.38156 9.26183 7.33094 11.1352 5.45758L15.2646 1.32812L14.4093 0.472737L10.2798 4.6022C8.89513 5.98686 6.68754 6.02428 5.34903 4.68577L1.35722 0.693958L0.472337 1.57884Z" fill="#BFBFBF" stroke="#BFBFBF" stroke-width="0.667421"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};