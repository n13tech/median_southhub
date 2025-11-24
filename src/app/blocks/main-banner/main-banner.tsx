/* eslint-disable react-hooks/set-state-in-effect */
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
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        // Устанавливаем высоту окна при монтировании
        setWindowHeight(window.innerHeight);
        
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const content = contentRef.current;
        const pin = pinRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (!section || !content || !pin || !canvas || !ctx || !windowHeight) return;

        let scrollTrigger: ScrollTrigger | null = null;

        // Динамически рассчитываем высоту секции на основе высоты экрана
        const calculateSectionHeight = () => {
            const scrollDistance = 5000; // Фиксированное расстояние скролла в пикселях
            return scrollDistance + windowHeight; // Высота экрана + расстояние скролла
        };

        // Устанавливаем высоту секции
        const sectionHeight = calculateSectionHeight();
        section.style.minHeight = `${sectionHeight}px`;

        const loadImages = async () => {
            const totalFrames = 100;
            const images: HTMLImageElement[] = [];

            for (let i = 0; i < totalFrames; i++) {
                const img = new Image();
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

            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) {
                    trigger.kill();
                }
            });

            // Адаптивные размеры canvas
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

            scrollTrigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: `+=${5000}`, // 5000px скролла
                scrub: true,
                pin: pin,
                pinSpacing: false,
                onUpdate: (self) => {
                    const totalFrames = imagesRef.current.length;
                    const frameIndex = Math.min(
                        Math.floor(self.progress * totalFrames),
                        totalFrames - 1
                    );
                    
                    const currentImage = imagesRef.current[frameIndex];
                    if (currentImage && currentImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
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
                    const lastImage = imagesRef.current[imagesRef.current.length - 1];
                    if (lastImage && lastImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(lastImage, 0, 0, canvas.width, canvas.height);
                    }
                },
                onLeaveBack: () => {
                    const firstImage = imagesRef.current[0];
                    if (firstImage && firstImage.complete) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
                    }
                }
            });

            ScrollTrigger.refresh();
        };

        initScrollAnimation();

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
        loadImages();

        return () => {
            if (scrollTrigger) scrollTrigger.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) trigger.kill();
            });
        };
    }, [imagesLoaded, windowHeight]);

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