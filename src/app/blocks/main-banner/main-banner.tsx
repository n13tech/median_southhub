import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';
import { NBSP } from '@/app/constants';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './main-banner.css';

export const MainBanner = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const isTablet = typeof window !== undefined && window.innerWidth <= 1280 && window.innerWidth > 1024;
    const isMobile = typeof window !== undefined && window.innerWidth <= 1024;

    useEffect(() => {
        // Регистрируем плагин ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const content = contentRef.current;
        const pin = pinRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (!section || !content || !pin || !canvas || !ctx) return;

        let scrollTrigger: ScrollTrigger | null = null;

        // Загружаем последовательность из 100 изображений
        const loadImages = async () => {
            const totalFrames = 100;
            const images: HTMLImageElement[] = [];

            for (let i = 0; i < totalFrames; i++) {
                const img = new Image();
                // Используем Next.js public directory с правильными названиями файлов
                img.src = `/main/AnimLettera_${i.toString().padStart(5, '0')}.png`;
                
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
                
                images.push(img);
            }

            imagesRef.current = images;
            setImagesLoaded(true);
        };

        const initScrollAnimation = () => {
            if (!imagesLoaded) return;

            // Сбрасываем все предыдущие ScrollTrigger для этой секции
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) {
                    trigger.kill();
                }
            });

            if (!isTablet && !isMobile) {
                canvas.width = 849;
                canvas.height = 849;
            }

            if (isTablet) {
                canvas.width = 739;
                canvas.height = 739;
            }

            if (isMobile) {
                canvas.width = 572;
                canvas.height = 572;
            }

            // Анимация для фиксации всего контента и управления кадрами
            scrollTrigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: '+=5000',
                scrub: true,
                pin,
                pinSpacing: false,
                onUpdate: (self) => {
                    // Вычисляем текущий кадр на основе прогресса
                    const totalFrames = imagesRef.current.length;
                    const frameIndex = Math.min(
                        Math.floor(self.progress * totalFrames),
                        totalFrames - 1
                    );
                    
                    const currentImage = imagesRef.current[frameIndex];
                    if (currentImage && currentImage.complete) {
                        // Очищаем canvas и рисуем текущий кадр
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
                    }
                },
                onEnter: () => {
                    // Показываем первый кадр
                    const firstImage = imagesRef.current[0];
                    if (firstImage && firstImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
                    }
                },
                onLeave: () => {
                    // Показываем последний кадр
                    const lastImage = imagesRef.current[imagesRef.current.length - 1];
                    if (lastImage && lastImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(lastImage, 0, 0, canvas.width, canvas.height);
                    }
                },
                onLeaveBack: () => {
                    // Возвращаемся к первому кадру
                    const firstImage = imagesRef.current[0];
                    if (firstImage && firstImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
                    }
                }
            });

            // Обновляем после создания
            ScrollTrigger.refresh();
        };

        initScrollAnimation();

        // Предзагружаем первые 10 кадров для мгновенного отображения
        const preloadFirstFrames = async () => {
            const preloadPromises = [];
            for (let i = 0; i < 10; i++) {
                const img = new Image();
                img.src = `/main/AnimLettera_${i.toString().padStart(5, '0')}.png`;
                preloadPromises.push(new Promise((resolve) => {
                    img.onload = resolve;
                }));
                imagesRef.current[i] = img;
            }
            await Promise.all(preloadPromises);
            setImagesLoaded(true);
        };

        preloadFirstFrames();
        loadImages(); // Загружаем остальные кадры в фоне

        // Очистка при размонтировании
        return () => {
            if (scrollTrigger) {
                scrollTrigger.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) {
                    trigger.kill();
                }
            });
        };
    }, [imagesLoaded, isMobile, isTablet]);

    return (
        <div className='main-banner-wrapper' id='main-banner' ref={sectionRef}>
            {/* Контейнер для фиксации всего контента */}
            <div className="main-banner-pin-wrapper" ref={pinRef}>
                {/* Canvas для отрисовки кадров */}
                <div className="video-wrapper">
                    <canvas
                        ref={canvasRef}
                        className='home-video'
                        id='home-video'
                    />
                </div>

                {/* Текстовый контент */}
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