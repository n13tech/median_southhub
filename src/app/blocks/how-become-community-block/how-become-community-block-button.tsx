'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";
import { LK_REGISTER_LINK } from "@/app/constants";
import { useGetLinkWithUtm } from "@/app/hooks/use-get-link-with-utm";

export const AccesibleButton = () => {
    const getLinkWIthUtm = useGetLinkWithUtm();

    const handleClick = () => window.open(getLinkWIthUtm(LK_REGISTER_LINK), '_blank');

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
