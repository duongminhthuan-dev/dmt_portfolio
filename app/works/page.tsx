"use client"

import WorksCards from "@/app/ui/workscards";
import AppleGaramondItalic from "next/font/local";

import {motion} from "motion/react";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import MobileAppIcon from "@/app/ui/icon/mobileappicon";
import WebDevIcon from "@/app/ui/icon/webdevicon";
import MultimediaIcon from "@/app/ui/icon/multimediaicon";

const appleGaramondItalic = AppleGaramondItalic({
    weight:"400",
    src: "../../public/fonts/AppleGaramond-Italic.ttf",
    variable: "--AppleGaramondItalic",
})
function Works() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const myRouter = useRouter();

    // Khóa cuộn khi component mount, mở lại khi unmount
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden scrollbar-hide overscroll-none">
            <motion.p
                className={`absolute ${appleGaramondItalic.className} text-5xl md:text-7xl lg:text-8xl text-[#BA0000] top-1/12 md:top-16 left-1/2 -translate-x-1/2`}
            >
                Works
            </motion.p>

            <WorksCards
                icon={MobileAppIcon}
                title={"Product Management"}
                className="absolute left-1/2 -translate-x-[180px] md:-translate-x-[240px] lg:-translate-x-[270px] -translate-y-5 md:-translate-y-8 md:scale-110 lg:scale-120"
                flipClassName="absolute -translate-x-1/2 -translate-y-10 left-1/2 md:scale-110 lg:scale-120"
                rotate={4}
                isDimmed={activeIdx !== null && activeIdx !== 0}
                onToggle={() =>
                    setActiveIdx((cur) => (cur === 0 ? null : 0))
                }
                onClick={() => myRouter.push("/works/product")}
                z={20}
                flipZ={30}
                flipDurationMs={500}
            />

            <WorksCards
                icon={WebDevIcon}
                title={"Software Engineering"}
                className="absolute left-1/2 -translate-x-[90px] md:-translate-x-[120px] lg:-translate-x-[135px] -translate-y-12 md:-translate-y-16 z-10 md:scale-110 lg:scale-120"
                flipClassName="absolute -translate-x-1/2 -translate-y-10 left-1/2 z-30 md:scale-110 lg:scale-120"
                rotate={0}
                isDimmed={activeIdx !== null && activeIdx !== 1}
                onToggle={() =>
                    setActiveIdx((cur) => (cur === 1 ? null : 1))
                }
                onClick={() => myRouter.push("/works/softwareengineering")}
                z={10}
                flipZ={30}
                flipDurationMs={500}
            />

            <WorksCards
                icon={MultimediaIcon}
                title={"Media Producer"}
                className="absolute left-1/2 -translate-x-[10px] md:-translate-x-[10px] lg:-translate-x-[10px] md:scale-110 lg:scale-120"
                flipClassName="absolute -translate-x-1/2 -translate-y-10 left-1/2 z-20 md:scale-110 lg:scale-120"
                rotate={-10}
                isDimmed={activeIdx !== null && activeIdx !== 2}
                onToggle={() =>
                    setActiveIdx((cur) => (cur === 2 ? null : 2))
                }
                onClick={() => myRouter.push("/works/multimediaprod")}
                z={0}
                flipZ={30}
                flipDurationMs={500}
            />
        </div>
    );
}

export default Works;
