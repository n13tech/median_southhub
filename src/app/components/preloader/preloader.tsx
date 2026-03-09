/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import './preloader.css';
import { FONT_IBM_PLEX_SERIF_LIGHT } from '@/app/fonts';
import Image from 'next/image';
import PreloaderImg from '../../../../public/v2/preloader.svg'
import { useVideoLoadingProgress } from '@/app/hooks/use-video-loading-process';

export const Preloader = () => {
    const [isVisible, setVisible] = useState(true);

    const videoLoadingProgress = useVideoLoadingProgress('main-video-banner');

    useEffect(() => {
        if (videoLoadingProgress === 100) {
            setVisible(false);
        }
    }, [videoLoadingProgress]);

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
                <div className={`preloader__progress ${FONT_IBM_PLEX_SERIF_LIGHT.className}`}>{videoLoadingProgress}%</div>
            </div>
        </div>
    );
};
