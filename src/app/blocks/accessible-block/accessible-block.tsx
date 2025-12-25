import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './accessible-block.css';
import { AccesibleButton } from './accesible-button';
import { AnimateTitle } from '@/app/components/animate-title';

export const AccessibleBlock = () => {
    return (
        <div className='accessible-block-wrapper' id='accessible-block'>
            <AnimateTitle
                className={`${FONT_MONT_BOOK.className} accessible-block-title`}
                text={`Удобный доступ\nко всем мероприятиям\nсообщества`}
            />

            <Fade delay={250} triggerOnce>
                <AccesibleButton />
            </Fade>
        </div>
    );
}