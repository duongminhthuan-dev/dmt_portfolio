"use client"

import SFMono from "next/font/local";
import {useRouter} from "next/navigation";
import AppleGaramond from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
// import Button from "../../../ui/gallerybutton"
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

export default function Ananas() {
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
                            Mobile Software
                        </p>
                        <p className={`${appleGaramond.className} text-3xl -mt-2 text-[#BA0000]`}>
                            zeno
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <motion.div
                        className="bg-white/30 rounded-xl border border-gray-200"
                        style={{
                            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                            backdropFilter: "blur(4px)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="relative w-10/12 mx-auto aspect-[12/4]">

                            <div className="relative h-[85%]">
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
                        className="flex-1"
                        initial={{opacity:0, y:20}}
                        animate={{opacity:1, y:0}}
                        transition={{delay: 0.1}}
                    >
                        <div className="aspect-[5/2] bg-white/30 rounded-xl border-gray-200 border-1 flex"
                             style={{
                                 boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.15)",
                                 backdropFilter: "blur(4px)",
                             }}
                        >
                            <Image src={ananas2} alt="Ananas 2" className="object-cover scale-95 mx-auto" />
                        </div>
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
                            A React Native app connecting to an ESP32-based  smart watch, built for my Logic Design
                            Project course. I handled  the entire app development, from UI/UX design to coding.
                        </p>
                        <p className=" text-sm mb-3">
                            <span className={`${sfProDisplayMedium.className}`}>Tech stack: </span><span className={`${sfProDisplayLight.className}`}>React Native, Firebase, Figma</span>
                        </p>
                    </motion.div>

                    {/* Tạm ẩn Gallery Button
                    <motion.div
                        className="flex-1 rounded-xl flex items-start justify-center"
                        initial={{opacity:0, y:20}}
                        animate={{opacity:1, y:0}}
                        transition={{delay: 0.5}}
                    >
                        <div onClick={() => {
                            myRouter.push("/works/softwareengineering/zeno/gallery");
                        }}>
                            <Button />
                        </div>
                    </motion.div>
                    */}
                </div>
            </div>
        </div>
    )
}
