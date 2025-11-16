import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './community-in-numbers.css';
import Image, { StaticImageData } from 'next/image';

import CommunityOne from '../../../../public/comminity-one.png';
import CommunityTwo from '../../../../public/number2.jpg';
import CommunityThree from '../../../../public/number3.jpg';
import CommunityFour from '../../../../public/number4.jpg';
import { NBSP } from '@/app/constants';

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

            <div>
                <p className={`${FONT_MONT_BOOK.className} community-in-numbers-card-title`}>{title}</p>
                <p className={`${FONT_MONT_BOOK.className} community-in-numbers-card-description`}>{description}</p>
            </div>
        </div>
    )
}

export const CommunityInNumbers = () => {
    return (
        <div className='community-in-numbers-wrapper' id='community-in-numbers'>
            <Fade direction='up' triggerOnce>
                <h2 className={`${FONT_MONT_BOOK.className} community-in-numbers-title`}>
                    {`Сообщество в${NBSP}цифрах`}
                </h2>
            </Fade>

            <Fade delay={250} triggerOnce>
                <div className='community-in-numbers-cards-wrapper'>
                    <Card
                        src={CommunityOne}
                        alt='professional'
                        title='1 477'
                        description={`профессионалов в${NBSP}IT:\n32% CTO&CIO,\n18% CPO, 8% CDO\nи 15% CEO`}
                    />
                    <Card
                        src={CommunityTwo}
                        alt='speakers'
                        title='153'
                        description='спикера и лидера индустрии выступили на мероприятиях за 4 года'
                    />
                    <Card
                        src={CommunityFour}
                        alt='nps'
                        title='73%'
                        description='NPS cообщества'
                    />
                    <Card
                        src={CommunityThree}
                        alt='members'
                        title='52%'
                        description='retention rate сообщества'
                    />
                </div>
            </Fade>
        </div>
    );
}