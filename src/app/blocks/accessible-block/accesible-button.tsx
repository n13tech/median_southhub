'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";

export const AccesibleButton = () => {
    const handleClick = () => window.open('https://lk.southhub.ru/accounts/register/', '_blank');

    return (
        <>
            <Button type='primary' className={`accesible-button`} onClick={handleClick}>
                <span className={`${FONT_MONT_BOOK.className}`}>
                    Личный кабинет
                </span>
            </Button>
        </>
    )
}
