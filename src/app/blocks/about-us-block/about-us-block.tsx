import { FONT_MONT_BOOK } from '../../fonts';

import './about-us-block.css';
import Image from 'next/image';

import MedianLogo from '../../../../public/v2/median-logo.png';
import { AboutUsBlockButton } from './about-us-block-button';

export const AboutUsBlock = () => {
    return (
        <div className='about-us-block-wrapper' id='about-us-block'>
            <div className='about-us-block-info-wrapper'>
                <div className='about-us-block-logo-wrapper'>
                    <Image
                        src={MedianLogo}
                        alt='median-agency'
                        height={87}
                    />
                </div>

                <div className='about-us-block-line' />

                <div className='about-us-block-button-wrapper'>
                    <AboutUsBlockButton />
                </div>

                <div className='about-us-block-text-wrapper'>
                    <p className={`${FONT_MONT_BOOK.className} about-us-block-info-text`}>
                        {`made by median.agency\nКоманда, которая мечтает. думает. делает.`}
                    </p>
                </div>
            </div>
        </div>
    );
}