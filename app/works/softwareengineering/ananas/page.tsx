"use client";

import SFMono from "next/font/local";
import { useRouter } from "next/navigation";
import AppleGaramond from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import { CldImage } from "next-cloudinary";

import { motion } from "motion/react";
import { useEffect } from "react";

const sfMono = SFMono({
    weight: "400",
    src: "../../../../public/fonts/SFMono-Regular.otf",
    variable: "--SFMono-Regular",
});

const appleGaramond = AppleGaramond({
    weight: "400",
    src: "../../../../public/fonts/AppleGaramond.ttf",
    variable: "--AppleGaramond",
});

const sfProDisplayLight = SFProDisplayLight({
    weight: "200",
    src: "../../../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
});

const sfProDisplayMedium = SFProDisplayMedium({
    weight: "600",
    src: "../../../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
});

export default function Ananas() {
    const myRouter = useRouter();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    return (
        <div className="h-screen overflow-y-auto scrollbar-hide overscroll-none">
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)] py-2.5 px-4 md:px-8 md:py-6">
                <div className="flex flex-row w-full justify-between items-center max-w-5xl lg:max-w-6xl mx-auto">
                    <div
                        className={`${sfMono.className} flex justify-center items-center gap-3 md:gap-4 cursor-pointer text-sm md:text-base select-none transition-transform hover:-translate-x-1 duration-150`}
                        onClick={() => {
                            myRouter.back();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="12" viewBox="0 0 29 12" fill="none">
                            <path d="M28 6L1 6M1 6L6.14412 11M1 6L6.14412 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>BACK</p>
                    </div>

                    <div className={`${sfProDisplayLight.className} flex text-sm md:text-base flex-col items-end md:items-start text-right md:text-left`}>
                        <p>Web Development</p>
                        <p className={`${appleGaramond.className} text-3xl md:text-5xl -mt-2 md:-mt-3 text-[#BA0000]`}>
                            Ananas
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-4 md:px-8 pb-20 md:pb-36 gap-2 md:gap-4 max-w-5xl lg:max-w-6xl mx-auto w-full text-left">
                {/* Main Overview Image (Top Image) */}
                <motion.div
                    className="bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                    style={{
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="relative w-full aspect-[16/9] md:aspect-[16/8] overflow-hidden">
                        <CldImage
                            src="ananas_top"
                            alt="Ananas Top Overview"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>
                </motion.div>

                {/* Description Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full text-left"
                >
                    <div className={`${sfProDisplayLight.className} flex flex-col items-start w-full text-sm md:text-base my-3 leading-relaxed text-left`}>
                        <span className="font-bold mb-1 md:text-lg text-left">Ananas - Ecommerce Website Redesign</span>
                        <p className="text-left w-full">
                            Redeveloped the Ananas website with a modern, responsive design and intuitive shopping experience.
                            Built as a Web Programming subject project, featuring a streamlined catalog layout, responsive product views, and interactive cart components.
                        </p>
                        <p className="text-sm md:text-base mt-2 text-left">
                            <span className={`${sfProDisplayMedium.className}`}>Tech stack: </span>
                            <span>React, Tailwind CSS, TypeScript</span>
                        </p>
                    </div>
                </motion.div>

                {/* Desktop Showcase 1 (Full Width) */}
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div
                        className="aspect-[16/9] md:aspect-[16/8] bg-white/30 rounded-xl md:rounded-2xl border-gray-200 border flex overflow-hidden relative"
                        style={{
                            boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        <CldImage
                            src="ananas_thumb_2"
                            alt="Ananas Storefront Desktop UI"
                            fill
                            className="object-cover scale-100 mx-auto"
                        />
                    </div>
                </motion.div>

                {/* Mobile Responsive Screens (Side by side) */}
                <div className="flex flex-row gap-2 md:gap-4">
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div
                            className="relative aspect-[3/4] md:aspect-[4/5] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                            style={{
                                boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            <CldImage
                                src="ananas_thumb_1"
                                alt="Ananas Mobile UI 1"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div
                            className="relative aspect-[3/4] md:aspect-[4/5] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                            style={{
                                boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            <CldImage
                                src="ananas_thumb_3"
                                alt="Ananas Mobile UI 2"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Desktop Showcase 2 (Full Width) */}
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div
                        className="aspect-[16/9] md:aspect-[16/8] bg-white/30 rounded-xl md:rounded-2xl border-gray-200 border flex overflow-hidden relative"
                        style={{
                            boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        <CldImage
                            src="ananas_thumb_4"
                            alt="Ananas Product Details Desktop UI"
                            fill
                            className="object-cover scale-100 mx-auto"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
