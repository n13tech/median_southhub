import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';

import './main-banner.css';
import { NBSP } from '@/app/constants';
import { useEffect } from 'react';

export const MainBanner = () => {
    useEffect(() => {
        setTimeout(() => {
            const video = document.querySelector('#home-video');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            video?.play();
        }, 250);
    }, []);

    return (
        <div className='main-banner-wrapper' id='main-banner'>
            <div className="video-wrapper">
                <video muted className='home-video' id='home-video' loop={false} playsInline>
                    <source src={'/AnimLettera.mp4'} type="video/mp4"  />
                </video>
            </div>

            <Fade direction='up' triggerOnce>
                <h1 className={`${FONT_MONT_BOOK.className} main-banner-title`}>
                    {'Масштаб\nлюдей, идей\nи тёплых\nсвязей'}
                </h1>
            </Fade>

            <Fade delay={250} triggerOnce>
                <p className={`${FONT_MONT_BOOK.className} main-banner-description`}>
                    {`Сообщество C-level в${NBSP}IT,\nгде рождаются партнёрства,\nдружба и${NBSP}смыслы, которых\nне найти онлайн`}
                </p>
            </Fade>

            <div>
                <Fade delay={250} triggerOnce>
                    <MainBannerButton />
                </Fade>
            </div>
        </div>
    );
}