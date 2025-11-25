'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";
import { useState } from "react";
import { RegestryMemeberForm } from "@/app/components/registry-member-form";
import { LK_REGISTER_LINK } from "@/app/constants";

export const MainBannerButton = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => window.open(LK_REGISTER_LINK, '_blank');

    return (
        <>
            <Button type='primary' className={`main-banner-button`} onClick={handleClick}>
                <span className={`${FONT_MONT_BOOK.className}`}>
                    Стать участником
                </span>
            </Button>

            <RegestryMemeberForm open={open} onClose={() => setOpen(false)} />
        </>
    )
}
