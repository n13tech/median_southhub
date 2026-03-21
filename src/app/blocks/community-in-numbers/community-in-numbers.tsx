import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './community-in-numbers.css';
import Image, { StaticImageData } from 'next/image';

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
            <div>
                <AnimateTitle
                    className={`${FONT_MONT_BOOK.className} community-in-numbers-title`}
                    text={`Сообщество`}
                />
                <AnimateTitle
                    className={`${FONT_MONT_BOOK.className} community-in-numbers-title`}
                    text={`в цифрах`}
                    delay={0.6}
                />
            </div>

            <Fade delay={250} triggerOnce>
                <div className='community-in-numbers-cards-wrapper'>
                </div>
            </Fade>
        </div>
    );
}