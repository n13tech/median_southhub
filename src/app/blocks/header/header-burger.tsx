'use client';
import { useState } from 'react';

import { Button, Drawer } from 'antd';
import './header.css';
import Image from 'next/image';

import Burger from '../../../../public/burger.svg';
import Cross from '../../../../public/accordion-plus.svg';
import Logo from '../../../../public/logo.svg';
import { HeaderItem } from './header-item';
import { HeaderLogin } from './header-login';

export const HeaderBurger = () => {
    const [isActive, setActive] = useState(false);

    return (
        <>
            <Button variant='text' type='text' className='header-burger' onClick={() => setActive(true)}>
                <Image
                    src={Burger}
                    width={24}
                    height={24}
                    alt='burger'
                />
            </Button>

            <Drawer
                title={(
                    <Image
                        src={Logo}
                        alt="SOUTHUUUB"
                        width={180}
                        height={21}
                        priority
                    />
                )}
                open={isActive}
                onClose={() => setActive(false)}
                placement='left'
                className='header-drawer'
                closable={true}
                closeIcon={(
                    <Image
                        src={Cross}
                        alt="crestnacrest"
                        width={24}
                        height={24}
                        priority
                        className='header-burger-cross'
                    />
                )}
            >
                <div>
                    <div onClick={() => setActive(false)}>
                        <HeaderItem title='о сообществе' intoScroll='growth-points-block' />
                    </div>
                    <div onClick={() => setActive(false)}>
                        <HeaderItem title='для кого' intoScroll='for-who-scrollable-block' />
                    </div>
                </div>
                <div>
                    <HeaderLogin />
                </div>
            </Drawer>
        </>
    );
}