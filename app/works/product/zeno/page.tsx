"use client"

import SFMono from "next/font/local";
import {useRouter} from "next/navigation";
import AppleGaramond from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import ananas1 from "@/public/images/projects/ananas/overview1.png";
import ananas2 from "@/public/images/projects/ananas/overview2.webp";
import ananas3 from "@/public/images/projects/ananas/overview3.webp";
import ananas4 from "@/public/images/projects/ananas/overview4.png";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect } from "react";

const sfMono = SFMono({
    weight: "400",
    src: "../../../../public/fonts/SFMono-Regular.otf",
    variable: "--SFMono-Regular",
});

const appleGaramond = AppleGaramond({
    weight:"400",
    src: "../../../../public/fonts/AppleGaramond.ttf",
    variable: "--AppleGaramond",
})

const sfProDisplayLight = SFProDisplayLight({
    weight:"200",
    src: "../../../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
})

const sfProDisplayMedium = SFProDisplayMedium({
    weight:"600",
    src: "../../../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
})

export default function Zeno() {
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
                        <p>Mobile Software</p>
                        <p className={`${appleGaramond.className} text-3xl md:text-5xl -mt-2 md:-mt-3 text-[#BA0000]`}>
                            zeno
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-4 md:px-8 pb-28 md:pb-36 gap-2 md:gap-4 max-w-5xl lg:max-w-6xl mx-auto w-full text-left">
                <motion.div
                    className="bg-white/30 rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden"
                    style={{
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="relative w-10/12 mx-auto aspect-[12/4] md:aspect-[16/5]">
                        <div className="relative h-[85%] md:h-[90%]">
                            <Image
                                src={ananas1}
                                alt="Ananas 1"
                                fill
                                className="object-cover object-bottom"
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: 0.4}}
                    className="w-full text-left"
                >
                    <div className={`${sfProDisplayLight.className} flex flex-col items-start w-full text-sm md:text-base my-3 leading-relaxed text-left`}>
                        <span className="font-bold mb-1 md:text-lg text-left">zeno - Smartwatch Companion App</span>
                        <p className="text-left w-full">
                            A companion mobile app built to communicate and synchronize with an ESP32-based custom smartwatch,
                            developed for the Logic Design Project course. Taking end-to-end ownership, I led the product from UI/UX
                            ideation in Figma to full-stack mobile development—handling Bluetooth Low Energy (BLE) connectivity,
                            real-time telemetry syncing, and intuitive companion features for everyday wearable use.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="flex-1"
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: 0.1}}
                >
                    <div className="aspect-[5/2] md:aspect-[16/6] bg-white/30 rounded-xl md:rounded-2xl border-gray-200 border flex overflow-hidden"
                         style={{
                             boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                             backdropFilter: "blur(4px)",
                         }}
                    >
                        <Image src={ananas2} alt="Ananas 2" className="object-cover scale-95 mx-auto" />
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
                            <Image
                                src={ananas3}
                                alt=""
                                fill
                                className="object-contain p-2 md:p-4"
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
                            <Image
                                src={ananas4}
                                alt=""
                                fill
                                className="object-contain p-2 md:p-4"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
