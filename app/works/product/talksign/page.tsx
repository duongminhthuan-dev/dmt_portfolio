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

export default function TalkSign() {
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
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)] p-4 flex flex-row w-full justify-center items-center">
                <div
                    className={`${sfMono.className} flex justify-center items-center gap-4 cursor-pointer text-sm`}
                    onClick={() => {
                        myRouter.back();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="12" viewBox="0 0 29 12" fill="none">
                        <path d="M28 6L1 6M1 6L6.14412 11M1 6L6.14412 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>BACK</p>
                </div>

                <div className={`${sfProDisplayLight.className} flex text-sm flex-col items-end w-full`}>
                    <p>Product & AI</p>
                    <p className={`${appleGaramond.className} text-3xl -mt-2 text-[#BA0000]`}>TalkSign</p>
                </div>
            </div>

            <div className="flex flex-col px-4 pb-28 gap-2">
                {/* Khung ảnh chính */}
                <motion.div
                    className="relative w-full aspect-[12/6] bg-white/30 rounded-xl border border-gray-200 overflow-hidden"
                    style={{
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <CldImage
                        src="talksign_thumb_1"
                        alt="TalkSign Overview"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className={`${sfProDisplayLight.className} flex flex-col items-start w-full text-sm my-3`}>
                        <span className={`font-bold mb-1`}>TalkSign - Real-Time Sign Language Translator</span>
                        An AI-powered assistive communication platform translating sign language gestures into text and
                        speech in real time, built for the Naver AI Hackathon Final Round. Taking charge of product
                        management and frontend engineering, I tackled low-latency camera recognition constraints and
                        accessible interaction patterns, delivering a seamless two-way dialogue flow from initial
                        concept to a functioning prototype.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
