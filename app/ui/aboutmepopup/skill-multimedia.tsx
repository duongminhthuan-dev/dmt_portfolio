import { motion } from "motion/react";
import { useEffect } from "react";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

const sfProDisplayLight = SFProDisplayLight({
    weight: "200",
    src: "../../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
})

const sfProDisplayMedium = SFProDisplayMedium({
    weight: "600",
    src: "../../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
})

const cardStyle = {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 10%, rgba(245,245,245,0.95) 65%, rgba(255,255,255,0.95) 98%)',
}

const buttonStyle = {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 15%, rgba(235,235,235,0.95) 50%, rgba(235,235,235,0.95) 65%, rgba(255,255,255,0.95) 98.08%)',
}

// Lớp nền: animate độ mờ và màu nền thay vì animate opacity,
// để phần tử có backdrop-filter không bao giờ bị animate opacity.
const backdropHidden = { backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(0px)" }
const backdropShown = { backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(16px)" }

function MultimediaPopup({ onClose }: { onClose: () => void }) {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 w-full h-screen h-[100dvh] z-[70] overflow-hidden"
            initial={backdropHidden}
            animate={backdropShown}
            exit={backdropHidden}
            transition={{ ease: "easeInOut", duration: 0.2 }}
        >
            {/* Lớp nội dung: chỉ lớp này fade opacity, và bên trong nó không có backdrop-filter nào */}
            <motion.div
                className="w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
            >
                <div
                    className="w-[90%] h-full max-h-[100dvh] mx-auto relative flex items-center justify-center py-4"
                >
                    <div className="flex flex-col gap-3 justify-center items-center h-[72dvh] md:h-[50dvh] w-full md:w-10/12 lg:w-6/12">
                        <div className="flex flex-row gap-3 h-8/12 w-full">
                            <motion.div
                                className="relative w-1/2 h-full shadow-lg rounded-xl p-3"
                                style={cardStyle}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.05 }}
                            >
                                <p className={`${sfProDisplayMedium.className} text-sm md:text-lg`}>Photography</p>
                                <p className={`${sfProDisplayLight.className} text-xs md:text-base mt-1`}>Camera operation, shot framing & composition, basic lighting setup</p>
                            </motion.div>

                            <motion.div
                                className="relative w-1/2 h-full shadow-lg rounded-xl p-3"
                                style={cardStyle}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
                            >
                                <p className={`${sfProDisplayMedium.className} text-sm md:text-lg`}>Film & video</p>
                                <p className={`${sfProDisplayLight.className} text-xs md:text-base mt-1`}>Camera operation, storyboarding & shot planning</p>
                            </motion.div>
                        </div>

                        <motion.div
                            className="relative w-full h-4/12 shadow-lg rounded-xl p-3"
                            style={cardStyle}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ ease: "easeInOut", duration: 0.2, delay: 0.15 }}
                        >
                            <p className={`${sfProDisplayMedium.className} text-sm md:text-lg`}>Post-production</p>
                            <p className={`${sfProDisplayLight.className} text-xs md:text-base mt-1`}>Lightroom, Photoshop, Premiere Pro</p>
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none">
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="pointer-events-auto absolute bottom-4 md:bottom-[3%] left-1/2 transform -translate-x-1/2 p-3 rounded-full z-10 border-1 border-[#DBDBDB] shadow-xl hover:scale-105 active:scale-95 transition-all"
                            style={buttonStyle}
                        >
                            <HugeiconsIcon
                                icon={Cancel01Icon}
                                size={24}
                                color="#000000"
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Lớp bắt click để đóng popup (nằm sau lớp nội dung, nhận click xuyên qua pointer-events-none) */}
            <div className="absolute top-0 left-0 w-full h-full -z-10" onClick={onClose} />
        </motion.div>
    )
}

export default MultimediaPopup;
