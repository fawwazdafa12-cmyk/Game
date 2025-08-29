import React, { useState, useEffect, useRef, useCallback } from 'react';

const CONFIG_URL = "/assets/banner-images.json";
const TRANSITION_MS = 600;
const AUTOPLAY_DELAY = 3500;
const MAX_SLIDES = 6;

const BannerSlider: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const sliderRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement>(null);
    const autoplayTimer = useRef<number | null>(null);
    const startX = useRef(0);

    const goTo = useCallback((index: number, options: { instant?: boolean } = {}) => {
        if (!slidesRef.current || images.length === 0) return;
        const newIndex = (index + images.length) % images.length;
        
        slidesRef.current.style.transition = options.instant ? 'none' : `transform ${TRANSITION_MS}ms ease`;
        slidesRef.current.style.transform = `translateX(-${newIndex * 100}%)`;

        setCurrentIndex(newIndex);
        
        if (options.instant) {
            requestAnimationFrame(() => {
                if(slidesRef.current) {
                    slidesRef.current.style.transition = `transform ${TRANSITION_MS}ms ease`;
                }
            });
        }
    }, [images.length]);

    const stopAuto = useCallback(() => {
        if (autoplayTimer.current) {
            clearInterval(autoplayTimer.current);
            autoplayTimer.current = null;
        }
    }, []);

    const startAuto = useCallback(() => {
        stopAuto();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || images.length <= 1) return;
        autoplayTimer.current = window.setInterval(() => {
            setCurrentIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % images.length;
                goTo(newIndex);
                return newIndex;
            });
        }, AUTOPLAY_DELAY);
    }, [stopAuto, images.length, goTo]);

    useEffect(() => {
        fetch(CONFIG_URL, { cache: "no-cache" })
            .then(r => r.json())
            .then(json => {
                let arr = Array.isArray(json) ? json : (json.images || []);
                arr = arr
                    .filter((u: unknown): u is string => typeof u === 'string' && /\.(jpe?g|png)(\?.*)?$/i.test(u))
                    .slice(0, MAX_SLIDES);

                if (arr.length > 0 && arr.length < MAX_SLIDES) {
                    const need = MAX_SLIDES - arr.length;
                    arr = arr.concat(arr.slice(0, need));
                }
                setImages(arr);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            startAuto();
        }
        return stopAuto;
    }, [images.length, startAuto, stopAuto]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleMouseEnter = () => stopAuto();
        const handleMouseLeave = () => startAuto();
        
        slider.addEventListener("mouseenter", handleMouseEnter);
        slider.addEventListener("mouseleave", handleMouseLeave);
        
        const onVis = () => document.hidden ? stopAuto() : startAuto();
        document.addEventListener("visibilitychange", onVis);
        
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => entry.isIntersecting ? startAuto() : stopAuto());
        }, { threshold: 0.5 });
        io.observe(slider);

        return () => {
            slider.removeEventListener("mouseenter", handleMouseEnter);
            slider.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("visibilitychange", onVis);
            io.disconnect();
        };
    }, [startAuto, stopAuto]);
    
    useEffect(() => {
        const handleResize = () => goTo(currentIndex, { instant: true });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex, goTo]);
    
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0 || !slidesRef.current) return;
        stopAuto();
        startX.current = e.clientX;
        slidesRef.current.style.transition = 'none';
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setIsDragging(true);
    };
    
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging || !slidesRef.current || !sliderRef.current) return;
        e.preventDefault();
        const dx = e.clientX - startX.current;
        const percent = (dx / sliderRef.current.clientWidth) * 100;
        slidesRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${percent}%))`;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging || !sliderRef.current) return;
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        setIsDragging(false);

        const dx = e.clientX - startX.current;
        const threshold = sliderRef.current.clientWidth * 0.15;

        if (dx < -threshold) {
            goTo(currentIndex + 1);
        } else if (dx > threshold) {
            goTo(currentIndex - 1);
        } else {
            goTo(currentIndex);
        }
        startAuto();
    };

    if (images.length === 0) {
        return (
            <div className="w-full aspect-[5/2] lg:aspect-[4/1] rounded-3xl lg:rounded-[28px] bg-[#2d3748] animate-pulse" aria-label="Memuat banner promosi...">
            </div>
        );
    }
    
    return (
        <div 
            ref={sliderRef} 
            className="w-full aspect-[5/2] lg:aspect-[4/1] rounded-3xl lg:rounded-[28px] overflow-hidden relative bg-[#111] touch-pan-y translate-y-[5%]"
            role="region" 
            aria-roledescription="carousel" 
            aria-label="Banner promosi"
        >
            <div 
                ref={slidesRef}
                className={`flex h-full cursor-grab transition-transform ease-in-out duration-500 ${isDragging ? 'cursor-grabbing' : ''}`}
                style={{ willChange: 'transform', transform: `translateX(-${currentIndex * 100}%)` }}
                aria-live="off"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                {images.map((url, i) => (
                    <div className="min-w-full h-full select-none" key={i} aria-hidden={i !== currentIndex}>
                        <img src={url} alt={`Banner ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="w-full h-full object-cover block pointer-events-none" />
                    </div>
                ))}
            </div>
            <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-2 z-[2]" aria-label="Navigasi slide">
                {images.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Ke slide ${i + 1}`}
                        aria-current={i === currentIndex}
                        onClick={() => {
                            stopAuto();
                            goTo(i);
                            startAuto();
                        }}
                        className={`w-2 h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-300 ${i === currentIndex ? 'w-6 bg-white' : 'bg-white/60'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;