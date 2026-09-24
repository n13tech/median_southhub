"use client";

import { FONT_IBM_PLEX_SERIF_ITALIC, FONT_MONT_BOOK } from "../../fonts";
import { MainBannerButton } from "./main-banner-button";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./main-banner.css";
import { NBSP } from "@/app/constants";

const ANIMATION_SPEED_FACTOR = 1.1;

export const MainBanner = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mainBannerText1 = useRef<HTMLDivElement>(null);
  const mainBannerText2 = useRef<HTMLDivElement>(null);
  const mainBannerText3 = useRef<HTMLDivElement>(null);
  const mainBannerText4 = useRef<HTMLDivElement>(null);

  const buttonRef = useRef<HTMLDivElement>(null);

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const textAnimationsRef = useRef<ScrollTrigger[]>([]);
  const videoScaleAnimationRef = useRef<ScrollTrigger | null>(null);
  const isVideoScaledRef = useRef(false);

  const animateIn = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    gsap.killTweensOf(element);
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  const animateOut = useCallback(
    (element: HTMLElement | null, direction: "up" | "down" = "up") => {
      if (!element) return;
      gsap.killTweensOf(element);
      gsap.to(element, {
        opacity: 0,
        y: direction === "up" ? -30 : 30,
        duration: 0.5,
        ease: "power3.in",
        overwrite: "auto",
      });
    },
    [],
  );

  // ============================================================
  // ИЗМЕНЕНИЕ 1: resize-листенер только на смену breakpoint + обновление размеров
  // (не дергает setState на каждый пиксель ресайза)
  // ============================================================
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1024px)");

    const updateSizes = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    // Обновляем размеры только при смене breakpoint или ориентации
    const handleBreakpointChange = () => updateSizes();

    updateSizes(); // начальное значение

    mql.addEventListener("change", handleBreakpointChange);
    window.addEventListener("orientationchange", handleBreakpointChange);

    return () => {
      mql.removeEventListener("change", handleBreakpointChange);
      window.removeEventListener("orientationchange", handleBreakpointChange);
    };
  }, []);

  // ============================================================
  // Появление первого текста при загрузке (ваш оригинал)
  // ============================================================
  useEffect(() => {
    if (!mainBannerText1.current) return;

    gsap.set(mainBannerText1.current, { opacity: 0, y: 30 });
    gsap.to(mainBannerText1.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  // ============================================================
  // ВАШ setupTextAnimations — БЕЗ ИЗМЕНЕНИЙ (кроме refreshPriority)
  // ============================================================
  const setupTextAnimations = useCallback(() => {
    textAnimationsRef.current.forEach((animation) => animation.kill());
    textAnimationsRef.current = [];

    const section = sectionRef.current;
    if (!section) return;

    // Начальные состояния (ваш оригинал)
    if (mainBannerText1.current) {
      gsap.set(mainBannerText1.current, { opacity: 1, y: 0 });
    }

    [
      mainBannerText2.current,
      mainBannerText3.current,
      mainBannerText4.current,
    ].forEach((el) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 0, y: 30 });
    });

    // text1 — без onLeaveBack (ваша логика)
    if (mainBannerText1.current) {
      const animation1 = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "top+=35% top",
        refreshPriority: 0,
        onEnter: () => animateIn(mainBannerText1.current),
        onLeave: () => animateOut(mainBannerText1.current, "up"),
        onEnterBack: () => animateIn(mainBannerText1.current),
      });
      textAnimationsRef.current.push(animation1);
    }

    // text2 — все четыре колбэка (ваша логика)
    if (mainBannerText2.current) {
      const animation2 = ScrollTrigger.create({
        trigger: section,
        start: "top+=10% top",
        end: "top+=35% top",
        refreshPriority: 0,
        onEnter: () => animateIn(mainBannerText2.current),
        onLeave: () => animateOut(mainBannerText2.current, "up"),
        onEnterBack: () => animateIn(mainBannerText2.current),
        onLeaveBack: () => animateOut(mainBannerText2.current, "down"),
      });
      textAnimationsRef.current.push(animation2);
    }

    const otherElements = [
      { element: mainBannerText3.current, percent: 40 },
      { element: mainBannerText4.current, percent: 65 },
    ];

    otherElements.forEach(({ element, percent }) => {
      if (!element) return;

      const animation = ScrollTrigger.create({
        trigger: section,
        start: `top+=${percent}% top`,
        end: `top+=${percent + 5}% top`,
        refreshPriority: 0,
        onEnter: () => animateIn(element),
        onLeaveBack: () => animateOut(element, "down"),
      });

      textAnimationsRef.current.push(animation);
    });
  }, [animateIn, animateOut]);

  // ============================================================
  // ВАШ setupVideoScaleAnimation — БЕЗ ИЗМЕНЕНИЙ (кроме refreshPriority)
  // ============================================================
  const setupVideoScaleAnimation = useCallback(() => {
    if (videoScaleAnimationRef.current) {
      videoScaleAnimationRef.current.kill();
      videoScaleAnimationRef.current = null;
    }

    const section = sectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    if (!section || !videoWrapper) return;

    const currentScale = Number(gsap.getProperty(videoWrapper, "scale")) || 1;
    isVideoScaledRef.current = currentScale > 1.01;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      refreshPriority: 0,
      onUpdate: (self) => {
        const shouldScale = self.progress >= 0.45;

        if (shouldScale === isVideoScaledRef.current) return;

        isVideoScaledRef.current = shouldScale;
        gsap.killTweensOf(videoWrapper);
        gsap.to(videoWrapper, {
          scale: shouldScale ? 1.5 : 1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    videoScaleAnimationRef.current = st;
  }, []);

  // ============================================================
  // ВАШ основной useEffect — БЕЗ ИЗМЕНЕНИЙ
  // + anticipatePin: 1 (ИЗМЕНЕНИЕ 2)
  // ============================================================
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const videoWrapper = videoWrapperRef.current;

    if (!section || !pin || !videoWrapper || !windowHeight) return;

    const isMobile = windowWidth <= 1024;
    const scrollDistance = isMobile ? 4000 * ANIMATION_SPEED_FACTOR : 5000;

    section.style.minHeight = `${scrollDistance + windowHeight}px`;

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollDistance}`,
      scrub: true,
      pin: pin,
      pinSpacing: false,
      anticipatePin: 1, // ИЗМЕНЕНИЕ 2
      invalidateOnRefresh: true,
      refreshPriority: 0,
    });

    setupTextAnimations();
    setupVideoScaleAnimation();

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (videoScaleAnimationRef.current) {
        videoScaleAnimationRef.current.kill();
        videoScaleAnimationRef.current = null;
      }
      textAnimationsRef.current.forEach((animation) => animation.kill());
      textAnimationsRef.current = [];
    };
  }, [
    windowHeight,
    windowWidth,
    setupTextAnimations,
    setupVideoScaleAnimation,
  ]);

  return (
    <div className="main-banner-wrapper" id="main-banner" ref={sectionRef}>
      <div className="main-banner-pin-wrapper" ref={pinRef}>
        <div className="video-wrapper" ref={videoWrapperRef}>
          <video
            ref={videoRef}
            className="home-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            id="main-video-banner"
            disableRemotePlayback
          >
            <source src="./v2/southuuub.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="main-banner-content" ref={contentRef}>
          <div
            ref={mainBannerText1}
            className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-1`}
          >
            {"сообщество\nC-level в IT"}
          </div>

          <div
            ref={mainBannerText2}
            className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-2`}
          >
            {`здесь лидеры находят партнёрства,\nресурсы и${NBSP}смыслы, которых\nне встретить онлайн.`}
          </div>

          <div
            ref={mainBannerText3}
            className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-3`}
          >
            <span>{`мы переизобрели\nнетворкинг и получили`}</span>

            <div
              className={`${FONT_IBM_PLEX_SERIF_ITALIC.className} main-banner-text-3-netwarming`}
            >
              netwarming <span>&mdash;</span>
            </div>
          </div>

          <div
            ref={mainBannerText4}
            className={`${FONT_MONT_BOOK.className} main-banner-text main-banner-text-4`}
          >
            это искусство встречаться по-настоящему: с теплом, доверием и
            искренностью. это свежий воздух вместо офисных переговорок, живой
            смех вместо холодных встреч, свобода вместо тесных рамок. и юг как
            состояние души.
          </div>

          <div ref={buttonRef} className="main-banner-button-wrapper">
            <MainBannerButton />
          </div>
        </div>
      </div>
    </div>
  );
};
