import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './inside-block.css';
import { NBSP } from '@/app/constants';
import { AnimateTitle } from '@/app/components/animate-title';

export const InsideBlock = () => {
    return (
        <div className='inside-block-wrapper' id='inside-block'>
            <div>
                <AnimateTitle text={'Что внутри'} className={`${FONT_MONT_BOOK.className} inside-block-title`} />
                <AnimateTitle delay={0.6} text={'сообщества'} className={`${FONT_MONT_BOOK.className} inside-block-title`} />
            </div>

            <Fade delay={250} triggerOnce>
                <p className={`${FONT_MONT_BOOK.className} inside-block-description`}>
                    {`Встречаемся в${NBSP}неформальной обстановке,\nзнакомимся вживую и${NBSP}общаемся по-человечески.\nВне рамок корпоративного мира. Заводим связи,\nкоторые превращаются в${NBSP}решения`}
                </p>
            </Fade>
        </div>
    );
}