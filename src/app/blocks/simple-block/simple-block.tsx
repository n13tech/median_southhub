import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './simple-block.css';
import { NBSP } from '@/app/constants';
import { AnimateTitle } from '@/app/components/animate-title';

export const SimpleBlock = () => {
    return (
        <div className='simple-block-wrapper' id='simple-block'>
            <AnimateTitle text={'а можно\nпопроще?'} className={`${FONT_MONT_BOOK.className} simple-block-title`} />

            <Fade delay={250} triggerOnce>
                <p className={`${FONT_MONT_BOOK.className} simple-block-description`}>
                    {`Встречаемся в${NBSP}неформальной обстановке,\nзнакомимся вживую и${NBSP}общаемся по-человечески.\nВне рамок корпоративного мира. Заводим связи,\nкоторые превращаются в${NBSP}решения`}
                </p>
            </Fade>
        </div>
    );
}