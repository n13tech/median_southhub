'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";

export const AccesibleButton = () => {
    const handleClick = () => window.open('https://lk.southhub.ru/accounts/register/', '_blank');

    return (
        <>
            <Button type='primary' className={`how-become-community-block-button`} onClick={handleClick}>
                <span className={`${FONT_MONT_BOOK.className}`}>
                    Стать участником
                </span>
            </Button>
        </>
    )
}
