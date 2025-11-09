'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";

export const MainBannerButton = () => {
    const handleClick = () => alert('НЕ СТАЛ УЧАСТНИКОМ ХАХАХА');

    return (
        <Button type='primary' className={`main-banner-button`} onClick={handleClick}>
            <span className={`${FONT_MONT_BOOK.className}`}>
                Стать участником
            </span>
        </Button>
    )
}
