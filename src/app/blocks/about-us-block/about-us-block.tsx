import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './about-us-block.css';
import Image from 'next/image';

import MedianLogo from '../../../../public/median-logo.png';
import { AboutUsBlockButton } from './about-us-block-button';
import { MEDIAN_LINK, NBSP } from '@/app/constants';
import { useGetLinkWithUtm } from '@/app/hooks/use-get-link-with-utm';

export const AboutUsBlock = () => {
    const getLinkWithUtm = useGetLinkWithUtm();

    return (
        <div className='about-us-block-wrapper' id='about-us-block'>
            <div className='about-us-block-info-wrapper'>
                <Fade delay={250} triggerOnce>
                    <div className='about-us-block-logo-wrapper'>
                        <Image
                            src={MedianLogo}
                            alt='median-agency'
                            height={180}
                        />

                        <p className={`${FONT_MONT_BOOK.className} about-us-block-down-logo`}>
                            Коммуникационное агентство
                        </p>
                    </div>
                </Fade>

                <Fade delay={250} triggerOnce>
                    <div className='about-us-block-text-wrapper'>
                        <p className={`${FONT_MONT_BOOK.className} about-us-block-info-text`}>
                            {`Мы создаём идеи и${NBSP}проводим события для IT-специалистов и${NBSP}бизнес-лидеров. Наши проекты побеждают в${NBSP}конкурсах, а${NBSP}участники помнят их годами`}
                        </p>

                        <div>
                            <a href={getLinkWithUtm(MEDIAN_LINK)} target='_blank' className={`${FONT_MONT_BOOK.className} about-us-block-info-text-median`}>
                                median.agency
                            </a>
                            <p className={`${FONT_MONT_BOOK.className} about-us-block-info-text`}>
                                Команда, которая мечтает, думает и делает
                            </p>
                        </div>

                        <AboutUsBlockButton />
                    </div>
                </Fade>
            </div>
        </div>
    );
}