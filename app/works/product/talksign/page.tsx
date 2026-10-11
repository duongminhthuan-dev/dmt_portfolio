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
        <div className="flex flex-col h-screen mx-4 py-4 gap-2">
            <div className="flex flex-row w-full justify-center items-center">
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

            <div className="flex flex-1 flex-col gap-2">
                <motion.div
                    className="h-56 bg-white/30 rounded-xl border-gray-200 border-1 relative overflow-hidden flex items-center justify-center"
                    style={{
                        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
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
                    className="h-fit bg-white/30 rounded-xl border-gray-200 border-1 px-4 flex flex-col mt-2"
                    style={{
                        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className={`${sfProDisplayLight.className} flex flex-col w-full text-sm mt-3`}>
                        An AI-powered web platform translating sign language into text and speech, built for the Naver AI Hackathon 2025 Final Round. Focused on accessible user experience, low-latency interaction, and streamlined camera recognition flows.
                    </p>
                    <p className="text-sm my-3">
                        <span className={`${sfProDisplayMedium.className}`}>Tech stack & Tools: </span>
                        <span className={`${sfProDisplayLight.className}`}>React, Naver Cloud Platform, MediaPipe, Figma</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
