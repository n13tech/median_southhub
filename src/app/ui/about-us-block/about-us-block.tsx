import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './about-us-block.css';
import Image from 'next/image';

import AboutUsImg from '../../../../public/about-us-img.png';
import MedianLogo from '../../../../public/median-logo.png';
import { Button } from 'antd';
import { AboutUsBlockButton } from './about-us-block-button';

export const AboutUsBlock = () => {
    return (
        <div className='about-us-block-wrapper' id='about-us-block'>
            <Fade delay={250} triggerOnce>
                <Image
                    src={AboutUsImg}
                    alt='about-us'
                    height={320}
                    className='about-us-block-main-img'
                />
            </Fade>

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
                            Мы создаём идеи и проводим события для IT-специалистов и бизнес-лидеров. Наши проекты побеждают в конкурсах, а участники помнят их годами.
                        </p>

                        <div>
                            <p className={`${FONT_MONT_BOOK.className} about-us-block-info-text-median`}>
                                median.agency
                            </p>
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