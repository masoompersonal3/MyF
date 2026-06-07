import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface LetterState {
    char: string;
    isMatrix: boolean;
    isSpace: boolean;
}

interface MatrixTextProps {
    text?: string;
    className?: string;
    initialDelay?: number;
    letterAnimationDuration?: number;
    letterInterval?: number;
}

export const MatrixText = ({
    text = "HelloWorld!",
    className,
    initialDelay = 200,
    letterAnimationDuration = 500,
    letterInterval = 20,
}: MatrixTextProps) => {
    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        }))
    );
    const [isAnimating, setIsAnimating] = useState(false);

    const getRandomChar = useCallback(
        () => (Math.random() > 0.5 ? "1" : "0"),
        []
    );

    const animateLetter = useCallback(
        (index: number) => {
            if (index >= text.length) return;

            requestAnimationFrame(() => {
                setLetters((prev) => {
                    const newLetters = [...prev];
                    if (!newLetters[index].isSpace) {
                        newLetters[index] = {
                            ...newLetters[index],
                            char: getRandomChar(),
                            isMatrix: true,
                        };
                    }
                    return newLetters;
                });

                setTimeout(() => {
                    setLetters((prev) => {
                        const newLetters = [...prev];
                        newLetters[index] = {
                            ...newLetters[index],
                            char: text[index],
                            isMatrix: false,
                        };
                        return newLetters;
                    });
                }, letterAnimationDuration);
            });
        },
        [getRandomChar, text, letterAnimationDuration]
    );

    const startAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                setIsAnimating(false);
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            setTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, isAnimating, letterInterval]);

    useEffect(() => {
        const timer = setTimeout(startAnimation, initialDelay);
        return () => clearTimeout(timer);
    }, []);

    const motionVariants = useMemo(
        () => ({
            matrix: {
                color: "#eab308", // match the yellow circle
                textShadow: "0 2px 4px rgba(234, 179, 8, 0.5)",
            },
            normal: {
                color: "inherit"
            }
        }),
        []
    );

    return (
        <div
            className={cn(
                "flex items-center justify-center text-white",
                className
            )}
            aria-label="Matrix text animation"
        >
            <div className="flex flex-wrap items-center justify-center">
                {letters.map((letter, index) => (
                    <motion.span
                        key={`${index}-${letter.char}`}
                        className="font-black text-center overflow-visible inline-block"
                        initial="initial"
                        animate={letter.isMatrix ? "matrix" : "normal"}
                        variants={motionVariants}
                        transition={{
                            duration: 0.1,
                            ease: "easeInOut",
                        }}
                        style={{
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {letter.isSpace ? "\u00A0" : letter.char}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};
