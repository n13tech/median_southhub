import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './community-block.css';

export const CommunityBlock = () => {
    return (
        <div className='community-block-wrapper' id='community-block'>
            <Fade direction='up' triggerOnce>
                <h2 className={`${FONT_MONT_BOOK.className} community-block-title`}>
                    {'Точки роста'}
                </h2>
            </Fade>

            <Fade delay={250} triggerOnce>
                <p className={`${FONT_MONT_BOOK.className} community-block-description`}>
                    {'Форматы взаимодействия сообщества'}
                </p>
            </Fade>
        </div>
    );
}