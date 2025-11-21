import { Fade } from 'react-awesome-reveal';
import Netwarming from '../../../../public/netwarming.svg';

import './netwarming-block.css';
import Image from 'next/image';
import { FONT_IBM_PLEX_SERIF } from '@/app/fonts';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const NetwarmingBlock = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    const getFont = useCallback((fontSize: number) => `italic bolder ${fontSize}px ${FONT_IBM_PLEX_SERIF.style.fontFamily}`, []);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [mousePos, setMousePos] = useState<MousePosition | null>(null);
    const [animationProgress, setAnimationProgress] = useState(0); // 0 to 1

    // Функция для расчета оптимального размера шрифта
    const calculateFontSize = useCallback((ctx: CanvasRenderingContext2D, text: string, maxWidth: number): number => {
        let fontSize = 100; // Начальный размер
        const step = 10;
        let textWidth = 0;
        
        // Бинарный поиск оптимального размера
        ctx.font = getFont(fontSize);
        textWidth = ctx.measureText(text).width;
        
        if (textWidth <= maxWidth) {
            // Если текст уже помещается, увеличиваем до максимума
            while (textWidth <= maxWidth) {
                fontSize += step;
                ctx.font = getFont(fontSize);
                textWidth = ctx.measureText(text).width;
            }
            return fontSize - step;
        } else {
            // Если не помещается, уменьшаем
            while (textWidth > maxWidth && fontSize > 10) {
                fontSize -= step;
                ctx.font = getFont(fontSize);
                textWidth = ctx.measureText(text).width;
            }
            return fontSize;
        }
    }, [getFont]);

    // Функция для обновления размеров canvas
    const updateDimensions = useCallback(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            setDimensions({ width: clientWidth, height: clientHeight });
        }
    }, []);

    // Создание основного градиента
    const createBaseGradient = useCallback((ctx: CanvasRenderingContext2D, width: number) => {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#184078');
        gradient.addColorStop(0.193, '#5F8FBF');
        gradient.addColorStop(0.7678, '#6792BD');
        gradient.addColorStop(1, '#1D3D78');

        return gradient;
    }, []);

    // Создание градиента для области курсора
    const createHoverGradient = useCallback((ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number, radius: number) => {
        const gradient = ctx.createRadialGradient(
            mouseX, mouseY, 0,
            mouseX, mouseY, radius
        );

        gradient.addColorStop(0, '#FF3700');
        gradient.addColorStop(0.2933, '#FF7A32');
        gradient.addColorStop(0.7548, '#FFD2D2');
        gradient.addColorStop(1, '#6191C1');

        return gradient;
    }, []);

    // Основная функция отрисовки текста
    const drawText = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const text = "Netwarming";
        const maxTextWidth = canvas.width - 150;
        const fontSize = calculateFontSize(ctx, text, maxTextWidth);
        
        ctx.font = getFont(fontSize);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        
        // Измеряем текст для расчета радиуса
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const fullRadius = textWidth * 0.2;
        
        // Рисуем основной градиентный текст
        ctx.fillStyle = createBaseGradient(ctx, canvas.width);
        ctx.fillText(text, x, y);
        
        // Если есть позиция мыши и анимация активна, рисуем градиент
        if (mousePos && animationProgress > 0) {
            ctx.save();
        
            // Применяем анимацию к радиусу
            const currentRadius = fullRadius * animationProgress;
            
            // Создаем круговую область вокруг курсора
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, currentRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            
            // Рисуем текст с радиальным градиентом
            ctx.fillStyle = createHoverGradient(ctx, mousePos.x, mousePos.y, fullRadius);
            ctx.fillText(text, x, y);
            
            ctx.restore();
        }
    }, [calculateFontSize, getFont, createBaseGradient, mousePos, animationProgress, createHoverGradient]);

    // Анимационный цикл
    const animate = useCallback(() => {
        drawText();
        animationRef.current = requestAnimationFrame(drawText);
    }, [drawText]);

    // Обработчик движения мыши
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        setMousePos({ x: mouseX, y: mouseY });
    }, []);

    // Обработчик входа мыши
    const handleMouseEnter = useCallback(() => {
        // Плавное появление - увеличиваем прогресс анимации
        const startTime = Date.now();
        const animateIn = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 300, 1); // 300ms анимация
            setAnimationProgress(progress);
            
            if (progress < 1) {
                requestAnimationFrame(animateIn);
            }
        };
        animateIn();
    }, []);

    // Обработчик выхода мыши
    const handleMouseLeave = useCallback(() => {
        // Плавное исчезновение - уменьшаем прогресс анимации
        const startTime = Date.now();
        const startProgress = animationProgress;
        
        const animateOut = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.max(startProgress - (elapsed / 300), 0); // 300ms анимация
            setAnimationProgress(progress);
            
            if (progress > 0) {
                requestAnimationFrame(animateOut);
            } else {
                setMousePos(null);
            }
        };
        animateOut();
    }, [animationProgress]);

    // Инициализация и обработка ресайза
    useEffect(() => {
        if (!isMobile) {
            updateDimensions();
            
            const handleResize = () => {
            updateDimensions();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [updateDimensions, drawText, isMobile]);

    // Запуск анимации
    useEffect(() => {
        if (!isMobile) {
            animationRef.current = requestAnimationFrame(animate);
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [animate, isMobile]);

    // Отрисовка при изменении размеров
    useEffect(() => {
        if (!isMobile) {
            if (dimensions.width > 0 && dimensions.height > 0) {
            const canvas = canvasRef.current;
                if (canvas) {
                    canvas.width = dimensions.width;
                    canvas.height = dimensions.height;
                    drawText();
                }
            }
        }
    }, [dimensions.height, dimensions.width, drawText, isMobile]);

    return (
        <div ref={containerRef} className={`netwarming-block-wrapper ${isMobile ? 'netwarming-block-wrapper_mobile' : ''}`} id='netwarming-block'>
            {isMobile && (
                <Fade direction='up' triggerOnce>
                    <Image
                        src={Netwarming}
                        alt='netwarming'
                    />
                </Fade>
            )}

            {!isMobile && (
                <canvas
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    id="netwarming-block-text"
                ></canvas>
            )}
        </div>
    );
}