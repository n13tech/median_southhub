import { Fade } from 'react-awesome-reveal';
import Netwarming from '../../../../public/netwarming.svg';

import './netwarming-block.css';
import Image from 'next/image';
import { FONT_IBM_PLEX_SERIF } from '@/app/fonts';
import { useCallback, useEffect, useRef, useState } from 'react';

export const NetwarmingBlock = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Функция для расчета оптимального размера шрифта
    const calculateFontSize = useCallback((ctx: CanvasRenderingContext2D, text: string, maxWidth: number): number => {
        let fontSize = 100; // Начальный размер
        const step = 10;
        let textWidth = 0;
        
        // Бинарный поиск оптимального размера
        ctx.font = `italic bolder ${fontSize}px ${FONT_IBM_PLEX_SERIF.style.fontFamily}`;
        textWidth = ctx.measureText(text).width;
        
        if (textWidth <= maxWidth) {
            // Если текст уже помещается, увеличиваем до максимума
            while (textWidth <= maxWidth) {
                fontSize += step;
                ctx.font = `italic bolder ${fontSize}px ${FONT_IBM_PLEX_SERIF.style.fontFamily}`;
                textWidth = ctx.measureText(text).width;
            }
            return fontSize - step;
        } else {
            // Если не помещается, уменьшаем
            while (textWidth > maxWidth && fontSize > 10) {
                fontSize -= step;
                ctx.font = `italic bolder ${fontSize}px ${FONT_IBM_PLEX_SERIF.style.fontFamily}`;
                textWidth = ctx.measureText(text).width;
            }
            return fontSize;
        }
    }, []);

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
        gradient.addColorStop(0.6106, '#ff8e51ff');
        gradient.addColorStop(0.7548, '#45688aff');
        gradient.addColorStop(1, '#6191C1');
        return gradient;
    }, []);

    // Основная функция отрисовки текста
    const drawText = useCallback((mouseX: number | null, mouseY: number | null) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const text = "Netwarming";
        // Рассчитываем оптимальный размер шрифта
        const maxTextWidth = canvas.width - 20;
        const fontSize = calculateFontSize(ctx, text, maxTextWidth);
        
        // Устанавливаем стиль текста
        ctx.font = `italic bolder ${fontSize}px ${FONT_IBM_PLEX_SERIF.style.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Позиция текста по центру
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        
        // Измеряем текст для расчета радиуса
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const radius = textWidth * 0.3;

        if (mouseX !== null && mouseY !== null) {
            // Рисуем основной градиентный текст
            ctx.fillStyle = createBaseGradient(ctx, canvas.width);
            ctx.fillText(text, x, y);
            
            // Сохраняем состояние canvas
            ctx.save();
            
            // Создаем круговую область вокруг курсора с динамическим радиусом
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            
            // Рисуем текст с радиальным градиентом только в области клипа
            ctx.fillStyle = createHoverGradient(ctx, mouseX, mouseY, radius);
            ctx.fillText(text, x, y);
            
            // Восстанавливаем состояние canvas
            ctx.restore();
        } else {
            // Рисуем только основной градиентный текст когда курсор не над canvas
            ctx.fillStyle = createBaseGradient(ctx, canvas.width);
            ctx.fillText(text, x, y);
        }
    }, [calculateFontSize, createBaseGradient, createHoverGradient]);

    // Обработчик движения мыши
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        drawText(mouseX, mouseY);
    }, [drawText]);

    // Обработчик выхода мыши
    const handleMouseLeave = useCallback(() => {
        drawText(null, null);
    }, [drawText]);

    // Инициализация и обработка ресайза
    useEffect(() => {
        if (!isMobile) {
            updateDimensions();
            
            const handleResize = () => {
                updateDimensions();
                drawText(null, null);
            };

            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, [updateDimensions, drawText, isMobile]);

    // Отрисовка при изменении размеров
    useEffect(() => {
        if (!isMobile) {
            const canvas = canvasRef.current;

            if (canvas && dimensions.width > 0 && dimensions.height > 0) {
                canvas.width = dimensions.width;
                canvas.height = dimensions.height;
                drawText(null, null);
            }
        }
    }, [dimensions, drawText, isMobile]);

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
                    onMouseLeave={handleMouseLeave}
                    id="netwarming-block-text"
                ></canvas>
            )}
        </div>
    );
}