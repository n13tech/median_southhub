'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FONT_MONT_BOOK } from '@/app/fonts';
import './accordions-block.css';
import Image from 'next/image';
import AccordionPlus from '../../../../public/accordion-plus.svg';

gsap.registerPlugin(ScrollTrigger);

const NBSP = '\u00A0';

const ITEMS = [
    {
        key: '1',
        label: 'Топы для топов',
        children: `Все участники сообщества — C-level в${NBSP}IT и${NBSP}те, кто хочет ими стать.\nЗдесь говорят на${NBSP}языке бизнеса и${NBSP}понимают, как вести за${NBSP}собой`,
    },
    {
        key: '2',
        label: `Свобода мыслить и${NBSP}создавать`,
        children: `Попадите в${NBSP}круг равных, где доверие и${NBSP}открытость вдохновляют\nсоздавать новое вместе`,
    },
    {
        key: '3',
        label: 'Сила внутри',
        children: `Мы внимательно отбираем участников, с${NBSP}кем можно говорить и${NBSP}по${NBSP}делу, и${NBSP}по${NBSP}душам`,
    },
    {
        key: '4',
        label: 'Глобальные инсайты',
        children: `Участники сообщества — IT-лидеры, которые делают бизнес в${NBSP}России и${NBSP}мыслят масштабно`,
    },
];

export const AccordionsBlock = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const firstItemRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    useEffect(() => {
        const wrapper = wrapperRef.current;

        if (!wrapper) {
            return;
        }

        const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
        const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[];

        if (contents.length === 0) {
            return;
        }

        const heights = contents.map((el) => el.offsetHeight);
        const totalHeight = heights.reduce((sum, h) => sum + h, 0);

        contents.forEach((el, i) => {
            gsap.set(el, { height: heights[i], overflow: 'hidden' });
        });

        gsap.set(icons, { rotation: 45 });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            heights.forEach((h, i) => {
                tl.to(
                    contents[i],
                    {
                        height: 0,
                        ease: 'none',
                        duration: h,
                    },
                );

                tl.to(
                    icons[i],
                    {
                        rotation: 0,
                        ease: 'none',
                        duration: h,
                    },
                    `<`,
                );
            });

            ScrollTrigger.create({
                trigger: firstItemRef.current,
                start: 'top 130px',
                end: () => `+=${totalHeight}`,
                pin: wrapper,
                pinSpacing: true,

                scrub: 1,
                animation: tl,
                invalidateOnRefresh: true,
            });
        }, wrapper);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className='accordions-block-wrapper'
            id='accordions-block'
        >
            <div className={`${FONT_MONT_BOOK.className} accordions-block-title`}>
                наши ценности
            </div>

            <div className='accordions-block-list'>
                {ITEMS.map((item, index) => (
                    <div key={item.key} ref={index === 0 ? firstItemRef : undefined} className='accordion-item'>
                        <div className={`accordion-header ${index === 0 ? 'accordion-header--first' : ''}`}>
                            <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>{item.label}</p>

                            <div ref={(el) => { iconRefs.current[index] = el }} className='accordion-icon'>
                                <Image
                                    src={AccordionPlus}
                                    alt="accordion-plus"
                                    width={47}
                                    height={47}
                                />
                            </div>
                        </div>

                        <div ref={(el) => { contentRefs.current[index] = el }} className='accordion-content'>
                            <div className='accordion-content-inner'>
                                <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>{item.children}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
