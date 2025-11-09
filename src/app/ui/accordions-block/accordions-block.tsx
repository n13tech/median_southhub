'use client';

import { Collapse, CollapseProps } from 'antd';
import { FONT_MONT_BOOK } from '@/app/fonts';
import Image from 'next/image';

import AccordionPlus from '../../../../public/accordion-plus.svg';

import './accordions-block.css';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Топы для топов</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {'Все участники клуба — управленцы C-level, которые говорят\nна языке бизнеса и понимают, как вести за собой'}
        </p>
    ),
  },
  {
    key: '2',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Свобода говорить</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {'Попадите в круг равных, где доверие и открытость\nвдохновляют создавать новое вместе'}
        </p>
    ),
  },
  {
    key: '3',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Вход по уровню</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {'Мы внимательно отбираем участников, чтобы, в сообществе было с кем говорить по делу и по душам'}
        </p>
    ),
  },
  {
    key: '4',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Локальная сила, глобальные инсайты</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {'Сочетаем российскую практику, вдохновляемся\nмеждународными идеями, чтобы расти глобально'}
        </p>
    ),
  },
];

export const AccordionsBlock = () => {
    return (
        <div className='accordions-block-wrapper' id='accordions-block'>
            <Collapse
                ghost={true}
                expandIconPosition='end'
                items={items}
                className='accordions-block-component'
                expandIcon={() => (
                    <Image
                        src={AccordionPlus}
                        alt="accordion-plus"
                        width={47}
                        height={47}
                        priority
                    />
                )}
            />
        </div>
    );
}