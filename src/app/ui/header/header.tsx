import Image from 'next/image';

import Logo from '../../../../public/logo.svg';
import { HeaderItem } from './header-item';

import './header.css';

export const Header = () => {
    return (
        <div className='header' id='header'>
            <div>
                <Image
                    src={Logo}
                    alt="SOUTHUUUB"
                    width={180}
                    height={21}
                    priority
                />
            </div>

            <div>
                <HeaderItem title='о сообществе' intoScroll='community-in-numbers' />
            </div>

            <div />

            <div />
        </div>
    );
}