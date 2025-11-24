import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';
import { NBSP } from '@/app/constants';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './main-banner.css';

export const MainBanner = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Регистрируем плагин ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        const video = videoRef.current;
        const section = sectionRef.current;
        const content = contentRef.current;
        const pin = pinRef.current;
        
        if (!video || !section || !content || !pin) return;

        let scrollTrigger: ScrollTrigger | null = null;

        const initScrollAnimation = () => {
            // Устанавливаем видео в начало и приостанавливаем
            video.currentTime = 0;
            video.pause();

            // Сбрасываем все предыдущие ScrollTrigger для этой секции
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) {
                    trigger.kill();
                }
            });

            // Анимация для фиксации всего контента и управления видео
            scrollTrigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                pin: pin, // Фиксируем весь контейнер
                pinSpacing: false,
                onUpdate: (self) => {
                    // Плавное управление временем видео от 0 до конца
                    if (video.duration) {
                        video.currentTime = video.duration * self.progress;
                    }
                },
                onEnter: () => {
                    // Убедимся, что видео в начале
                    if (video.duration) {
                        video.currentTime = 0;
                    }
                },
                onLeave: () => {
                    // Убедимся, что видео в конце
                    if (video.duration) {
                        video.currentTime = video.duration;
                    }
                },
                onLeaveBack: () => {
                    // Убедимся, что видео в начале
                    if (video.duration) {
                        video.currentTime = 0;
                    }
                }
            });

            // Обновляем после создания
            ScrollTrigger.refresh();
        };

        const handleVideoReady = () => {
            setTimeout(initScrollAnimation, 100);
        };

        if (video.readyState >= 1) {
            // Метаданные уже загружены
            handleVideoReady();
        } else {
            // Ждем загрузки метаданных
            video.addEventListener('loadedmetadata', handleVideoReady);
        }

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
    }, []);

    return (
        <div className='main-banner-wrapper' id='main-banner' ref={sectionRef}>
            <div className="pin-container" ref={pinRef}>
                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        muted 
                        className='home-video' 
                        id='home-video' 
                        loop={false} 
                        playsInline
                        preload="metadata"
                    >
                        <source src={'/AnimLettera.mp4'} type="video/mp4" />
                    </video>
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