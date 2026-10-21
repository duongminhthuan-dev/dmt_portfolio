import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import AppleGaramondItalic from "next/font/local";

const appleGaramondItalic = AppleGaramondItalic({
    weight:"400",
    src: "../public/fonts/AppleGaramond-Italic.ttf",
    variable: "--AppleGaramondItalic",
})

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string | ((t: number) => number);
    splitType?: "chars" | "words" | "lines" | "words, chars";
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: React.CSSProperties["textAlign"];
    onLetterAnimationComplete?: () => void;
    // New props for word styling
    highlightWords?: string[];
    caseSensitive?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
                                                 text,
                                                 className = "",
                                                 delay = 100,
                                                 duration = 0.6,
                                                 ease = "power3.out",
                                                 splitType = "chars",
                                                 from = { opacity: 0, y: 40 },
                                                 to = { opacity: 1, y: 0 },
                                                 threshold = 0.1,
                                                 rootMargin = "-100px",
                                                 textAlign = "inherit",
                                                 onLetterAnimationComplete,
                                                 highlightWords = [],
                                                 caseSensitive = false,
                                             }) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const animationCompletedRef = useRef(false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    const applyWordStyles = (splitter: GSAPSplitText) => {
        if (!highlightWords.length || !splitter.words) return;

        splitter.words.forEach((wordElement) => {
            const wordText = wordElement.textContent?.trim() || "";

            // Strip punctuation from the word for comparison
            const cleanedWord = wordText.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();

            const shouldHighlight = highlightWords.some((targetWord) => {
                return caseSensitive
                    ? cleanedWord === targetWord
                    : cleanedWord.toLowerCase() === targetWord.toLowerCase();
            });

            if (shouldHighlight) {
                // Separate the word from punctuation
                const match = wordText.match(/^(\W*)(.*?)(\W*)$/);
                if (match) {
                    const [, leadingPunct, word, trailingPunct] = match;

                    // Clear the original content
                    wordElement.innerHTML = '';

                    // Add leading punctuation (if any)
                    if (leadingPunct) {
                        wordElement.appendChild(document.createTextNode(leadingPunct));
                    }

                    // Add highlighted word
                    const spanElement = document.createElement('span');
                    spanElement.textContent = word;
                    spanElement.classList.add('highlight-word');
                    spanElement.classList.add(appleGaramondItalic.className);
                    wordElement.appendChild(spanElement);

                    // Add trailing punctuation (if any)
                    if (trailingPunct) {
                        wordElement.appendChild(document.createTextNode(trailingPunct));
                    }
                }
            }
        });
    };

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current || !text) return;

        const el = ref.current;

        animationCompletedRef.current = false;

        const absoluteLines = splitType === "lines";
        if (absoluteLines) el.style.position = "relative";

        let splitter: GSAPSplitText;
        try {
            splitter = new GSAPSplitText(el, {
                type: splitType,
                absolute: absoluteLines,
                linesClass: "split-line",
            });
        } catch (error) {
            console.error("Failed to create SplitText:", error);
            return;
        }

        // Apply custom word styles after splitting
        if (splitType.includes("words") && highlightWords.length > 0) {
            applyWordStyles(splitter);
        }

        let targets: Element[];
        switch (splitType) {
            case "lines":
                targets = splitter.lines;
                break;
            case "words":
                targets = splitter.words;
                break;
            case "chars":
                targets = splitter.chars;
                break;
            case "words, chars":
                targets = splitter.chars;
                break;
            default:
                targets = splitter.chars;
        }

        if (!targets || targets.length === 0) {
            console.warn("No targets found for SplitText animation");
            splitter.revert();
            return;
        }

        targets.forEach((t) => {
            (t as HTMLElement).style.willChange = "transform, opacity";
        });

        const startPct = (1 - threshold) * 100;
        const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
        const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
        const marginUnit = marginMatch ? (marginMatch[2] || "px") : "px";
        const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
        const start = `top ${startPct}%${sign}`;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none",
                once: true,
                onToggle: (self) => {
                    scrollTriggerRef.current = self;
                },
            },
            smoothChildTiming: true,
            onComplete: () => {
                animationCompletedRef.current = true;
                gsap.set(targets, {
                    ...to,
                    clearProps: "willChange",
                    immediateRender: true,
                });
                onLetterAnimationComplete?.();
            },
        });

        tl.set(targets, { ...from, immediateRender: false, force3D: true });
        tl.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
        });

        return () => {
            tl.kill();
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            gsap.killTweensOf(targets);
            if (splitter) {
                splitter.revert();
            }
        };
    }, [
        text,
        delay,
        duration,
        ease,
        splitType,
        from,
        to,
        threshold,
        rootMargin,
        onLetterAnimationComplete,
        highlightWords,
        caseSensitive,
    ]);

    return (
        <p
            ref={ref}
            className={`split-parent overflow-visible inline-block whitespace-normal ${className}`}
            style={{
                textAlign,
                wordWrap: "break-word",
            }}
        >
            {text}
        </p>
    );
};

export default SplitText;
