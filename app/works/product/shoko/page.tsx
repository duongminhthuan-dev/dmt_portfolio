"use client"

import SFMono from "next/font/local";
import {useRouter} from "next/navigation";
import AppleGaramond from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import Button from "../../../ui/gallerybutton";
import ananas2 from "@/public/images/projects/ananas/overview2.webp";
import ananas3 from "@/public/images/projects/ananas/overview3.webp";
import ananas4 from "@/public/images/projects/ananas/overview4.png";

import Image from "next/image";
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
        <div className="h-screen overflow-hidden">
            <div className="flex flex-col h-full p-4 gap-2 scrollbar-hide overscroll-none">
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
                        <p>
                            Product & Design
                        </p>
                        <p className={`${appleGaramond.className} text-3xl -mt-2 text-[#BA0000]`}>
                            Shoko
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {/* Khung ảnh chính: tùy chỉnh tỷ lệ aspect-[...] tại đây, ảnh sẽ tự fill kín 100% khung */}
                    <motion.div
                        className="relative w-full aspect-[12/5] bg-white/30 rounded-xl border border-gray-200 overflow-hidden"
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
                        className="relative w-full aspect-[12/3] bg-white/30 rounded-xl border border-gray-200 overflow-hidden"
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

                    <div className="flex flex-row gap-2">
                        <motion.div className="flex-1"
                                    initial={{opacity:0, y:20}}
                                    animate={{opacity:1, y:0}}
                                    transition={{delay: 0.2}}
                        >
                            <div className="aspect-[3/2] bg-white/30 rounded-xl"
                                 style={{
                                     boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                     backdropFilter: "blur(4px)",
                                 }}
                            >
                                <Image
                                    src={ananas3}
                                    alt=""
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </motion.div>

                        <motion.div className="flex-1"
                                    initial={{opacity:0, y:20}}
                                    animate={{opacity:1, y:0}}
                                    transition={{delay: 0.3}}
                        >
                            <div className="relative aspect-[3/2] bg-white/30 rounded-xl"
                                 style={{
                                     boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                     backdropFilter: "blur(4px)",
                                 }}
                            >
                                <Image
                                    src={ananas4}
                                    alt=""
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="h-fit bg-white/30 rounded-xl border-gray-200 border-1 px-4 flex flex-col"
                        style={{
                            boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                            backdropFilter: "blur(4px)",
                        }}
                        initial={{opacity:0, y:20}}
                        animate={{opacity:1, y:0}}
                        transition={{delay: 0.4}}
                    >
                        <p className={`${sfProDisplayLight.className} flex flex-col items-end w-full text-sm mt-3`}>
                            Product design, user research, and comprehensive UX/UI flows for Shoko. Designed to optimize user journeys and elevate intuitive digital interactions.
                        </p>
                        <p className=" text-sm mb-3">
                            <span className={`${sfProDisplayMedium.className}`}>Role & Tools: </span><span className={`${sfProDisplayLight.className}`}>Product Design, Figma, User Flow, Wireframing</span>
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex-1 rounded-xl flex items-start justify-center"
                        initial={{opacity:0, y:20}}
                        animate={{opacity:1, y:0}}
                        transition={{delay: 0.5}}
                    >
                        <div onClick={() => {
                            myRouter.push("/works/product/shoko/gallery");
                        }}>
                            <Button />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
