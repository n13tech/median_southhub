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

        // Получаем все карточки
        const items: Element[] = gsap.utils.toArray(".events-block-card-wrapper");
        const totalTransitions = items.length - 1;
        
        let lastProgress = 0;
        let direction: 'up' | 'down' = 'down';

        // Создаем timeline с настройками ScrollTrigger
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut",
            },
            scrollTrigger: {
                trigger: "#growth-points-block",
                start: "top top",
                end: "+=" + totalTransitions * 100 + "%",
                pin: '.growth-points-scrollable-block',
                scrub: 1.5,
                anticipatePin: 1,
                onUpdate: (self) => {
                    direction = self.progress > lastProgress ? 'down' : 'up';
                    lastProgress = self.progress;
                },
                snap: {
                    snapTo: (progress) => {
                        // Рассчитываем текущую карточку
                        const currentIndex = Math.min(Math.floor(progress * totalTransitions), totalTransitions - 1);
                        
                        // Создаем точки остановки (равномерно распределенные)
                        const snapPoints = Array(items.length).fill(0)
                            .map((_, i) => i / totalTransitions);
                        
                        const currentSnap = snapPoints[currentIndex];
                        const nextSnap = snapPoints[currentIndex + 1];
                        const prevSnap = snapPoints[currentIndex - 1];
                        
                        // Рассчитываем прогресс внутри текущей секции (от 0 до 1)
                        const sectionProgress = (progress - currentSnap) * totalTransitions;
                        
                        // Если скроллим ВНИЗ и есть следующая карточка
                        if (direction === 'down' && nextSnap !== undefined) {
                            // ТОЛЬКО если прокрутили БОЛЕЕ 10% текущей карточки
                            if (sectionProgress > 0.5) {
                                const threshold = currentSnap + (nextSnap - currentSnap) * 0.05;
                                if (progress >= threshold) {
                                    return nextSnap;
                                }
                            }
                            // Иначе возвращаем текущую карточку (не делаем snap)
                            return currentSnap;
                        }
                        
                        // Если скроллим ВВЕРХ и есть предыдущая карточка
                        if (direction === 'up' && prevSnap !== undefined) {
                            // ТОЛЬКО если ОСТАЛОСЬ менее 90% текущей карточки
                            // (то есть прокрутили более 10% от следующей карточки при движении вверх)
                            if (sectionProgress < 0.5) {
                                const threshold = currentSnap - (currentSnap - prevSnap) * 0.05;
                                if (progress <= threshold) {
                                    return prevSnap;
                                }
                            }
                            // Иначе возвращаем текущую карточку (не делаем snap)
                            return currentSnap;
                        }
                        
                        // Если мы в крайних положениях или не выполнили условия выше
                        return currentSnap;
                    },
                    duration: { min: 0.1, max: 0.2 },
                    ease: "power2.inOut"
                }
            }
        });

        // ИНИЦИАЛИЗАЦИЯ
        gsap.set(items, {
            opacity: 0,
            y: 150,
        });

        // Первая карточка изначально видима
        gsap.set(items[0], {
            opacity: 1,
            y: 0,
            zIndex: 9999,
        });

        // АНИМАЦИЯ ПЕРЕХОДОВ
        for (let i = 0; i < totalTransitions; i++) {
            const currentCard = items[i];
            const nextCard = items[i + 1];
            
            // Рассчитываем время в timeline (от 0 до 1)
            const sectionStart = i / totalTransitions;
            const sectionDuration = 1 / totalTransitions;
            
            // Быстрое исчезновение текущей карточки (40% времени)
            const fadeOutDuration = sectionDuration * 0.4;
            
            // Маленькая пауза (5% времени)
            const pauseDuration = sectionDuration * 0.05;
            
            // Появление следующей карточки (45% времени)
            const fadeInStart = sectionStart + fadeOutDuration + pauseDuration;
            const fadeInDuration = sectionDuration * 0.45;
            
            // Минимальная пауза в конце (10% времени)
            const endPause = sectionDuration * 0.1;
            
            // Анимация исчезновения текущей карточки
            tl.to(currentCard, {
                y: 150,
                duration: fadeOutDuration,
                ease: "power2.in"
            }, sectionStart)
            .to(currentCard, {
                opacity: 0,
                duration: fadeOutDuration * 0.7,
                ease: "power2.in"
            }, sectionStart)
            
            // Короткая пауза
            .to({}, {
                duration: pauseDuration
            })
            
            // Анимация появления следующей карточки
            .to(nextCard, {
                opacity: 1,
                duration: fadeInDuration * 0.3,
                ease: "power2.out"
            }, fadeInStart)
            .fromTo(nextCard,
                { y: 150 },
                {
                    y: 0,
                    zIndex: 9999,
                    duration: fadeInDuration,
                    ease: "power2.out"
                },
                fadeInStart
            )
            
            // Минимальная пауза в конце
            .to({}, {
                duration: endPause
            });
        }

        // Очистка
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