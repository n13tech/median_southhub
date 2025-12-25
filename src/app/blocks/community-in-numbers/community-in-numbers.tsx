import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './community-in-numbers.css';
import Image, { StaticImageData } from 'next/image';

import CommunityOne from '../../../../public/number1.webp';
import CommunityTwo from '../../../../public/number2.webp';
import CommunityThree from '../../../../public/number3.webp';
import CommunityFour from '../../../../public/number4.webp';
import { NBSP } from '@/app/constants';
import { AnimateTitle } from '@/app/components/animate-title';

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
            <AnimateTitle
                className={`${FONT_MONT_BOOK.className} community-in-numbers-title`}
                text={`Сообщество в${NBSP}цифрах`}
            />

            <Fade delay={250} triggerOnce>
                <div className='community-in-numbers-cards-wrapper'>
                    <div>
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
                    </div>
                    <div>
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
                </div>
            </Fade>
        </div>
    );
}