import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './accessible-block.css';
import { AccesibleButton } from './accesible-button';

export const AccessibleBlock = () => {
    return (
        <div className='accessible-block-wrapper' id='accessible-block'>
            <Fade direction='up' triggerOnce>
                <h2 className={`${FONT_MONT_BOOK.className} accessible-block-title`}>
                    {'Удобный доступ\nко всем мероприятиям\nсообщества'}
                </h2>
            </Fade>

            <Fade delay={250} triggerOnce>
                <AccesibleButton />
            </Fade>
        </div>
    );
}