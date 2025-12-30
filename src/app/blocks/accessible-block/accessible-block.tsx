import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './accessible-block.css';
import { AccesibleButton } from './accesible-button';
import { AnimateTitle } from '@/app/components/animate-title';

export const AccessibleBlock = () => {
    return (
        <div className='accessible-block-wrapper' id='accessible-block'>
            <div>
                <AnimateTitle
                    className={`${FONT_MONT_BOOK.className} accessible-block-title`}
                    text={`Удобный доступ`}
                />
                <AnimateTitle
                    className={`${FONT_MONT_BOOK.className} accessible-block-title`}
                    text={`ко всем мероприятиям`}
                    delay={0.6}
                />
                <AnimateTitle
                    className={`${FONT_MONT_BOOK.className} accessible-block-title`}
                    text={`сообщества`}
                    delay={0.9}
                />
            </div>

            <Fade delay={250} triggerOnce>
                <AccesibleButton />
            </Fade>
        </div>
    );
}