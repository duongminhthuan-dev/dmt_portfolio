"use client";

import AppleGaramond from 'next/font/local';
import { motion } from "motion/react";
import Button from "@/app/ui/button";
import Image from "next/image";
import SplitText from "./splittext";
import { useEffect } from "react";
import TransitionLink from "@/utils/transitionlink";

const appleGaramond = AppleGaramond({
  weight:"400",
  src: "../public/fonts/AppleGaramond.ttf",
  variable: "--AppleGaramond",
})

export default function Home() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden scrollbar-hide overscroll-none justify-center items-center">
            <motion.div
                className="antialiased h-screen w-full flex flex-col items-center justify-center overflow-hidden scrollbar-hide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key="home-page"
            >
                <motion.div
                    className={`${appleGaramond.className} flex flex-col md:flex-row items-center justify-center md:justify-center max-w-5xl xl:max-w-7xl w-full h-full px-6 md:px-12 lg:px-16 gap-5 md:gap-16 -translate-y-8 md:translate-y-0`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
                >
                    {/* Text & Button Column */}
                    <div className="flex flex-col items-center md:items-start order-2 md:order-1 text-center md:text-left gap-4 md:gap-8 max-w-xl lg:max-w-2xl">
                        <div className="text-[28px] md:text-4xl lg:text-[44px] xl:text-5xl leading-tight pb-1 md:pb-3">
                            <SplitText
                                text="I am an interface designer, a product builder, a software developer, and sometimes a photographer."
                                splitType="words"
                                highlightWords={['designer', 'builder', 'developer', 'photographer']}
                                delay={150}
                                className="text-2xl md:text-4xl lg:text-[44px] xl:text-5xl"
                            />
                        </div>
                        <motion.div
                            className="w-fit h-fit"
                            initial={{ opacity: 0, transform: "translateY(20px)" }}
                            animate={{ opacity: 1, transform: "translateY(0px)" }}
                            exit={{opacity: 0, transform: "translateX(-60px)" }}
                            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                        >
                            <TransitionLink href="/aboutme" className="block w-fit">
                                <Button />
                            </TransitionLink>
                        </motion.div>
                    </div>

                    {/* Image Column */}
                    <motion.div
                        className="relative w-[190px] md:w-[300px] lg:w-[360px] aspect-[2/3] -rotate-[5deg] order-1 md:order-2 flex-shrink-0"
                        initial={{ opacity: 0, transform: "translateY(20px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                    >
                        <Image
                            src="/images/HomeImage.webp"
                            alt="Home image"
                            fill
                            className="object-cover object-center"
                            style={{boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.25), 0 4px 15px 0 rgba(0, 0, 0, 0.25)"}}
                            priority
                        />
                        <div className="absolute rotate-5 h-5 md:h-7 top-36 md:top-56 -left-2 md:-left-3 aspect-square bg-[#BA0000] z-10"/>
                        <div className="absolute rotate-5 h-5 md:h-7 -bottom-2 md:-bottom-3 -right-2 md:-right-3 aspect-square bg-[#BA0000] z-10"/>
                        <div className="absolute rotate-5 h-5 md:h-7 top-10 md:top-14 -right-6 md:-right-8 aspect-[3/1] bg-[#BA0000] z-10"/>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
