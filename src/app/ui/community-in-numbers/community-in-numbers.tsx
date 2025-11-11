import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './community-in-numbers.css';
import Image, { StaticImageData } from 'next/image';

import CommunityOne from '../../../../public/community-one.png';
import CommunityTwo from '../../../../public/community-two.png';
import CommunityThree from '../../../../public/community-three.png';
import CommunityFour from '../../../../public/community-four.png';

type Props = {
    src: StaticImageData;
    alt: string;
    title: string;
    description: string;
};

const Card = ({ src, alt, description, title }: Props) => {
    return (
        <div className='community-in-numbers-card'>
            <Image
                src={src}
                alt={alt}
                height={265}
            />

            <p className={`${FONT_MONT_BOOK.className} community-in-numbers-card-title`}>{title}</p>
            <p className={`${FONT_MONT_BOOK.className} community-in-numbers-card-description`}>{description}</p>
        </div>
    )
}

export const CommunityInNumbers = () => {
    return (
        <div className='community-in-numbers-wrapper' id='community-in-numbers'>
            <Fade direction='up' triggerOnce>
                <h2 className={`${FONT_MONT_BOOK.className} community-in-numbers-title`}>
                    {'Сообщество в цифрах'}
                </h2>
            </Fade>

            <Fade delay={250} triggerOnce>
                <div className='community-in-numbers-cards-wrapper'>
                    <Card
                        src={CommunityOne}
                        alt='professional'
                        title='1 477'
                        description='профессионалов в IT: 55% CTO, 20% CPO, 15% CDO и 15% CEO'
                    />
                    <Card
                        src={CommunityTwo}
                        alt='speakers'
                        title='153'
                        description='спикера и лидера индустрии выступили на мероприятиях за 4 года'
                    />
                    <Card
                        src={CommunityThree}
                        alt='members'
                        title='77%'
                        description='участников из Москвы, 23% — из других городов России и стран СНГ'
                    />
                    <Card
                        src={CommunityFour}
                        alt='nps'
                        title='73%'
                        description='NPS Сообщества'
                    />
                </div>
            </Fade>
        </div>
    );
}