'use client';

import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';
import ClubMeet from '../../../../public/встречи.jpg'
import YoutubeChanell from '../../../../public/ютуб.jpg'
import TelegramChanell from '../../../../public/тг.jpg'
import OnlineBroadcast from '../../../../public/эфир.jpg'

import './growth-points-block.css';
import { Button } from 'antd';
import Image, { StaticImageData } from 'next/image';

type Props = {
    img?: StaticImageData;
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
                <Fade direction='up' triggerOnce>
                    <h4 className={`${FONT_MONT_BOOK.className} events-block-card-info-title`}>{title}</h4>
                </Fade>
                <Fade delay={250} triggerOnce>
                    <p className={`${FONT_MONT_BOOK.className} events-block-card-info-description`}>{description}</p>
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
                            <source src={video} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            </Fade>
        </div>
    );
};


export const GrowthPointsBlock = () => {
    return (
        <>
            <div className='growth-points-block-wrapper' id='growth-points-block'>
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
                    video='/SB.webm'
                    alt='snow-base-camp'
                    title='Snow BASE Camp'
                    description={`19–21 марта 2026 года. Красная Поляна\nЗимний кэмп для экспертов на стыке AI и бизнеса`}
                    buttonTitle='Участвовать'
                    onClick={() => window.open('https://southhub.ru/snowbase', '_blank')}
                />

                <Card
                    video='/SH.webm'
                    alt='south-hub-camp'
                    title='South HUB Camp'
                    description={`10–14 июня 2026 года. Сочи\nЕжегодный кэмп-конференция для C-level в ІТ`}
                    buttonTitle='Зарегистрироваться'
                    onClick={() => window.open('https://southhub.ru/southub', '_blank')}
                />

                <Card
                    img={ClubMeet}
                    alt='club-meet'
                    title='Клубные встречи'
                    description={`Камерные события, где вы сами задаёте формат: пробежки, воркшопы, дискуссии. Здесь начинаются новые идеи и партнёрства`}
                    buttonTitle='Участвовать'
                    onClick={() => window.open('https://lk.southhub.ru/', '_blank')}
                />

                <Card
                    img={YoutubeChanell}
                    alt='youtube-chanell'
                    title='YouTube-канал'
                    description={`Все записи встреч и вдохновляющие речи лидеров индустрии`}
                    buttonTitle='Подписаться'
                    onClick={() => window.open('https://www.youtube.com/@sthhb', '_blank')}
                />

                <Card
                    img={TelegramChanell}
                    alt='telegramm-chanell'
                    title='Telegram-канал'
                    description={`Медиа, чтобы держать руку на пульсе Сообщества, быть в курсе новых событий и находить поводы для живого диалога`}
                    buttonTitle='Подписаться'
                    onClick={() => window.open('https://t.me/sthhb', '_blank')}
                />

                <Card
                    img={OnlineBroadcast}
                    alt='online-broadcast'
                    title='Онлайн-эфиры'
                    description={`Каждый раз новый формат: мок-интервью, дискуссии на злободневные темы и живые обсуждения с лидерами рынка`}
                    buttonTitle='смотреть'
                    onClick={() => window.open('https://www.youtube.com/@sthhb', '_blank')}
                />

                {/* <Card
                    img={CommunityChat}
                    alt='community-chat'
                    title='Чат сообщества'
                    description={`Здесь встречаются с людьми, идеями и новыми вызовами`}
                    buttonTitle='Вступить'
                    onClick={() => alert('ВСТУПИ НЕ ТУПИ!')}
                /> */}
            </div>
        </>
    );
}