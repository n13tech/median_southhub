'use client';

import { TELEGRAM_CONTACT_US_LINK } from '@/app/constants';
import { FONT_MONT_BOOK } from '../../fonts';

import { Button } from 'antd';
import { useGetLinkWithUtm } from '@/app/hooks/use-get-link-with-utm';

export const AboutUsBlockButton = () => {
    const getLinkWIthUtm = useGetLinkWithUtm();

    const handleClick = () => window.open(getLinkWIthUtm(TELEGRAM_CONTACT_US_LINK), '_blank');

    return (
        <Button
            type='primary'
            onClick={handleClick}
            className={`${FONT_MONT_BOOK.className} about-us-block-info-button base-button base-button_black`}
        >
            связаться
        </Button>
    );
}