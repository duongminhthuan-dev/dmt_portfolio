"use client"

import { motion, AnimatePresence } from "motion/react";
import SFProDisplayLight from 'next/font/local';
import AppleGaramondItalic from "next/font/local";
import { useState, useEffect, useRef } from "react";
import AboutMeTimeLine from "@/app/ui/aboutmetimeline";
import dynamic from "next/dynamic";
import TPPopup from "@/app/ui/aboutmepopup/education-TPpopup";
import BKPopup from "@/app/ui/aboutmepopup/education-BKpopup";
import EngineerPopup from "@/app/ui/aboutmepopup/skill-engineer";
import MultimediaPopup from "@/app/ui/aboutmepopup/skill-multimedia"
import UIUXPopup from "@/app/ui/aboutmepopup/skill-uxui"

const sfProDisplayLight = SFProDisplayLight({
    src: "../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
})

const appleGaramondItalic = AppleGaramondItalic({
    src: "../../public/fonts/AppleGaramond-Italic.ttf",
    variable: "--AppleGaramondItalic",
})

const AboutMeFolderDynamic = dynamic(() => import("@/app/ui/aboutmefolder"), {
    ssr: false,

    loading: () => (
        <div className="h-[129px] w-[155px] rounded-xl bg-neutral-200/50 animate-pulse mx-auto" />
    ),
});

function AboutMe() {
    const [tpPopup, setTpPopup] = useState(false);
    const [bkPopup, setBkPopup] = useState(false);
    const [engineerPopup, setEngineerPopup] = useState(false);
    const [multimediaPopup, setMultimediaPopup] = useState(false);
    const [uxuiPopup, setUxuiPopup] = useState(false);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [showScrollHint, setShowScrollHint] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const update = () => {
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
            setShowScrollHint(!atBottom);
        };

        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <motion.div
            ref={scrollRef}
            className="scroll-snap overflow-x-hidden scrollbar-hide"
        >
            {/* Section 1: Hero Intro */}
            <div className={`h-screen flex flex-col justify-center -mt-20 md:-mt-12 items-center text-5xl md:text-6xl lg:text-7xl w-full overflow-hidden ${appleGaramondItalic.className}`}>
                <p className="color-word">About Me</p>
                <p className={`${sfProDisplayLight.className} mx-6 text-base md:text-lg lg:text-xl text-center mt-5 md:mt-8 max-w-2xl`}>
                    I’m Dương Minh Thuận. Here’s a quick look at my background, skills, and the <br className="hidden md:block" />experiences behind my work.
                </p>
            </div>

            {/* Section 2: Education */}
            <div className="h-screen w-full overflow-hidden flex flex-col justify-center items-center pb-[15%] md:pb-16 max-w-6xl mx-auto">
                <p className={`mt-5 ${appleGaramondItalic.className} text-4xl md:text-6xl text-center mb-5 md:mb-12 color-word`}>Education</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 lg:gap-24 w-full">
                    <div style={{ containIntrinsicSize: "129px 155px" }} className="p-4 md:p-6">
                        <AboutMeFolderDynamic
                            images={[
                                { src: "edu-tp-1", alt: "test" },
                                { src: "edu-tp-2", alt: "test" },
                                { src: "edu-tp-3", alt: "test" }
                            ]}
                            title={"Tan Phu High School"}
                            dateText="Aug ‘18 - May ‘21"
                            onClick={() => setTpPopup(true)}
                        />
                    </div>

                    <div style={{ containIntrinsicSize: "129px 155px" }} className="p-4 md:p-6">
                        <AboutMeFolderDynamic
                            images={[
                                { src: "edu-bk-1", alt: "test" },
                                { src: "edu-bk-2", alt: "test" },
                                { src: "edu-bk-3", alt: "test" }
                            ]}
                            title={"Bach Khoa University"}
                            dateText="Sep '21 - present"
                            onClick={() => setBkPopup(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Section 3: Skills */}
            <div className="h-screen w-full overflow-hidden flex flex-col justify-center items-center pb-[15%] md:pb-16 max-w-6xl mx-auto">
                <p className={`mt-5 ${appleGaramondItalic.className} text-4xl md:text-6xl text-center mb-5 md:mb-12 color-word`}>Skills</p>

                <div className="flex flex-col md:flex-row justify-center items-center md:gap-12 lg:gap-20 w-full">
                    {/* Folder 1: Product Management & Design */}
                    <div style={{ containIntrinsicSize: "129px 155px" }} className="p-4 relative -left-16 lg:left-0 md:static md:left-auto" >
                        <AboutMeFolderDynamic
                            images={[
                                { src: "uiux-1", alt: "test" },
                                { src: "uiux-2", alt: "test" },
                                { src: "uiux-3", alt: "test" }
                            ]}
                            title={"Product Management & Design"}
                            onClick={() => setUxuiPopup(true)}
                        />
                    </div>

                    {/* Folder 2: Software Engineering */}
                    <div style={{ containIntrinsicSize: "129px 155px" }} className="p-4 relative left-16 lg:left-0 -mt-6 md:static md:left-auto md:mt-0">
                        <AboutMeFolderDynamic
                            images={[
                                { src: "expo-fill", alt: "test" },
                                { src: "reactnative-fill", alt: "test" },
                                { src: "typescript-fill", alt: "test" }
                            ]}
                            title={"Software Engineering"}
                            onClick={() => setEngineerPopup(true)}
                        />
                    </div>

                    {/* Folder 3: Media Producer */}
                    <div style={{ containIntrinsicSize: "129px 155px" }} className="p-4 relative right-2 lg:left-0 -mt-6 md:static md:right-auto md:mt-0">
                        <AboutMeFolderDynamic
                            images={[
                                { src: "media-thumb-1", alt: "test" },
                                { src: "media-thumb-2", alt: "test" },
                                { src: "media-thumb-3", alt: "test" }
                            ]}
                            title={"Media Producer"}
                            onClick={() => setMultimediaPopup(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Section 4: Experience */}
            <div className="h-screen w-full overflow-hidden flex flex-col justify-center items-center pb-[25%] md:pb-16">
                <p className={`mt-5 ${appleGaramondItalic.className} text-4xl md:text-6xl text-center mb-5 md:mb-10 color-word`}>
                    Experience
                </p>
                <div className="w-full">
                    <AboutMeTimeLine />
                </div>
            </div>

            {/* Global Popups Portal */}
            <AnimatePresence>
                {tpPopup && <TPPopup onClose={() => setTpPopup(false)} />}
                {bkPopup && <BKPopup onClose={() => setBkPopup(false)} />}
                {uxuiPopup && <UIUXPopup onClose={() => setUxuiPopup(false)} />}
                {engineerPopup && <EngineerPopup onClose={() => setEngineerPopup(false)} />}
                {multimediaPopup && <MultimediaPopup onClose={() => setMultimediaPopup(false)} />}
            </AnimatePresence>
        </motion.div>
    )
}

export default AboutMe;
