'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";
import { LK_SOUTHHUB_LINK } from "@/app/constants";
import { useGetLinkWithUtm } from "@/app/hooks/use-get-link-with-utm";

export const AccesibleButton = () => {
    const getLinkWIthUtm = useGetLinkWithUtm();

    const handleClick = () => window.open(getLinkWIthUtm(LK_SOUTHHUB_LINK), '_blank');

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
