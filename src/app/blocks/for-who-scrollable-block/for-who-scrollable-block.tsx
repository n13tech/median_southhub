import { NBSP } from '@/app/constants';
import { FONT_MONT_BOOK } from '../../fonts';

import './for-who-scrollable-block.css';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ForWhoScrollableBlock = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const delay = 0.5;

        const items: Element[] = gsap.utils.toArray(".for-who-scrollable-block-li");

        const tl = gsap.timeline({
            defaults: {
                ease: "power1.inOut",
            },
            scrollTrigger: {
                trigger: "#for-who-scrollable-block",
                start: "top top",
                end: "+=" + (items.length - 1) * 100 + "%",
                pin: '.for-who-scrollable-block',
                scrub: true,
                // markers: true,
                anticipatePin: 1
            }
        });

        gsap.set(items, {
            opacity: 0,
            y: 30,
            scale: 0.8,
        });

        // Первый элемент видим изначально
        gsap.set(items[0], {
            opacity: 1,
            y: 0,
            scale: 1
        });

        items.forEach((item, i) => {
            const nextSlide = items[i + 1];
            if (!nextSlide) {
                return;
            }

            // Исчезание текущего элемента
            tl.to(item, {
                opacity: 0,
                y: -30,
                scale: 0.8,
                duration: 0.8
            }, "+=" + delay)
            // Появление следующего элемента
            .to(nextSlide, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8
            }, "<");
        });

        // Добавляем финальную паузу
        tl.to({}, { duration: delay });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className='for-who-scrollable-block-wrapper' id='for-who-scrollable-block'>
            <div className='for-who-scrollable-block'>
                <h2 className={`${FONT_MONT_BOOK.className} for-who-scrollable-block-title`}>
                    {'Для тех, кто...'}
                </h2>

                <div className={`${FONT_MONT_BOOK.className} for-who-scrollable-block-ul`}>
                    <div className={`${FONT_MONT_BOOK.className} for-who-scrollable-block-li`}>
                        {`Создаёт будущее IT и${NBSP}ищет среду равных для диалога`}
                    </div>
                    <div className={`${FONT_MONT_BOOK.className} for-who-scrollable-block-li`}>
                        {`Хочет расти не${NBSP}только как руководитель, но и${NBSP}как личность`}
                    </div>
                    <div className={`${FONT_MONT_BOOK.className} for-who-scrollable-block-li`}>
                        {`Ищет баланс между бизнесом, семьёй и${NBSP}собой`}
                    </div>
                    <div className={`${FONT_MONT_BOOK.className} for-who-scrollable-block-li`}>
                        {`Ценит доверие и${NBSP}открытость выше формальных регалий`}
                    </div>
                    <div className={`${FONT_MONT_BOOK.className} for-who-scrollable-block-li`}>
                        {`Готов делиться опытом, слушать и${NBSP}учиться у${NBSP}других лидеров`}
                    </div>
                </div>
            </div>
        </div>
    );
}