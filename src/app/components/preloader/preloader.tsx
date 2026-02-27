'use client';

import { useEffect, useState } from 'react';
import './preloader.css';
import { FONT_IBM_PLEX_SERIF_LIGHT } from '@/app/fonts';
import Image from 'next/image';
import PreloaderImg from '../../../../public/v2/preloader.svg'

export const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        const startIncrement = () => {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) {
                        return prev;
                    }

                    const increment = Math.floor(Math.random() * 5) + 1;

                    return Math.min(prev + increment, 90);
                });
            }, 333);
        };

        const onWindowLoad = () => {
            setProgress(100);
            clearInterval(interval);

            timeout = setTimeout(() => {
                setVisible(false);
                document.body.style.overflow = '';
            }, 500);
        };

        if (document.readyState === 'complete') {
            onWindowLoad();
        } else {
            startIncrement();
            window.addEventListener('load', onWindowLoad);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);

            window.removeEventListener('load', onWindowLoad);

            document.body.style.overflow = '';
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={'preloader'} data-visible={isVisible}>
            <div className={'preloader__content'}>
                <Image
                    src={PreloaderImg}
                    alt='preloader'
                    width={280}
                    height={80}
                />
                <div className={`preloader__progress ${FONT_IBM_PLEX_SERIF_LIGHT.className}`}>{progress}%</div>
            </div>
        </div>
    );
};
