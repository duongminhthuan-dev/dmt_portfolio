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

function UIUXPopup({ onClose }: { onClose: () => void }) {
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
                        {/* Top Row: Product Discovery & Requirements Analysis */}
                        <div className="flex flex-row gap-3 h-1/2 w-full">
                            <motion.div
                                className="relative w-1/2 h-full shadow-lg rounded-xl p-2.5 md:p-3.5 flex flex-col justify-between"
                                style={cardStyle}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.05 }}
                            >
                                <div>
                                    <p className={`${sfProDisplayMedium.className} text-xs md:text-lg text-[#222222]`}>Product Discovery & Scoping</p>
                                    <p className={`${sfProDisplayLight.className} text-[11px] md:text-base text-[#555555] mt-0.5 md:mt-1 leading-tight md:leading-normal`}>
                                        Problem definition, user workflow mapping, end-to-end journey definition & key failure scenario planning.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1 md:mt-2 text-[9px] md:text-sm">
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Workflows</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Edge Cases</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>User Journey</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="relative w-1/2 h-full shadow-lg rounded-xl p-2.5 md:p-3.5 flex flex-col justify-between"
                                style={cardStyle}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.08 }}
                            >
                                <div>
                                    <p className={`${sfProDisplayMedium.className} text-xs md:text-lg text-[#222222]`}>Requirements & Agile BA</p>
                                    <p className={`${sfProDisplayLight.className} text-[11px] md:text-base text-[#555555] mt-0.5 md:mt-1 leading-tight md:leading-normal`}>
                                        Translating product goals into user stories, measurable acceptance criteria, and system protocol specifications (SIP2, APIs).
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1 md:mt-2 text-[9px] md:text-sm">
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>User Stories</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Acceptance Criteria</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Agile / Scrum</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom Row: UI/UX Design & Prototyping */}
                        <div className="flex flex-row gap-3 h-1/2 w-full">
                            <motion.div
                                className="relative w-1/2 h-full shadow-lg rounded-xl p-2.5 md:p-3.5 flex flex-col justify-between"
                                style={cardStyle}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.12 }}
                            >
                                <div>
                                    <p className={`${sfProDisplayMedium.className} text-xs md:text-lg text-[#222222]`}>UI/UX & Prototyping</p>
                                    <p className={`${sfProDisplayLight.className} text-[11px] md:text-base text-[#555555] mt-0.5 md:mt-1 leading-tight md:leading-normal`}>
                                        Information architecture, wireframing, interactive prototyping in Figma, and self-service interface design.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1 md:mt-2 text-[9px] md:text-sm">
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Figma</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Design Systems</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Prototyping</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="relative w-1/2 h-full shadow-lg rounded-xl p-2.5 md:p-3.5 flex flex-col justify-between"
                                style={cardStyle}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.15 }}
                            >
                                <div>
                                    <p className={`${sfProDisplayMedium.className} text-xs md:text-lg text-[#222222]`}>User Recovery & Validation</p>
                                    <p className={`${sfProDisplayLight.className} text-[11px] md:text-base text-[#555555] mt-0.5 md:mt-1 leading-tight md:leading-normal`}>
                                        Designing clear system feedback, empty states, and intuitive error-recovery flows to minimize transaction confusion.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1 md:mt-2 text-[9px] md:text-sm">
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Feedback Loops</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Usability</span>
                                    <span className={`${sfProDisplayLight.className} bg-black/5 text-[#444444] px-1.5 md:px-2 py-0.5 rounded-md`}>Validation</span>
                                </div>
                            </motion.div>
                        </div>
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

export default UIUXPopup;
