'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";
import { LK_SOUTHHUB_LINK } from "@/app/constants";

export const AccesibleButton = () => {
    const handleClick = () => window.open(LK_SOUTHHUB_LINK, '_blank');

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
