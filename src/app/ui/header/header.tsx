import Image from 'next/image';

import Logo from '../../../../public/logo.svg';
import { HeaderItem } from './header-item';

import './header.css';
import { HeaderBurger } from './header-burger';

export const Header = () => {
    return (
        <div className='header header_desktop' id='header'>
            <div className='header-logo'>
                <Image
                    src={Logo}
                    alt="SOUTHUUUB"
                    width={180}
                    height={21}
                    priority
                />

                <HeaderBurger />
            </div>

            <div>
                <HeaderItem title='о сообществе' intoScroll='community-in-numbers' />
            </div>

            <div>
                <HeaderItem title='о нас' intoScroll='about-us-block' />
            </div>

            <div />
        </div>
    );
}