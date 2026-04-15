/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useRef, useState } from 'react';
import './preloader.css';
import { FONT_IBM_PLEX_SERIF_LIGHT } from '@/app/fonts';
import Image from 'next/image';
import PreloaderImg1 from '../../../../public/v2/preloader-icon-1.svg'
import PreloaderImg2 from '../../../../public/v2/preloader-icon-2.svg'
import PreloaderImg3 from '../../../../public/v2/preloader-icon-3.svg'
import { useVideoLoadingProgress } from '@/app/hooks/use-video-loading-process';

const PRELOADER_IMAGES = [PreloaderImg1, PreloaderImg2, PreloaderImg3];
const STEP_INTERVAL_MS = 500;
const HIDE_ANIMATION_MS = 700;
const OVERFLOW_RESTORE_DELAY_MS = 500;

export const Preloader = () => {
    const [isVisible, setVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const overflowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const videoLoadingProgress = useVideoLoadingProgress('main-video-banner');

    // Управление overflow с задержкой при скрытии
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (overflowTimerRef.current) {
            clearTimeout(overflowTimerRef.current);
        }

        if (isVisible) {
            html.style.overflowY = 'hidden';
            body.style.overflowY = 'hidden';
        } else {
            overflowTimerRef.current = setTimeout(() => {
                html.style.overflowY = '';
                body.style.overflowY = '';
            }, OVERFLOW_RESTORE_DELAY_MS);
        }

        return () => {
            if (overflowTimerRef.current) {
                clearTimeout(overflowTimerRef.current);
            }
            html.style.overflowY = '';
            body.style.overflowY = '';
        };
    }, [isVisible]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % PRELOADER_IMAGES.length);
        }, STEP_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (videoLoadingProgress !== 100) return;

        setIsAnimating(true);

        const timer = setTimeout(() => {
            window.scrollTo(0,0);
            setVisible(false);
        }, HIDE_ANIMATION_MS);

        return () => clearTimeout(timer);
    }, [videoLoadingProgress]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`preloader ${isAnimating ? 'preloader--hidden' : ''}`}>
            <div className="preloader__content">
                <div className="preloader__images">
                    {PRELOADER_IMAGES.map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt={`preloader step ${index + 1}`}
                            width={280}
                            height={80}
                            className={`preloader__image ${activeStep === index ? 'preloader__image--active' : ''}`}
                        />
                    ))}
                </div>

                <div className={`preloader__progress ${FONT_IBM_PLEX_SERIF_LIGHT.className}`}>
                    {videoLoadingProgress}%
                </div>
            </div>
        </div>
    );
};