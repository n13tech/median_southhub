import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './philosophy-block.css';
import { NBSP } from '@/app/constants';

export const PhilosophyBlock = () => {
    return (
        <div className='philosophy-block-wrapper' id='philosophy-block'>
            <Fade direction='up' triggerOnce>
                <h2 className={`${FONT_MONT_BOOK.className} philosophy-block-title`}>
                    {`Философия South${NBSP}HUB`}
                </h2>
            </Fade>

            <Fade delay={250} triggerOnce>
                <p className={`${FONT_MONT_BOOK.className} philosophy-block-description`}>
                    {`Свежий воздух вместо офисных переговорок, свобода вместо тесных рамок, живой смех вместо холодных встреч. Юг не точка на карте, а${NBSP}состояние души, таков и${NBSP}наш южный хаб`}
                </p>
            </Fade>
        </div>
    );
}