'use client'

import { FONT_MONT_BOOK } from '../../fonts';

import './header.css';

type Props = {
    title: string;
    intoScroll?: string;
    link?: string;
}

export const HeaderItem = ({ title, intoScroll, link }: Props) => {
    const handleScrollIntoView = () => {
        if (intoScroll) {
            const element = document.getElementById(intoScroll!);
            const yOffset = window.innerWidth > 1024 ? 0 : 0;

            if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }

            return;
        }

        if (link) {
            window.open(link, '_blank');
        }
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