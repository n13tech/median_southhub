'use client';

import Image from 'next/image';
import TelegaIcon from '../../../../public/telegramm-icon-white.svg';
import LogoWhite from '../../../../public/logo-white.svg';

import './infinity-banner.css';
import { FONT_MONT_BOOK } from '@/app/fonts';
import { TELEGRAM_CHANELL_LINK } from '@/app/constants';
import { useGetLinkWithUtm } from '@/app/hooks/use-get-link-with-utm';

const Item = () => {
    return (
        <div className='infinity-banner-item'>
            <Image
                src={TelegaIcon}
                alt="telegramm-icon"
                height={52}
                width={52}
            />
            <Image
                src={LogoWhite}
                alt="southuub"
                height={52}
            />
            <p className={`${FONT_MONT_BOOK.className} infinity-banner-text`}>
                Все инсайты и новости ближе, чем вы думаете
            </p>
            <Image
                src={TelegaIcon}
                alt="telegramm-icon"
                height={52}
                width={52}
            />
            <Image
                src={LogoWhite}
                alt="southuub"
                height={52}
            />
            <p className={`${FONT_MONT_BOOK.className} infinity-banner-text`}>
                Подпишитесь, чтобы оставаться на связи
            </p>
        </div>
    )
}

export const InfinityBanner = () => {
    const getLinkWIthUtm = useGetLinkWithUtm();

    return (
        <a className='infinity-banner-wrapper' id='infinity-banner' href={getLinkWIthUtm(TELEGRAM_CHANELL_LINK)} target='_blank'>
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
        </a>
    )
};
