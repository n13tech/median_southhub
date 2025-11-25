'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";
import { LK_REGISTER_LINK } from "@/app/constants";

export const AccesibleButton = () => {
    const handleClick = () => window.open(LK_REGISTER_LINK, '_blank');

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
