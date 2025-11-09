import Image from 'next/image';

import Logo from '../../../../public/logo.svg';
import { HeaderItem } from './header-item';

import './header.css';

export const Header = () => {
    return (
        <div className='header' id='header'>
            <div className='header_item_wrapper'>
                <HeaderItem title='а можно попроще' intoScroll='simple-block' />
                <HeaderItem title='личный кабинет' intoScroll='become-member' />
            </div>

            <div>
                <Image
                    src={Logo}
                    alt="SOUTHUUUB"
                    width={180}
                    height={21}
                    priority
                />
            </div>

            <div className='header_item_wrapper header_item_wrapper_second'>
                <HeaderItem title='стать участником' intoScroll='become-member' />
                <HeaderItem title='контакты' intoScroll='footer' />
            </div>
        </div>
    );
}