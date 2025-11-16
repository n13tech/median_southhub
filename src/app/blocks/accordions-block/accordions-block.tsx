'use client';

import { Collapse, CollapseProps } from 'antd';
import { FONT_MONT_BOOK } from '@/app/fonts';
import Image from 'next/image';

import AccordionPlus from '../../../../public/accordion-plus.svg';

import './accordions-block.css';
import { Fade } from 'react-awesome-reveal';
import { NBSP } from '@/app/constants';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Топы для топов</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`Все участники сообщества — C-level в IT и${NBSP}те, кто хочет ими стать.\nЗдесь говорят на языке бизнеса и${NBSP}понимают, как вести за собой`}
        </p>
    ),
  },
  {
    key: '2',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>{`Свобода мыслить и${NBSP}создавать`}</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`Попадите в${NBSP}круг равных, где доверие и${NBSP}открытость вдохновляют\nсоздавать новое вместе`}
        </p>
    ),
  },
  {
    key: '3',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Сила внутри</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`Мы внимательно отбираем участников, с${NBSP}кем можно говорить и${NBSP}по делу, и${NBSP}по душам`}
        </p>
    ),
  },
  {
    key: '4',
    label: <p className={`${FONT_MONT_BOOK.className} accordions-block-label`}>Глобальные инсайты</p>,
    children: (
        <p className={`${FONT_MONT_BOOK.className} accordions-block-children`}>
            {`Участники сообщества — IT-лидеры, которые делают бизнес в${NBSP}России и${NBSP}мыслят масштабно`}
        </p>
    ),
  },
];

export const AccordionsBlock = () => {
    return (
        <div className='accordions-block-wrapper' id='accordions-block'>
            <Fade delay={250} triggerOnce>
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
            </Fade>
        </div>
    );
}