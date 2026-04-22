'use client';

import { useEffect } from 'react';
import { FONT_MONT_BOOK } from '@/app/fonts';
import './accordions-block.css';
import Image from 'next/image';
import AccordionPlus from '../../../../public/accordion-plus.svg';
import { Collapse, CollapseProps } from 'antd';

const ITEMS: CollapseProps['items'] = [
  {
    key: '1',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Баланс</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`верим, что успех и эффективность руководителя строятся на балансе профессиональных связей, семьи, саморазвития, обучения и физической формы`}
        </p>
    ),
  },
  {
    key: '2',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Совместное развитие</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`создаём пространство, в котором комфортно расти и вдохновлять других, влиять на развитие бизнеса и всей IT-индустрии`}
        </p>
    ),
  },
  {
    key: '3',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Безопасная среда</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`строим тёплое сообщество равных, где поддержка важнее регалий, юмор — часть культуры, а доверие и открытость позволяют вести честные разговоры`}
        </p>
    ),
  },
  {
    key: '4',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Со-создание</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`любая активность сообщества рождается из энергии участников: идей, опыта, запросов и инициатив. здесь созидают вместе — а значит, по-настоящему`}
        </p>
    ),
  },
];


export const AccordionsBlock = () => {
    useEffect(() => {
        const header = document.querySelector('#header');
        const targetBlock = document.querySelector('#accordions-block');
        
        if (!header || !targetBlock) return;

        let lastScrollY = window.scrollY;
        let isHeaderBlack = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const blockRect = targetBlock.getBoundingClientRect();
            const blockTop = blockRect.top - 70;
            const isScrollingUp = currentScrollY < lastScrollY;
    
            if (blockTop <= 0) {
                if (!isHeaderBlack) {
                    header.classList.add('header_black');
                    isHeaderBlack = true;
                }
            } 
            else if (isScrollingUp && blockTop <= 70) {
                if (!isHeaderBlack) {
                    header.classList.add('header_black');
                    isHeaderBlack = true;
                }
            } else {
                if (isHeaderBlack) {
                    header.classList.remove('header_black');
                    isHeaderBlack = false;
                }
            }
        
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='accordions-block-wrapper' id='accordions-block'>
            <div className={`${FONT_MONT_BOOK.className} accordions-block-title`}>
                наши ценности
            </div>

            <div className='accordions-block-list'>
                <Collapse
                    ghost={true}
                    expandIconPosition='end'
                    items={ITEMS}
                    className='accordions-block-component'
                    defaultActiveKey={['1', '2', '3', '4']}
                    expandIcon={() => (
                        <Image
                            src={AccordionPlus}
                            alt="accordion-plus"
                            width={47}
                            height={47}
                            priority
                        />
                    )}
                />
            </div>
        </div>
    );
};
