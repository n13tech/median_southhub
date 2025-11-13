'use client'

import Image from 'next/image';
import { FONT_MONT_BOOK } from '../../fonts';

import Logo from '../../../../public/telega-black.svg';
import Login from '../../../../public/login.svg';

import './header.css';

export const HeaderLogin = () => {
    return (
        <div className='header-login-block'>
            <a
                className={`${FONT_MONT_BOOK.className} header_item header_item_logo`}
                href='https://lk.southhub.ru/'
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
            <a href='https://t.me/sthhb' target='_blank' className={`${FONT_MONT_BOOK.className} header_item header_item_logo`}>
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