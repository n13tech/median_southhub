'use client'

import Image from 'next/image';
import { FONT_MONT_BOOK } from '../../fonts';

import Logo from '../../../../public/telega-black.svg';
import Login from '../../../../public/login.svg';

import './header.css';
import { LK_REGISTER_LINK, TELEGRAM_CHANELL_LINK } from '@/app/constants';

export const HeaderLogin = () => {
    return (
        <div className='header-login-block'>
            <a
                className={`${FONT_MONT_BOOK.className} header_item header_item_logo`}
                href={LK_REGISTER_LINK}
                target='_blank'
            >
                <p>войти</p>
                <Image
                    src={Login}
                    alt='login'
                    width={50}
                    height={50}
                />
            </a>
            <a href={TELEGRAM_CHANELL_LINK} target='_blank' className={`${FONT_MONT_BOOK.className} header_item header_item_logo`}>
                <Image
                    src={Logo}
                    alt='telega'
                    width={50}
                    height={50}
                />
                <p className='header-desctop-hiden'>телеграм</p>
            </a>
        </div>
    );
}