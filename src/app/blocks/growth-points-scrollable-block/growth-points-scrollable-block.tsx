'use client';

import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';
import ClubMeet from '../../../../public/встречи.jpg'
import YoutubeChanell from '../../../../public/ютуб.jpg'
import TelegramChanell from '../../../../public/тг.jpg'
import OnlineBroadcast from '../../../../public/эфир.jpg'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Button } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { NBSP } from '@/app/constants';
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
                    <Fade direction='up' triggerOnce>
                        <h4 className={`${FONT_MONT_BOOK.className} events-block-card-info-title`}>{title}</h4>
                    </Fade>
                    <Fade delay={250} triggerOnce>
                        <p className={`${FONT_MONT_BOOK.className} events-block-card-info-description`}>{description}</p>
                    </Fade>
                </div>
                <Fade delay={250} triggerOnce>
                    <Button className={`${FONT_MONT_BOOK.className} events-block-card-info-button`} onClick={onClick} type='primary'>
                        {buttonTitle}
                    </Button>
                </Fade>
            </div>

            <Fade direction='right' delay={250} triggerOnce>
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
            </Fade>
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
                // markers: true,
                anticipatePin: 1,
                snap: {
                    snapTo: 1 / (items.length - 1), // Привязка к прогрессу каждого слайда
                    duration: { min: 0.2, max: 0.8 },
                    ease: "power1.inOut",
                }
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
        <div className='growth-points-scrollable-block-wrapper' id='growth-points-block'>
            <div className='growth-points-scrollable-block'>
                <div className='growth-points-block-wrapper'>
                    <Fade direction='up' triggerOnce>
                        <h2 className={`${FONT_MONT_BOOK.className} growth-points-block-title`}>
                            {'Точки роста'}
                        </h2>
                    </Fade>

                    <Fade delay={250} triggerOnce>
                        <p className={`${FONT_MONT_BOOK.className} growth-points-block-description`}>
                            {'Форматы взаимодействия сообщества'}
                        </p>
                    </Fade>
                </div>

                <div className='events-block-wrapper'>
                    <Card
                        img='/SB-4.gif'
                        alt='snow-base-camp'
                        title='Snow BASE Camp'
                        description={`19–22 марта 2026 года. Красная Поляна\nЗимний кэмп для экспертов на стыке AI и${NBSP}бизнеса`}
                        buttonTitle='Участвовать'
                        onClick={() => window.open('https://southhub.ru/snowbase/', '_blank')}
                    />

                    <Card
                        img='/SH2-2.gif'
                        alt='south-hub-camp'
                        title='South HUB Camp'
                        description={`10–14 июня 2026 года. Сочи\nЕжегодный кэмп-конференция для C-level в${NBSP}ІТ`}
                        buttonTitle='УЧАСТВОВАТЬ'
                        onClick={() => window.open('https://southhub.ru/southub/', '_blank')}
                    />

                    <Card
                        img={ClubMeet}
                        alt='club-meet'
                        title='Клубные встречи'
                        description={`Камерные события, где вы сами задаёте формат: пробежки, воркшопы, дискуссии. Здесь начинаются новые идеи и${NBSP}партнёрства`}
                        buttonTitle='Участвовать'
                        onClick={() => window.open('https://lk.southhub.ru/', '_blank')}
                    />

                    <Card
                        img={YoutubeChanell}
                        alt='youtube-chanell'
                        title='YouTube-канал'
                        description={`Все записи встреч и${NBSP}вдохновляющие речи лидеров индустрии`}
                        buttonTitle='СМОТРЕТЬ'
                        onClick={() => window.open('https://www.youtube.com/@sthhb', '_blank')}
                    />

                    <Card
                        img={TelegramChanell}
                        alt='telegramm-chanell'
                        title='Telegram-канал'
                        description={`Медиа, чтобы держать руку на пульсе cообщества, быть в${NBSP}курсе новых событий и${NBSP}находить поводы для живого диалога`}
                        buttonTitle='Подписаться'
                        onClick={() => window.open('https://t.me/+A-vMV8yq_6M3ZjFi', '_blank')}
                    />

                    <Card
                        img={OnlineBroadcast}
                        alt='online-broadcast'
                        title='Онлайн-эфиры'
                        description={`Каждый раз новый формат: мок-интервью, дискуссии на злободневные темы и${NBSP}живые обсуждения с${NBSP}лидерами рынка`}
                        buttonTitle='смотреть'
                        onClick={() => window.open('https://www.youtube.com/playlist?list=PL1GqRF3TOpZAHPTOiNLLXByfEwVjHvvLO', '_blank')}
                    />

                    {/* <Card
                        img={CommunityChat}
                        alt='community-chat'
                        title='Чат сообщества'
                        description={`Здесь встречаются с${NBSP}людьми, идеями и новыми вызовами`}
                        buttonTitle='Вступить'
                        onClick={() => alert('ВСТУПИ НЕ ТУПИ!')}
                    /> */}
                </div>
            </div>
        </div>
    );
}