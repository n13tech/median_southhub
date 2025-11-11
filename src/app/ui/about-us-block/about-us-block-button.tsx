'use client';

import { FONT_MONT_BOOK } from '../../fonts';

import { Button } from 'antd';

export const AboutUsBlockButton = () => {
    const handleClick = () => alert('ПРЕВЕД МЕДВЕД');

    return (
        <Button
            variant='outlined'
            color='default'
            onClick={handleClick}
            className={`${FONT_MONT_BOOK.className} about-us-block-info-button`}
        >
            Связаться с нами
        </Button>
    );
}