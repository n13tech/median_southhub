'use client';

import Image, { StaticImageData } from 'next/image';
import { Fade } from "react-awesome-reveal";

import { FONT_MONT_BOOK } from '../../fonts';
import SnowBaseCamp from '../../../../public/snow-base-camp.png'
import SouthHubCamp from '../../../../public/south-hub-camp.png'
import ClubMeet from '../../../../public/club-meet.png'
import YoutubeChanell from '../../../../public/youtube-chanell.png'
import TelegramChanell from '../../../../public/telegram-chanell.png'
import OnlineBroadcast from '../../../../public/online-broadcast.png'
import CommunityChat from '../../../../public/community-chat.png'

import './events-block.css';
import { Button } from 'antd';

type Props = {
    img: StaticImageData;
    alt: string;
    title: string;
    description: string;
    buttonTitle: string;
    onClick: () => void;
}

const Card = ({ img, alt, title, description, buttonTitle, onClick }: Props) => {
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
                    <Image
                        src={img}
                        alt={alt}
                        width={313}
                        height={209}
                        priority
                    />
                </div>
            </Fade>
        </div>
    );
};

export const EventsBlock = () => {
    return (
        <div className='events-block-wrapper' id='events-block'>
            <Card
                img={SnowBaseCamp}
                alt='snow-base-camp'
                title='Snow BASE Camp'
                description={`19–21 марта 2026 года. Красная Поляна\nЗимний кэмп для экспертов на стыке AI и бизнеса`}
                buttonTitle='Участвовать'
                onClick={() => alert('НЕ БУДЕШЬ ТЫ УЧАСТВОВАТЬ!')}
            />

            <Card
                img={SouthHubCamp}
                alt='south-hub-camp'
                title='South HUB Camp'
                description={`10–14 июня 2026 года. Сочи\nЕжегодный кэмп-конференция для C-level в ІТ`}
                buttonTitle='Зарегистрироваться'
                onClick={() => alert('ЗАРЕГЕСТРИРОВАЛСЯ, КРАСАВА!')}
            />

            <Card
                img={ClubMeet}
                alt='club-meet'
                title='Клубные встречи'
                description={`Камерные события, где вы сами задаёте формат: пробежки, воркшопы, дискуссии. Здесь начинаются новые идеи и партнёрства`}
                buttonTitle='Участвовать'
                onClick={() => alert('ПИТЬ НАДО КАК КОНЯМ!')}
            />

            <Card
                img={YoutubeChanell}
                alt='youtube-chanell'
                title='YouTube-канал'
                description={`Все записи встреч и вдохновляющие речи лидеров индустрии`}
                buttonTitle='Подписаться'
                onClick={() => alert('ТЫКАЕМ В КОЛОКОЛЬЧИК!')}
            />

            <Card
                img={TelegramChanell}
                alt='telegramm-chanell'
                title='Telegram-канал'
                description={`Медиа, чтобы держать руку на пульсе Сообщества, быть в курсе новых событий и находить поводы для живого диалога`}
                buttonTitle='Подписаться'
                onClick={() => alert('ЗАПУСКАЕМ САМОЛЕТИКИ!')}
            />

            <Card
                img={OnlineBroadcast}
                alt='online-broadcast'
                title='Онлайн-эфиры'
                description={`Каждый раз новый формат: мок-интервью, дискуссии на злободневные темы и живые обсуждения с лидерами рынка`}
                buttonTitle='смотреть'
                onClick={() => alert('СМОТРИ НЕ ПРОСМОТРИ!')}
            />

            <Card
                img={CommunityChat}
                alt='community-chat'
                title='Чат сообщества'
                description={`Здесь встречаются с людьми, идеями и новыми вызовами`}
                buttonTitle='Вступить'
                onClick={() => alert('ВСТУПИ НЕ ТУПИ!')}
            />
        </div>
    );
}