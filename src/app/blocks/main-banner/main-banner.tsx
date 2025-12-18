/* eslint-disable react-hooks/set-state-in-effect */
import { Fade } from 'react-awesome-reveal';
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
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalCountImg).fill(null));
    const [windowHeight, setWindowHeight] = useState(0);
    const loadedFramesRef = useRef<Set<number>>(new Set());
    const loadingQueueRef = useRef<number[]>([]);
    const isCurrentlyLoadingRef = useRef(false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

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
                }, 30); // Уменьшаем задержку для более быстрой загрузки
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
            const mobileScrollDistance = scrollDistance * ANIMATION_SPEED_FACTOR; // На 20% короче = на 20% быстрее
            
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
                }
            });

            ScrollTrigger.refresh();
        };

        // Запускаем предзагрузку и фоновую загрузку
        preloadCriticalAndStartBackground().then(() => {
            initScrollAnimation();
        });

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
        };
    }, [
        windowHeight, 
        findNearestLoadedFrame,
        preloadCriticalAndStartBackground
    ]);

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
                    <Fade triggerOnce>
                        <h1 className={`${FONT_MONT_BOOK.className} main-banner-title`}>
                            {'Масштаб\nлюдей, идей\nи тёплых\nсвязей'}
                        </h1>

                        <p className={`${FONT_MONT_BOOK.className} main-banner-description`}>
                            {`Сообщество C-level в${NBSP}IT,\nгде рождаются партнёрства,\nдружба и${NBSP}смыслы, которых\nне найти онлайн`}
                        </p>

                        <div>
                            <MainBannerButton />
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
};