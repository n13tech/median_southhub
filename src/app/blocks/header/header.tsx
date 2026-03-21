'use client';
import Image from 'next/image';

import Logo from '../../../../public/v2/header-logo-white.svg';
import LogoBlack from '../../../../public/v2/footer/footer-logo-black.svg';
import { HeaderItem } from './header-item';

import './header.css';
import { HeaderBurger } from './header-burger';

export const Header = () => {
    const handleScrollIntoView = () => {
        const element = document.getElementById('header');

        if (element) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <div className='header header_desktop' id='header'>
            <div className='header_desktop_wrapper'>
                <div className='header-logo'>
                    <Image
                        src={Logo}
                        alt="SOUTHUUUB"
                        width={180}
                        height={21}
                        onClick={handleScrollIntoView}
                        style={{ cursor: 'pointer' }}
                        className='header-logo-white'
                    />
                    <Image
                        src={LogoBlack}
                        alt="SOUTHUUUB"
                        width={180}
                        height={21}
                        onClick={handleScrollIntoView}
                        style={{ cursor: 'pointer' }}
                        className='header-logo-black'
                    />

                    <HeaderBurger />
                </div>

                <div className='header-items'>
                    <HeaderItem title='проекты' intoScroll='our-projects-block' />
                    <HeaderItem title='войти' intoScroll='' />
                </div>
            </div>
        </div>
    );
}