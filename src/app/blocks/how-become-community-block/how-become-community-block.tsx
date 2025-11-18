import { Fade } from 'react-awesome-reveal';
import { FONT_MONT_BOOK } from '../../fonts';

import './how-become-community-block.css';
import { AccesibleButton } from './how-become-community-block-button';
import { NBSP } from '@/app/constants';

export const HowBecomeCommunityBlock = () => {
    return (
        <div className='how-become-community-block-wrapper' id='how-become-community-block'>
            <div className='how-become-community-block-first'>
                <Fade direction='up' triggerOnce>
                    <h2 className={`${FONT_MONT_BOOK.className} how-become-community-block-title`}>
                        {'Как стать частью\nсообщества?'}
                    </h2>
                </Fade>

                <Fade delay={250} triggerOnce>
                    <p className={`${FONT_MONT_BOOK.className} how-become-community-block-description`}>
                        {`Внимательно рассматриваем каждую заявку и${NBSP}заботливо формируем сообщество. Валидация не${NBSP}формальность, мы стремимся, чтобы каждый усиливал друг друга`}
                    </p>
                </Fade>
            </div>

            <div className='how-become-community-block-second'>
                <Fade direction='up' triggerOnce>
                    <h2 className={`${FONT_MONT_BOOK.className} how-become-community-block-title`}>
                        {'Всё просто:'}
                    </h2>
                </Fade>

                <Fade delay={250} triggerOnce>
                    <ul className='how-become-community-block-ul'>
                        <li className={`${FONT_MONT_BOOK.className} how-become-community-block-li`}>
                            <span>1.</span>
                            <p>{`Заполните анкету в${NBSP}личном кабинете`}</p>
                        </li>
                        <li className={`${FONT_MONT_BOOK.className} how-become-community-block-li`}>
                            <span>2.</span>
                            <p>{`Подтвердим вашу заявку в${NBSP}течение двух рабочих дней`}</p>
                        </li>
                        <li className={`${FONT_MONT_BOOK.className} how-become-community-block-li`}>
                            <span>3.</span>
                            <p>{`Как только всё проверим — вы станете частью South${NBSP}HUB`}</p>
                        </li>
                    </ul>
                </Fade>

                <Fade delay={250} triggerOnce>
                    <AccesibleButton />
                </Fade>
            </div>
        </div>
    );
}