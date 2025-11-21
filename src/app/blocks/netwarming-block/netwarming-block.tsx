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
    const [targetMousePos, setTargetMousePos] = useState<MousePosition | null>(null);
    const [currentMousePos, setCurrentMousePos] = useState<MousePosition | null>(null);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [isTouching, setIsTouching] = useState(false);

    // Для отслеживания движения курсора
    const lastMousePosRef = useRef<MousePosition | null>(null);
    const movementTimerRef = useRef<NodeJS.Timeout>();
    const isMovingRef = useRef(false);

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

    // Расчет динамического радиуса в зависимости от позиции курсора
    const calculateDynamicRadius = useCallback((
        mouseX: number, 
        textCenterX: number, 
        textWidth: number
    ): number => {
        // Расстояние от курсора до центра текста
        const distanceFromCenter = Math.abs(mouseX - textCenterX);
        
        // Максимальное расстояние от центра до края текста
        const maxDistance = textWidth / 2;
        
        // Нормализованное расстояние (0 в центре, 1 на краю)
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        
        // Базовые радиусы
        const centerRadius = textWidth * 0.2;  // 20% в центре
        const edgeRadius = textWidth * 0.1;    // 10% на краях
        
        // Интерполяция радиуса в зависимости от расстояния от центра
        // Используем квадратичную функцию для более плавного изменения
        const progress = 1 - Math.pow(normalizedDistance, 0.7);
        const dynamicRadius = edgeRadius + (centerRadius - edgeRadius) * progress;
        
        return dynamicRadius;
    }, []);

    // Функция линейной интерполяции с easing
    const lerp = (start: number, end: number, factor: number): number => {
        return start + (end - start) * factor;
    };

    // Плавная интерполяция с easing (на 50% быстрее)
    const smoothLerp = (start: number, end: number, factor: number): number => {
        // Увеличили коэффициент с 0.08 до 0.12 (на 50% быстрее)
        const easedFactor = factor * factor * (3 - 2 * factor);
        return start + (end - start) * easedFactor;
    };

    // Определение движения курсора
    const handleMovementDetection = useCallback((newPos: MousePosition) => {
        // Сбрасываем предыдущий таймер
        if (movementTimerRef.current) {
            clearTimeout(movementTimerRef.current);
        }
        
        // Проверяем, действительно ли курсор движется
        if (lastMousePosRef.current) {
            const distance = Math.sqrt(
                Math.pow(newPos.x - lastMousePosRef.current.x, 2) +
                Math.pow(newPos.y - lastMousePosRef.current.y, 2)
            );
            
            if (distance > 2) { // Порог движения (2px)
                isMovingRef.current = true;
            }
        }
        
        lastMousePosRef.current = newPos;
        
        // Устанавливаем таймер для определения остановки
        movementTimerRef.current = setTimeout(() => {
            isMovingRef.current = false;
        }, 100); // 100ms без движения = остановка
    }, []);

    // Основная функция отрисовки текста
    const drawText = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const text = "Netwarming";
        const maxTextWidth = canvas.width - (window.innerWidth > 1024 ? 150 : 32);
        const fontSize = calculateFontSize(ctx, text, maxTextWidth);
        
        ctx.font = getFont(fontSize);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const textCenterX = canvas.width / 2;
        const textCenterY = canvas.height / 2;
            
        // Измеряем текст для расчета радиуса
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        
        // Рисуем основной градиентный текст
        ctx.fillStyle = createBaseGradient(ctx, canvas.width);
        ctx.fillText(text, textCenterX, textCenterY);
        
        // Если есть позиция мыши и анимация активна, рисуем градиент
        if (currentMousePos && animationProgress > 0) {
            ctx.save();

            // Рассчитываем динамический радиус
            const dynamicRadius = calculateDynamicRadius(currentMousePos.x, textCenterX, textWidth);
        
            // Применяем анимацию к радиусу
            const currentRadius = dynamicRadius * animationProgress;
            
            // Создаем круговую область вокруг курсора
            ctx.beginPath();
            ctx.arc(currentMousePos.x, currentMousePos.y, currentRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Рисуем текст с радиальным градиентом
            ctx.fillStyle = createHoverGradient(ctx, currentMousePos.x, currentMousePos.y, dynamicRadius);
            ctx.fillText(text, textCenterX, textCenterY);
            
            ctx.restore();
        }
    }, [calculateFontSize, getFont, createBaseGradient, currentMousePos, animationProgress, calculateDynamicRadius, createHoverGradient]);

    // Функция анимации
    const animate = useCallback(() => {
        if (targetMousePos && currentMousePos) {
            let newX: number, newY: number;

            const smooth = 0.2;
            const center = 0.1;
            
            if (isMovingRef.current) {
                newX = smoothLerp(currentMousePos.x, targetMousePos.x, smooth);
                newY = smoothLerp(currentMousePos.y, targetMousePos.y, smooth);
            } else {
                // Когда курсор остановился - быстрое точное позиционирование
                newX = lerp(currentMousePos.x, targetMousePos.x, center);
                newY = lerp(currentMousePos.y, targetMousePos.y, center);
            }
            
            // Проверяем расстояние до цели
            const distance = Math.sqrt(
                Math.pow(newX - targetMousePos.x, 2) + 
                Math.pow(newY - targetMousePos.y, 2)
            );
            
            if (distance < 0.5) {
                // Если очень близко - точно центрируем
                setCurrentMousePos(targetMousePos);
            } else {
                setCurrentMousePos({ x: newX, y: newY });
            }
        }
        
        drawText();
    }, [targetMousePos, currentMousePos, drawText]);

    // Обработчик движения мыши
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const newTargetPos = { x: mouseX, y: mouseY };
        setTargetMousePos(newTargetPos);
        handleMovementDetection(newTargetPos);

        if (!currentMousePos) {
            setCurrentMousePos(newTargetPos);
        }
    }, [currentMousePos, handleMovementDetection]);

    // Обработчик входа мыши
    const handleMouseEnter = useCallback(() => {
        const startTime = Date.now();
        const animateIn = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 300, 1);
        setAnimationProgress(progress);
        
        if (progress < 1) {
            requestAnimationFrame(animateIn);
        }
        };
        animateIn();
    }, []);

    // Обработчик выхода мыши
    const handleMouseLeave = useCallback(() => {
        if (movementTimerRef.current) {
        clearTimeout(movementTimerRef.current);
        }
        
        const startTime = Date.now();
        const startProgress = animationProgress;
        
        const animateOut = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.max(startProgress - (elapsed / 300), 0);
        setAnimationProgress(progress);
        
        if (progress > 0) {
            requestAnimationFrame(animateOut);
        } else {
            setTargetMousePos(null);
            setCurrentMousePos(null);
            lastMousePosRef.current = null;
            isMovingRef.current = false;
        }
        };
        animateOut();
    }, [animationProgress]);

    // Touch обработчики для мобильных устройств
    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        e.preventDefault();
        setIsTouching(true);
        
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
        
        const newTargetPos = { x: touchX, y: touchY };
        setTargetMousePos(newTargetPos);
        setCurrentMousePos(newTargetPos);
        
        // Плавное появление при touch
        const startTime = Date.now();
        const animateIn = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 200, 1); // Быстрее на мобильных
            setAnimationProgress(progress);
            
            if (progress < 1) {
                requestAnimationFrame(animateIn);
            }
        };
        animateIn();
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
        
        const newTargetPos = { x: touchX, y: touchY };
        setTargetMousePos(newTargetPos);
        handleMovementDetection(newTargetPos);
    }, [handleMovementDetection]);

    const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsTouching(false);
        
        // Плавное исчезновение при окончании touch
        const startTime = Date.now();
        const startProgress = animationProgress;
        
        const animateOut = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.max(startProgress - (elapsed / 200), 0); // Быстрее на мобильных
            setAnimationProgress(progress);
            
            if (progress > 0) {
                requestAnimationFrame(animateOut);
            } else {
                setTargetMousePos(null);
                setCurrentMousePos(null);
                lastMousePosRef.current = null;
                isMovingRef.current = false;
            }
        };
        animateOut();
    }, [animationProgress]);

    // Инициализация и обработка ресайза
    useEffect(() => {
        updateDimensions();
        
        const handleResize = () => {
            updateDimensions();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateDimensions]);

    // Запуск анимации
    useEffect(() => {
        const animationLoop = () => {
            animate();
            animationRef.current = requestAnimationFrame(animationLoop);
        };
        
        animationRef.current = requestAnimationFrame(animationLoop);
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate]);

    // Очистка таймера при размонтировании
    useEffect(() => {
        return () => {
        if (movementTimerRef.current) {
            clearTimeout(movementTimerRef.current);
        }
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        };
    }, []);

    // Отрисовка при изменении размеров
    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0) {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = dimensions.width;
                canvas.height = dimensions.height;
                drawText();
            }
        }
    }, [dimensions.height, dimensions.width, drawText]);

    return (
        <div ref={containerRef} className={`netwarming-block-wrapper ${isMobile ? 'netwarming-block-wrapper_mobile' : ''}`} id='netwarming-block'>
            {isMobile ? (
                <>
                    {/* Для мобильных - canvas с touch событиями */}
                    <canvas
                        ref={canvasRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        id="netwarming-block-text"
                        style={{ 
                            touchAction: 'none', // Отключаем стандартное поведение браузера для touch
                            cursor: 'pointer'
                        }}
                    />
                </>
            ) : (
                // Для десктопа - обычный canvas
                <canvas
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    id="netwarming-block-text"
                />
            )}
        </div>
    );
}