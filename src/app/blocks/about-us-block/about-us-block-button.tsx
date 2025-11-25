'use client';

import { TELEGRAM_CONTACT_US_LINK } from '@/app/constants';
import { FONT_MONT_BOOK } from '../../fonts';

import { Button } from 'antd';

export const AboutUsBlockButton = () => {
    const handleClick = () => window.open(TELEGRAM_CONTACT_US_LINK, '_blank');

    return (
        <Button
            variant='outlined'
            color='default'
            onClick={handleClick}
            className={`${FONT_MONT_BOOK.className} about-us-block-info-button`}
        >
            Связаться с нами
        </Button>
    );
}