'use client';

import Image from 'next/image';
import Arrow from '../../../../public/arrow.svg';
import LogoWhite from '../../../../public/logo-white.svg';

import './infinity-banner.css';
import { FONT_MONT_BOOK } from '@/app/fonts';

const Item = () => {
    return (
        <div className='infinity-banner-item'>
            <Image
                src={Arrow}
                alt="arrow"
                height={52}
                width={52}
                priority
            />
            <Image
                src={LogoWhite}
                alt="southuub"
                height={52}
                priority
            />
            <p className={`${FONT_MONT_BOOK.className} infinity-banner-text`}>
                Подпишитесь, чтобы оставаться на связи
            </p>
        </div>
    )
}

export const InfinityBanner = () => {
    const handleClick = () => alert('WELCOME TELEGA');

    return (
        <div className='infinity-banner-wrapper' id='infinity-banner' onClick={handleClick}>
            <div className="infinity-banner-items infinity-banner-marquee">
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
            <div aria-hidden="true" className="infinity-banner-items infinity-banner-marquee">
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    )
};
