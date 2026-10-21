"use client";

import AppleGaramondItalic from "next/font/local";
import {motion} from "motion/react";
import SFMono from "next/font/local";
import {useRouter} from "next/navigation";
import { useEffect } from "react";
import Stack from "@/app/ui/stackcard-mobile";

const appleGaramondItalic = AppleGaramondItalic({
    weight:"400",
    src: "../../../public/fonts/AppleGaramond-Italic.ttf",
    variable: "--AppleGaramondItalic",
})

const sfMono = SFMono({
    weight: "400",
    src: "../../../public/fonts/SFMono-Regular.otf",
    variable: "--SFMono-Regular",
});

function SoftwareEngineering() {
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
        <div className="h-screen flex flex-col justify-between">
            <div>
                <motion.p
                    className={`${appleGaramondItalic.className} text-4xl md:text-5xl lg:text-6xl text-[#BA0000] mt-12 md:mt-16 w-full text-center`}
                >
                    Software Engineering
                </motion.p>

                <div
                    className={`${sfMono.className} flex justify-center items-center gap-3 md:gap-4 mt-3 md:mt-4 cursor-pointer text-sm md:text-base select-none transition-transform hover:-translate-x-1 duration-150`}
                    onClick={() => {
                        myRouter.back();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="12" viewBox="0 0 29 12" fill="none">
                        <path d="M28 6L1 6M1 6L6.14412 11M1 6L6.14412 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>BACK</p>
                </div>
            </div>

            <motion.div
                className="my-auto -translate-y-16 md:-translate-y-12 flex justify-center items-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <div className="w-[280px] h-[400px] md:w-[350px] md:h-[480px] lg:w-[380px] lg:h-[520px]">
                    <Stack
                        randomRotation={true}
                        sensitivity={180}
                        sendToBackOnClick={true}
                    />
                </div>
            </motion.div>
            <div className="h-10" />
        </div>
    )
}

export default SoftwareEngineering;
