import { FONT_MONT_BOOK } from '../../fonts';

import './footer.css';
import { FooterInfo } from './footer-info';

export const Footer = () => {
    return (
        <div className='footer-wrapper' id='footer'>
            <div className='footer-info-wrapper'>
                <p className={`${FONT_MONT_BOOK.className} footer-description`}>
                    {'Подписывайтесь на нашу рассылку, чтобы первыми узнавать о новых событиях, инсайтах от лидеров индустрии и возможностях для развития.'}
                </p>
                <p className={`${FONT_MONT_BOOK.className} footer-title`}>
                    {`@southhub_\ncommunity`}
                </p>
            </div>

            <FooterInfo />
        </div>
    );
}