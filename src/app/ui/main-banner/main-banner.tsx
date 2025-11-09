import { FONT_MONT_BOOK } from '../../fonts';
import { MainBannerButton } from './main-banner-button';

import './main-banner.css';

export const MainBanner = () => {
    return (
        <div className='main-banner-wrapper' id='main-banner'>

            <h1 className={`${FONT_MONT_BOOK.className} main-banner-title`}>
                {'Масштаб\nлюдей, идей\nи тёплых связей'}
            </h1>

            <p className={`${FONT_MONT_BOOK.className} main-banner-description`}>
                {'Здесь рождаются партнёрства,\nдружба и смыслы, которых\nне найти онлайн'}
            </p>

            <div>
                <MainBannerButton />
            </div>
        </div>
    );
}