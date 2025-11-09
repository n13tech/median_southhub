import { FONT_MONT_BOOK } from '../../fonts';

import './simple-block.css';

export const SimpleBlock = () => {
    return (
        <div className='simple-block-wrapper' id='simple-block'>
            <h2 className={`${FONT_MONT_BOOK.className} simple-block-title`}>
                {'а можно\nпопроще?'}
            </h2>

            <p className={`${FONT_MONT_BOOK.className} simple-block-description`}>
                {'Встречаемся в неформальной обстановке,\nзнакомимся вживую и общаемся по-человечески.\nВне рамок корпоративного мира. Заводим связи,\nкоторые превращаются в решения.'}
            </p>
        </div>
    );
}