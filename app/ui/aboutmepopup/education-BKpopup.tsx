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

function BKPopup({ onClose }: { onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [])

    return (
        <motion.div
            className="fixed inset-0 w-full h-screen bg-white/50 z-[70] backdrop-blur-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
        >
            <div
                className="w-[300px] md:w-[440px] lg:w-[480px] h-full max-h-screen mx-auto relative flex items-center justify-center py-4"
            >
                <div className="relative w-full h-[600px] md:h-[720px] lg:h-[760px] max-h-[85vh]">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.2 }}
                        className="absolute left-0 md:left-3 top-0 md:-top-3"
                    >
                        <CldImage
                            src="edu-bk-1"
                            height={300}
                            width={300}
                            alt={"Bach Khoa 1"}
                            className="w-[150px] md:w-[220px] lg:w-[240px] h-auto rounded-lg shadow-lg"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
                        className="absolute top-[3%] right-0 md:-top-8 md:right-3"
                    >
                        <CldImage
                            src="edu-bk-2"
                            height={320}
                            width={320}
                            alt={"Bach Khoa 2"}
                            className="w-[160px] md:w-[220px] lg:w-[240px] h-auto rounded-lg shadow-lg"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.2 }}
                        className="flex absolute top-[41%] items-center left-0 transform -translate-y-1/2 bg-white px-4 md:px-6 py-4 md:py-5 rounded-xl w-full shadow-2xl z-20"
                    >
                        <div>
                            <p className={`${sfProDisplayMedium.className} text-sm md:text-lg text-[#222222]`}>HCMC University of Technology</p>
                            <p className={`${sfProDisplayLight.className} text-xs md:text-base text-[#555555] mt-0.5 md:mt-1`}>GPA: 3.0/4.0</p>
                            <p className={`${sfProDisplayLight.className} text-xs md:text-base text-[#555555]`}>2021 - 2026</p>
                        </div>
                        <CldImage
                            src="edu-bk-sticker"
                            height={160}
                            width={160}
                            alt={"Bach Khoa Stickers"}
                            className="absolute top-[50%] -translate-y-1/2 right-1 md:right-2 rotate-12 drop-shadow-lg w-[85px] md:w-[120px] h-auto"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.3 }}
                        className="absolute bottom-[15%] left-0 md:left-4 md:bottom-1/8"
                    >
                        <CldImage
                            src="edu-bk-3"
                            height={320}
                            width={320}
                            alt={"Bach Khoa 3"}
                            className="w-[160px] md:w-[220px] lg:w-[240px] h-auto rounded-lg shadow-lg"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.4 }}
                        className="absolute bottom-[22%] right-0 w-fit h-fit md:bottom-1/6 md:right-3"
                    >
                        <CldImage
                            src="edu-bk-4"
                            height={300}
                            width={300}
                            alt={"Bach Khoa 4"}
                            className="w-[150px] md:w-[210px] lg:w-[230px] h-auto rounded-lg shadow-lg"
                        />
                    </motion.div>

                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute bottom-[3%] md:bottom-[4%] left-1/2 transform -translate-x-1/2 p-3 rounded-full z-30 border-1 border-[#DBDBDB] shadow-xl hover:scale-105 active:scale-95 transition-all"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.80) 15%, rgba(235, 235, 235, 0.8) 50%, rgba(235, 235, 235, 0.8) 65%, rgba(255, 255, 255, 0.80) 98.08%)',
                            backdropFilter: 'blur(10px)',
                            opacity: 0.9,
                        }}
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
            <div className="absolute top-0 left-0 w-full h-full -z-10 backdrop-blur-lg" onClick={onClose} />
        </motion.div>
    )
}

export default BKPopup;