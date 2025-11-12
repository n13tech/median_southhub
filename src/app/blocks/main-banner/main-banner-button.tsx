'use client';

import { Button } from "antd";
import { FONT_MONT_BOOK } from "../../fonts";
import { useState } from "react";
import { RegestryMemeberForm } from "@/app/components/registry-member-form";

export const MainBannerButton = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);

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
