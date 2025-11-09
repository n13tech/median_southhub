'use client'

import { FONT_MONT_BOOK } from '../../fonts';

import './header.css';

type Props = {
    title: string;
    intoScroll: string;
}

export const HeaderItem = ({ title, intoScroll }: Props) => {
    const handleScrollIntoView = () => {
        document.getElementById(intoScroll)?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div
            onClick={handleScrollIntoView}
            className={`${FONT_MONT_BOOK.className} header_item`}
        >
            {title}
        </div>
    );
}