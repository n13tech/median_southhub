import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './hot-to-southub-block.css';
import { NBSP } from '@/app/constants';
import { AnimateTitle } from '@/app/components/animate-title';

export const HotToSouthubBlock = () => {
    return (
        <div className='hot-to-southub-block-wrapper' id='hot-to-southub-block'>
            <AnimateTitle
                className={`${FONT_MONT_BOOK.className} hot-to-southub-block-title`}
                text={`South${NBSP}HUB — это\nлюди, которые его создают`}
            />

            <Fade delay={250} triggerOnce className='hot-to-southub-block-description-wrapper'>
                <p className={`${FONT_MONT_BOOK.className} hot-to-southub-block-description`}>
                    {`Наше сообщество не${NBSP}замолкает между событиями. Остаёмся на связи и${NBSP}поддерживаем участников в${NBSP}чате и${NBSP}telegram-канале`}
                </p>
            </Fade>
        </div>
    );
}