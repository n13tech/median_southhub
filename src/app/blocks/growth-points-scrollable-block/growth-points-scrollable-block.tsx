'use client';

import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';
import ClubMeet from '../../../../public/встречи.webp'
import YoutubeChanell from '../../../../public/ютуб.webp'
import TelegramChanell from '../../../../public/тг.webp'
import OnlineBroadcast from '../../../../public/эфир.webp'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Button } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { LK_SOUTHHUB_LINK, NBSP, SNOWBASE_LINK, SOUTHHUB_LINK, SOUTHHUB_YOUTUBE, TELEGRAM_CHANELL_LINK, YOUTUBE_PLAYLIST_LINK } from '@/app/constants';
import { useEffect } from 'react';
import gsap from 'gsap';

import './growth-points-scrollable-block.css';

type Props = {
    img?: StaticImageData | string;
    video?: string;
    alt: string;
    title: string;
    description: string;
    buttonTitle: string;
    onClick: () => void;
}

const Card = ({ img, video, alt, title, description, buttonTitle, onClick }: Props) => {
    return (
        <div className='events-block-card-wrapper'>
            <div className='events-block-card-info'>
                <div className='events-block-card-info-text-wrapper'>
                    <h4 className={`${FONT_MONT_BOOK.className} events-block-card-info-title`}>{title}</h4>
                    <p className={`${FONT_MONT_BOOK.className} events-block-card-info-description`}>{description}</p>
                </div>
                <Button className={`${FONT_MONT_BOOK.className} events-block-card-info-button`} onClick={onClick} type='primary'>
                    {buttonTitle}
                </Button>
            </div>

            <div>
                {img && (
                    <Image
                        src={img}
                        alt={alt}
                        width={313}
                        height={209}
                        priority
                    />
                )}
                {video && (
                    <video width="313" height="209" autoPlay loop muted>
                        <source src={video} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
        </div>
    );
};


export const GrowthPointsScrollableBlock = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const delay = 0.5;
        const items: Element[] = gsap.utils.toArray(".events-block-card-wrapper");

        const tl = gsap.timeline({
            defaults: {
                ease: "power1.inOut",
            },
            scrollTrigger: {
                trigger: "#growth-points-block",
                start: "top top",
                end: "+=" + (items.length - 1) * 100 + "%",
                pin: '.growth-points-scrollable-block',
                scrub: true,
                anticipatePin: 1,
            }
        });

        // Инициализация
        gsap.set(items, {
            opacity: 0,
            y: 100,
        });

        // Первый элемент видим изначально
        gsap.set(items[0], {
            opacity: 1,
            y: 0,
        });

        items.forEach((item, i) => {
            const nextSlide = items[i + 1];

            if (!nextSlide) {
                return;
            }

            // Фаза 1: Текущая карточка уходит вниз
            // opacity меняется только в конце движения
            tl.to(item, {
                y: 100,
                duration: 0.8,
                ease: "power1.in"
            }, "+=" + delay)
            .to(item, {
                opacity: 0,
                duration: 0.1, // Быстро скрываем после движения
                ease: "none"
            }, ">") // ">" означает после предыдущей анимации
            
            // Фаза 2: Следующая карточка появляется
            .set(nextSlide, {
                opacity: 1,
                y: 100 // Начинаем снизу
            })
            .to(nextSlide, {
                y: 0,
                duration: 0.8,
                ease: "power1.out"
            }, ">"); // Начинаем после полного скрытия предыдущей
        });

        // Добавляем финальную паузу
        tl.to({}, { duration: delay });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className='growth-points-scrollable-block-wrapper' id='growth-points-block'>
            <div className='growth-points-scrollable-block'>
                <div className='growth-points-block-wrapper'>
                    <h2 className={`${FONT_MONT_BOOK.className} growth-points-block-title`}>
                        {'Точки роста'}
                    </h2>

                    <p className={`${FONT_MONT_BOOK.className} growth-points-block-description`}>
                        {'Форматы взаимодействия сообщества'}
                    </p>
                </div>

                <div className='events-block-wrapper'>
                    <Card
                        img='/SB-4.gif'
                        alt='snow-base-camp'
                        title='Snow BASE Camp'
                        description={`19–22 марта 2026 года. Красная Поляна\nЗимний кэмп для экспертов на стыке AI и${NBSP}бизнеса`}
                        buttonTitle='Участвовать'
                        onClick={() => window.open(SNOWBASE_LINK, '_blank')}
                    />

                    <Card
                        img='/SH2-2.gif'
                        alt='south-hub-camp'
                        title='South HUB Camp'
                        description={`10–14 июня 2026 года. Сочи\nЕжегодный кэмп-конференция для C-level в${NBSP}ІТ`}
                        buttonTitle='УЧАСТВОВАТЬ'
                        onClick={() => window.open(SOUTHHUB_LINK, '_blank')}
                    />

                    <Card
                        img={ClubMeet}
                        alt='club-meet'
                        title='Клубные встречи'
                        description={`Камерные события, где вы сами задаёте формат: пробежки, воркшопы, дискуссии. Здесь начинаются новые идеи и${NBSP}партнёрства`}
                        buttonTitle='Участвовать'
                        onClick={() => window.open(LK_SOUTHHUB_LINK, '_blank')}
                    />

                    <Card
                        img={YoutubeChanell}
                        alt='youtube-chanell'
                        title='YouTube-канал'
                        description={`Все записи встреч и${NBSP}вдохновляющие речи лидеров индустрии`}
                        buttonTitle='СМОТРЕТЬ'
                        onClick={() => window.open(SOUTHHUB_YOUTUBE, '_blank')}
                    />

                    <Card
                        img={TelegramChanell}
                        alt='telegramm-chanell'
                        title='Telegram-канал'
                        description={`Медиа, чтобы держать руку на пульсе cообщества, быть в${NBSP}курсе новых событий и${NBSP}находить поводы для живого диалога`}
                        buttonTitle='Подписаться'
                        onClick={() => window.open(TELEGRAM_CHANELL_LINK, '_blank')}
                    />

                    <Card
                        img={OnlineBroadcast}
                        alt='online-broadcast'
                        title='Онлайн-эфиры'
                        description={`Каждый раз новый формат: мок-интервью, дискуссии на злободневные темы и${NBSP}живые обсуждения с${NBSP}лидерами рынка`}
                        buttonTitle='смотреть'
                        onClick={() => window.open(YOUTUBE_PLAYLIST_LINK, '_blank')}
                    />
                </div>
            </div>
        </div>
    );
}