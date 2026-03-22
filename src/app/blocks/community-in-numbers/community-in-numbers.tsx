import { useCallback, useEffect, useRef, useState } from 'react';
import { NBSP } from '@/app/constants';
import { FONT_MONT_BOOK, FONT_MONT_BOOK_EXTRA_LIGHT } from '../../fonts';
import './community-in-numbers.css';

export const CommunityInNumbers = () => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);

    const animateNumber = useCallback((start: number, end: number, setter: (value: number) => void, duration: number) => {
        const startTime = performance.now();
        
        const updateNumber = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(start + (end - start) * progress);
            setter(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }, []);

    const startAnimations = useCallback(() => {
        animateNumber(0, 1477, setCount1, 3000);
        animateNumber(0, 153, setCount2, 3000);
        animateNumber(0, 77, setCount3, 3000);
        animateNumber(0, 73, setCount4, 3000);
    }, [animateNumber]);

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current || isAnimated) return;
            
            const rect = wrapperRef.current.getBoundingClientRect();
            const isVisible = rect.top <= 0 && rect.bottom > 0;
            
            if (isVisible) {
                setIsAnimated(true);
                setShouldAnimate(true);
                startAnimations();
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAnimated, startAnimations]);

    return (
        <div className='community-in-numbers-wrapper' id='community-in-numbers' ref={wrapperRef}>
            <h3 
                className={`${FONT_MONT_BOOK.className} community-in-numbers-title`}
                style={{ cursor: 'pointer' }}
            >
                мы в цифрах
            </h3>

            <div className='community-in-numbers-infographic'>
                <div className='community-in-numbers-infographic-item'>
                    <div className={`community-in-numbers-infographic-item-animated ${shouldAnimate ? 'animate-item-1' : ''}`}>
                        <div className='community-in-numbers-infographic-item-fill' />
                    </div>
                    <div 
                        className={`community-in-numbers-infographic-item-content ${shouldAnimate ? 'animate-content-1' : ''}`}
                        style={!shouldAnimate ? { bottom: '0', top: 'auto' } : undefined}
                    >
                        <div className={`${FONT_MONT_BOOK_EXTRA_LIGHT.className} community-in-numbers-infographic-item-count`}>
                            {count1.toLocaleString()}
                        </div>
                        <div className={`${FONT_MONT_BOOK.className} community-in-numbers-infographic-item-desc`}>
                            {`профессионалов в${NBSP}IT: 55% CTO, 20% CPO, 15% CDO и${NBSP}15% CEO`}
                        </div>
                    </div>
                </div>

                <div className='community-in-numbers-infographic-item'>
                    <div className={`community-in-numbers-infographic-item-line ${shouldAnimate ? 'animate-line-2' : ''}`} />
                    <div className={`community-in-numbers-infographic-item-animated ${shouldAnimate ? 'animate-item-2' : ''}`}>
                        <div className='community-in-numbers-infographic-item-fill' />
                    </div>
                    <div 
                        className={`community-in-numbers-infographic-item-content ${shouldAnimate ? 'animate-content-2' : ''}`}
                        style={!shouldAnimate ? { bottom: '0', top: 'auto' } : undefined}
                    >
                        <div className={`${FONT_MONT_BOOK_EXTRA_LIGHT.className} community-in-numbers-infographic-item-count`}>
                            {count2}
                        </div>
                        <div className={`${FONT_MONT_BOOK.className} community-in-numbers-infographic-item-desc`}>
                            {`выступивших спикеров и${NBSP}лидеров индустрии за${NBSP}4${NBSP}года мероприятий`}
                        </div>
                    </div>
                </div>

                <div className='community-in-numbers-infographic-item'>
                    <div className={`community-in-numbers-infographic-item-line ${shouldAnimate ? 'animate-line-3' : ''}`} />
                    <div className={`community-in-numbers-infographic-item-animated ${shouldAnimate ? 'animate-item-3' : ''}`}>
                        <div className='community-in-numbers-infographic-item-fill' />
                    </div>
                    <div 
                        className={`community-in-numbers-infographic-item-content ${shouldAnimate ? 'animate-content-3' : ''}`}
                        style={!shouldAnimate ? { bottom: '0', top: 'auto' } : undefined}
                    >
                        <div className={`${FONT_MONT_BOOK_EXTRA_LIGHT.className} community-in-numbers-infographic-item-count`}>
                            {count3}%
                        </div>
                        <div className={`${FONT_MONT_BOOK.className} community-in-numbers-infographic-item-desc`}>
                            {`участников из Москвы, 23% — из других городов России и${NBSP}стран СНГ`}
                        </div>
                    </div>
                </div>

                <div className='community-in-numbers-infographic-item'>
                    <div className={`community-in-numbers-infographic-item-line ${shouldAnimate ? 'animate-line-4' : ''}`} />
                    <div className={`community-in-numbers-infographic-item-animated ${shouldAnimate ? 'animate-item-4' : ''}`}>
                        <div className='community-in-numbers-infographic-item-fill' />
                    </div>
                    <div 
                        className={`community-in-numbers-infographic-item-content ${shouldAnimate ? 'animate-content-4' : ''}`}
                        style={!shouldAnimate ? { bottom: '0', top: 'auto' } : undefined}
                    >
                        <div className={`${FONT_MONT_BOOK_EXTRA_LIGHT.className} community-in-numbers-infographic-item-count`}>
                            {count4}%
                        </div>
                        <div className={`${FONT_MONT_BOOK.className} community-in-numbers-infographic-item-desc`}>
                            {`NPS сообщества`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}