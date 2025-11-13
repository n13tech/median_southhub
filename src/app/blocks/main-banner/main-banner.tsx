import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';

// import Video from '../../../../public/we';

import './main-banner.css';

export const MainBanner = () => {
    return (
        <div className='main-banner-wrapper' id='main-banner'>
            <Fade direction='up' triggerOnce>
                <h1 className={`${FONT_MONT_BOOK.className} main-banner-title`}>
                    {'Масштаб\nлюдей, идей\nи тёплых\nсвязей'}
                </h1>
            </Fade>

            <Fade delay={250} triggerOnce>
                <p className={`${FONT_MONT_BOOK.className} main-banner-description`}>
                    {'Сообщество C-level в IT,\nгде рождаются партнёрства,\nдружба и смыслы, которых\nне найти онлайн'}
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