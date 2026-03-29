'use client';

import { useEffect, useState } from 'react';
import './preloader.css';
import { FONT_IBM_PLEX_SERIF_LIGHT } from '@/app/fonts';
import Image from 'next/image';
import PreloaderImg1 from '../../../../public/v2/preloader-icon-1.svg'
import PreloaderImg2 from '../../../../public/v2/preloader-icon-2.svg'
import PreloaderImg3 from '../../../../public/v2/preloader-icon-3.svg'
import { useVideoLoadingProgress } from '@/app/hooks/use-video-loading-process';

export const Preloader = () => {
    const [isVisible, setVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeStep, setActiveStep] = useState(1);

    const videoLoadingProgress = useVideoLoadingProgress('main-video-banner');

    useEffect(() => {
        const html = document.querySelector('html');
        const body = document.querySelector('body');

        if (isVisible) {
            if (html) html.style.overflowY = 'hidden';
            if (body) body.style.overflowY = 'hidden';
        } else {
            if (html) html.style.overflowY = '';
            if (body) body.style.overflowY = '';
        }
        
        return () => {
            if (html) html.style.overflowY = '';
            if (body) body.style.overflowY = '';
        };
    }, [isVisible]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => {
                switch(prev) {
                    case 1:
                        return 2;
                    case 2:
                        return 3;
                    case 3:
                        return 1;
                    default:
                        return 1;
                }
            });
        }, 500);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (videoLoadingProgress === 100) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsAnimating(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 700);
            
            return () => clearTimeout(timer);
        }
    }, [videoLoadingProgress]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`preloader ${isAnimating ? 'preloader--hidden' : ''}`} data-visible={isVisible}>
            <div className="preloader__content">
                <div className="preloader__images">
                    <Image
                        src={PreloaderImg1}
                        alt="preloader"
                        width={280}
                        height={80}
                        className={`preloader__image ${activeStep === 1 ? 'preloader__image--active' : ''}`}
                    />
                    <Image
                        src={PreloaderImg2}
                        alt="preloader"
                        width={280}
                        height={80}
                        className={`preloader__image ${activeStep === 2 ? 'preloader__image--active' : ''}`}
                    />
                    <Image
                        src={PreloaderImg3}
                        alt="preloader"
                        width={280}
                        height={80}
                        className={`preloader__image ${activeStep === 3 ? 'preloader__image--active' : ''}`}
                    />
                </div>
                
                <div className={`preloader__progress ${FONT_IBM_PLEX_SERIF_LIGHT.className}`}>
                    {videoLoadingProgress}%
                </div>
            </div>
        </div>
    );
};