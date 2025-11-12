'use client';

import { DrawerWithForm } from "../drawer-with-form";
import { ModalWithForm } from "../modal-with-form";

type Props = {
    open: boolean;
    onClose: () => void;
}

export const RegestryMemeberForm = ({ open, onClose }: Props) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    if (isMobile) {
        return <DrawerWithForm open={open} onClose={onClose} />;
    }

    return <ModalWithForm open={open} onClose={onClose} />
}