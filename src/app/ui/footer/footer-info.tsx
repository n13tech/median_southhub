'use client';

import Image from 'next/image';
import { FONT_MONT_BOOK } from '../../fonts';

import LogoWhite from '../../../../public/logo-white.svg';

import './footer.css';

export const FooterInfo = () => {
    return (
        <div className='footer-info'>
            <a href='mailto:mail@southhub.ru' className={`${FONT_MONT_BOOK.className} footer-info-email`}>Email: mail@southhub.ru</a>
            <Image
                src={LogoWhite}
                alt="southuub"
                height={20}
                priority
            />
            <p onClick={() => alert('ОЧЕНЬ ПУБЛИЧНАЯ')} className={`${FONT_MONT_BOOK.className} footer-info-oferta`}>Публичная оферта</p>
        </div>
    );
}