import { motion } from "motion/react";
import { useEffect } from "react";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import { CldImage } from "next-cloudinary";
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

function EngineerPopup({ onClose }: { onClose: () => void }) {
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
                        <div className="flex flex-row gap-3 h-3/4 w-full">
                            {/* `relative` ở các card có sticker để sticker (absolute) bám theo card, không bám theo phần tử ngoài */}
                            <motion.div
                                className="relative w-7/12 h-full shadow-lg rounded-xl p-3"
                                style={cardStyle}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.05 }}
                            >
                                <p className={`${sfProDisplayMedium.className} text-sm md:text-lg`}>Mobile Software Engineering</p>
                                <p className={`${sfProDisplayLight.className} text-xs md:text-base mt-1`}>React Native, TypeScript, Nativewind, Expo (ShopBack, Zeno)</p>

                                <CldImage src="typescript" height={80} width={80} alt={"TypeScript"} className="absolute bottom-0 left-0 drop-shadow-lg -rotate-5" />
                                <CldImage src="expo" height={90} width={90} alt={"Expo"} className="absolute bottom-5 left-1/6 drop-shadow-md rotate-6" />
                                <CldImage src="reactnative" height={100} width={100} alt={"React Native"} className="absolute bottom-0 left-1/3 drop-shadow-md rotate-3 z-20" />
                                <CldImage src="nativewind" height={90} width={90} alt={"Nativewind"} className="absolute bottom-2 right-0 drop-shadow-md -rotate-8" />
                            </motion.div>

                            <div className="flex flex-col gap-3 w-5/12 h-full">
                                <motion.div
                                    className="relative w-full h-1/2 shadow-lg rounded-xl p-3"
                                    style={cardStyle}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
                                >
                                    <p className={`${sfProDisplayMedium.className} text-sm md:text-lg`}>Web & Modern Frontend</p>
                                    <p className={`${sfProDisplayLight.className} text-xs md:text-base mt-1`}>ReactJS, Next.js, TypeScript, Tailwind, Motion</p>

                                    <CldImage src="typescript" height={60} width={60} alt={"TypeScript"} className="absolute bottom-0 left-0 drop-shadow-lg -rotate-5" />
                                    <CldImage src="react" height={70} width={70} alt={"React"} className="absolute bottom-6 left-[10%] drop-shadow-md rotate-6" />
                                    <CldImage src="nextjs" height={90} width={90} alt={"Next.js"} className="absolute bottom-0 left-[20%] drop-shadow-md rotate-3 z-20" />
                                    <CldImage src="tailwind" height={90} width={90} alt={"Tailwind"} className="absolute bottom-6 right-[5%] drop-shadow-md -rotate-5" />
                                    <CldImage src="motion" height={60} width={60} alt={"Motion"} className="absolute bottom-2 right-0 drop-shadow-md -rotate-8" />
                                </motion.div>

                                <motion.div
                                    className="relative w-full h-1/2 shadow-lg rounded-xl p-3"
                                    style={cardStyle}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ ease: "easeInOut", duration: 0.2, delay: 0.15 }}
                                >
                                    <p className={`${sfProDisplayMedium.className} text-sm md:text-lg`}>System & Connectivity</p>
                                    <p className={`${sfProDisplayLight.className} text-xs md:text-base mt-1`}>RESTful APIs, BLE (ESP32), Firebase Realtime, Cloud AI</p>

                                    <CldImage src="bluetooth" height={80} width={80} alt={"Bluetooth"} className="absolute bottom-0 left-0 drop-shadow-lg -rotate-5" />
                                    <CldImage src="firebase" height={90} width={90} alt={"Firebase"} className="absolute bottom-5 left-1/6 drop-shadow-md rotate-6" />
                                    <CldImage src="restapi" height={90} width={90} alt={"REST API"} className="absolute bottom-0 left-1/3 drop-shadow-md rotate-3 z-20" />
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            className="relative w-full h-1/4 shadow-lg rounded-xl p-3"
                            style={cardStyle}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ ease: "easeInOut", duration: 0.2, delay: 0.2 }}
                        >
                            <p className={`${sfProDisplayMedium.className} text-sm md:text-lg`}>Engineering Architecture</p>
                            <p className={`${sfProDisplayLight.className} text-xs md:text-base mt-1`}>Component lifecycle, state management, in-app UX performance & responsive interfaces</p>
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

export default EngineerPopup;
