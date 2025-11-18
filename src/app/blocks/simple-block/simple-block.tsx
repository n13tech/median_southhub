import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './simple-block.css';
import { NBSP } from '@/app/constants';

export const SimpleBlock = () => {
    return (
        <div className='simple-block-wrapper' id='simple-block'>
            <Fade direction='up' triggerOnce>
                <h2 className={`${FONT_MONT_BOOK.className} simple-block-title`}>
                    {'а можно\nпопроще?'}
                </h2>
            </Fade>

            <Fade delay={250} triggerOnce>
                <p className={`${FONT_MONT_BOOK.className} simple-block-description`}>
                    {`Встречаемся в${NBSP}неформальной обстановке,\nзнакомимся вживую и${NBSP}общаемся по-человечески.\nВне рамок корпоративного мира. Заводим связи,\nкоторые превращаются в${NBSP}решения`}
                </p>
            </Fade>
        </div>
    );
}