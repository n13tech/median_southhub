'use client';

import { FONT_MONT_BOOK } from '../../fonts';
import LogoWhite from '../../../../public/logo-white.svg';
import TelegrammIcon from '../../../../public/telegramm-icon-white.svg';
import InstIcon from '../../../../public/inst-icon.png';
import YoutubeIcon from '../../../../public/youtube-icon.png';

import './footer.css';
import Image from 'next/image';

export const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-wrapper'>
                {/* <div className='footer-info-wrapper'>
                    <p className={`${FONT_MONT_BOOK.className} footer-description`}>
                        {'Подписывайтесь на нашу рассылку, чтобы первыми узнавать о новых событиях, инсайтах от лидеров индустрии и возможностях для развития.'}
                    </p>
                    <div className='footer-description-button-wrapper'>
                        <Button
                            variant='outlined'
                            color='default'
                            className={`${FONT_MONT_BOOK.className} footer-description-button-email`}
                        >
                            ваш email
                        </Button>
                        <Button
                            type='primary'
                            color='default'
                            className={`${FONT_MONT_BOOK.className} footer-description-button-subscription`}
                        >
                            подписаться
                        </Button>
                    </div>
                </div> */}

                <div className='footer-info'>
                    <Image
                        src={LogoWhite}
                        alt="southuub"
                        height={28}
                        priority
                        className='footer-logo'
                    />

                    <div className='footer-contacts footer-contacts-first'>
                        <p className={`${FONT_MONT_BOOK.className} footer-contacts-label`}>Контакты:</p>
                        <a href='mailto:mail@southhub.ru' target='_blank' className={`${FONT_MONT_BOOK.className} footer-contacts-link`}>Email: mail@southhub.ru</a>
                        <a href='https://telegram.me/share/url?url=sthhb' target='_blank' className={`${FONT_MONT_BOOK.className} footer-contacts-link`}>Telegram: @sthhb</a>
                    </div>

                    <div className='footer-contacts footer-contacts-second'>
                        <p className={`${FONT_MONT_BOOK.className} footer-contacts-label`}>ООО «Высокие люди»</p>
                        <p className={`${FONT_MONT_BOOK.className} footer-contacts-label`}>ИНН 2320134913</p>
                        {/* <p className={`${FONT_MONT_BOOK.className} footer-contacts-label footer-contacts-label-dashed`}>Публичная оферта</p> */}
                        <a href='https://lk.southhub.ru/confidential' target='_blank' className={`${FONT_MONT_BOOK.className} footer-contacts-label footer-contacts-label-dashed`}>Политика конфиденциальности</a>
                        <a href='https://lk.southhub.ru/cookies' target='_blank' className={`${FONT_MONT_BOOK.className} footer-contacts-label footer-contacts-label-dashed`}>Политика обработки файлов cookie</a>
                        <a href='https://lk.southhub.ru/pd' target='_blank' className={`${FONT_MONT_BOOK.className} footer-contacts-label footer-contacts-label-dashed`}>Политика обработки персональных данных</a>
                        {/* <p className={`${FONT_MONT_BOOK.className} footer-contacts-label footer-contacts-label-dashed`}>Пользовательское соглашение</p> */}
                        <p className={`${FONT_MONT_BOOK.className} footer-contacts-label`}>© 2025 South HUB. Все права защищены</p>
                    </div>

                    <div className='footer-icons'>
                        <a href='https://www.youtube.com/@sthhb' target='_blank'>
                            <Image
                                src={YoutubeIcon}
                                alt="youtube"
                                height={52}
                                priority
                            />
                        </a>
                        <a href='https://www.linkedin.com/company/south-hub/' target='_blank'>
                            <Image
                                src={InstIcon}
                                alt="linkedin"
                                height={52}
                                priority
                            />
                        </a>
                        <a href='https://telegram.me/share/url?url=sthhb' target='_blank' className={`${FONT_MONT_BOOK.className} footer-contacts-link`}>
                            <Image
                                src={TelegrammIcon}
                                alt="telegramm"
                                height={52}
                                priority
                            />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}