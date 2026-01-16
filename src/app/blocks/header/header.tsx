'use client';
import Image from 'next/image';

import Logo from '../../../../public/logo.svg';
import { HeaderItem } from './header-item';

import './header.css';
import { HeaderBurger } from './header-burger';
import { HeaderLogin } from './header-login';

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
                    />

                    <HeaderBurger />
                </div>

                <div>
                    <HeaderItem title='наши проекты' intoScroll='our-projects-block' />
                </div>

                <div>
                    <HeaderItem title='для кого' intoScroll='for-who-scrollable-block' />
                </div>

                <div className='header_desktop_login'>
                    <HeaderLogin />
                </div>
            </div>
        </div>
    );
}