"use client"

import SFMono from "next/font/local";
import {useRouter} from "next/navigation";
import AppleGaramond from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import { motion } from "motion/react";
import { useEffect } from "react";
import { CldImage } from "next-cloudinary";

const sfMono = SFMono({
    weight: "400",
    src: "../../../../public/fonts/SFMono-Regular.otf",
    variable: "--SFMono-Regular",
});

const appleGaramond = AppleGaramond({
    weight:"400",
    src: "../../../../public/fonts/AppleGaramond.ttf",
    variable: "--AppleGaramond",
});

const sfProDisplayLight = SFProDisplayLight({
    weight:"200",
    src: "../../../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
});

const sfProDisplayMedium = SFProDisplayMedium({
    weight:"600",
    src: "../../../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
});

export default function Shoko() {
    const myRouter = useRouter();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);
    
    return (
        <div className="h-screen overflow-y-auto scrollbar-hide overscroll-none">
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)] p-4 md:px-8 md:py-6">
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
                        <p>Product & Design</p>
                        <p className={`${appleGaramond.className} text-3xl md:text-5xl -mt-2 md:-mt-3 text-[#BA0000]`}>Shoko</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-4 md:px-8 pb-28 md:pb-36 gap-2 md:gap-4 max-w-5xl lg:max-w-6xl mx-auto w-full text-left">
                {/* Khung ảnh chính */}
                <motion.div
                    className="relative w-full aspect-[12/5] md:aspect-[16/7] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                    style={{
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <CldImage
                        src="shoko_1"
                        alt="Shoko Overview"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: 0.4}}
                    className="w-full text-left"
                >
                    <div className={`${sfProDisplayLight.className} flex flex-col items-start w-full text-sm md:text-base my-3 leading-relaxed text-left`}>
                        <span className="font-bold mb-1 md:text-lg text-left">Shoko - Self-Service Library Kiosk</span>
                        <p className="text-left w-full">
                            A self-service kiosk system designed to modernize library workflows. Taking full ownership,
                            I researched patron behavior in public to shape the product, tackled physical-digital
                            constraints, and delivered both the hardware setup and touch UI from initial idea to working reality.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="relative w-full aspect-[12/3] md:aspect-[16/5] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                    style={{
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <CldImage
                        src="shoko_5"
                        alt="Shoko 2"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <div className="flex flex-row gap-2 md:gap-4">
                    <motion.div className="flex-1"
                                initial={{opacity:0, y:20}}
                                animate={{opacity:1, y:0}}
                                transition={{delay: 0.2}}
                    >
                        <div className="relative aspect-[3/2] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                             style={{
                                 boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                 backdropFilter: "blur(4px)",
                             }}
                        >
                            <CldImage
                                src="shoko_6"
                                alt="Shoko 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div className="flex-1"
                                initial={{opacity:0, y:20}}
                                animate={{opacity:1, y:0}}
                                transition={{delay: 0.3}}
                    >
                        <div className="relative aspect-[3/2] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                             style={{
                                 boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                 backdropFilter: "blur(4px)",
                             }}
                        >
                            <CldImage
                                src="shoko_8"
                                alt="Shoko 4"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: 0.4}}
                    className="w-full text-left"
                >
                    <div className={`${sfProDisplayLight.className} flex flex-col items-start w-full text-sm md:text-base my-3 leading-relaxed text-left`}>
                        <span className="font-bold mb-1 md:text-lg text-left">Built for easy public use.</span>
                        <p className="text-left w-full">
                            Features centered controls for both left- and right-handed readers, paired with oversized touch targets and
                            high-contrast text optimized for varying lighting and viewing angles.
                        </p>
                    </div>
                </motion.div>

                <div className="flex flex-row gap-2 md:gap-4">
                    <motion.div className="flex-1"
                                initial={{opacity:0, y:20}}
                                animate={{opacity:1, y:0}}
                                transition={{delay: 0.2}}
                    >
                        <div className="relative aspect-[3/2] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                             style={{
                                 boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                 backdropFilter: "blur(4px)",
                             }}
                        >
                            <CldImage
                                src="shoko_10"
                                alt="Shoko 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div className="flex-1"
                                initial={{opacity:0, y:20}}
                                animate={{opacity:1, y:0}}
                                transition={{delay: 0.3}}
                    >
                        <div className="relative aspect-[3/2] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                             style={{
                                 boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                 backdropFilter: "blur(4px)",
                             }}
                        >
                            <CldImage
                                src="shoko_7"
                                alt="Shoko 4"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: 0.4}}
                    className="w-full text-left"
                >
                    <div className={`${sfProDisplayLight.className} flex flex-col items-start w-full text-sm md:text-base my-3 leading-relaxed text-left`}>
                        <span className="font-bold mb-1 md:text-lg text-left">Instant Multi-Book Scanning.</span>
                        <p className="text-left w-full">
                            Instead of scanning barcodes one by one, the system detects multiple RFID books at once.
                            The screen gives immediate feedback, clearly showing valid, overdue, or restricted items.
                        </p>
                    </div>
                </motion.div>

                <div className="flex flex-row gap-2 md:gap-4">
                    <motion.div className="flex-1"
                                initial={{opacity:0, y:20}}
                                animate={{opacity:1, y:0}}
                                transition={{delay: 0.2}}
                    >
                        <div className="relative aspect-[3/2] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                             style={{
                                 boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                 backdropFilter: "blur(4px)",
                             }}
                        >
                            <CldImage
                                src="shoko_11"
                                alt="Shoko 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div className="flex-1"
                                initial={{opacity:0, y:20}}
                                animate={{opacity:1, y:0}}
                                transition={{delay: 0.3}}
                    >
                        <div className="relative aspect-[3/2] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                             style={{
                                 boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                 backdropFilter: "blur(4px)",
                             }}
                        >
                            <CldImage
                                src="shoko_12"
                                alt="Shoko 4"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="relative w-full aspect-[12/3] md:aspect-[16/5] bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                    style={{
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <CldImage
                        src="shoko_2"
                        alt="Shoko 2"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: 0.4}}
                    className="w-full text-left"
                >
                    <div className={`${sfProDisplayLight.className} flex flex-col items-start w-full text-sm md:text-base my-3 leading-relaxed text-left`}>
                        <span className="font-bold mb-1 md:text-lg text-left">Fast, Zero-Training Flow.</span>
                        <p className="text-left w-full">
                            Simple enough for anyone to use without instructions: identify account, place books on
                            the plate, and confirm. The entire checkout takes less than 1 minutes for new-comers.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
