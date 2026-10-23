import Image, { StaticImageData } from "next/image";
import SFProDisplayMedium from 'next/font/local';
import SFProDisplayLight from "next/font/local";
import { motion } from "motion/react";
import React from "react";
import { CldImage } from 'next-cloudinary';

const sfProDisplayLight = SFProDisplayLight({
    weight: "200",
    src: "../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
})


const sfProDisplayMedium = SFProDisplayMedium({
    weight: "600",
    src: "../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
})

type Img = { src: string; alt?: string };

type Sticker = {
    src: string;
    alt?: string;
    className?: string;
};

type AboutMeFolderProps = {
    images: [Img, Img, Img];
    title: string;
    showDate?: boolean;
    dateText?: string;
    showDescription?: boolean;
    descriptionText?: string;

    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;

    stickers?: Sticker[];
};

const EASE = "easeInOut";
const DURATION = 0.2;

function AboutMeFolder({
    images,
    title,
    showDate = false,
    dateText,
    showDescription = false,
    descriptionText,
    onClick,
    className,
    stickers,
}: AboutMeFolderProps) {

    const [{ src: img1, alt: alt1 }, { src: img2, alt: alt2 }, { src: img3, alt: alt3 }] = images;

    return (
        <motion.div
            className={`flex flex-col w-fit mx-auto items-center ${className ?? ""}`}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
                rest: { scale: 1 },
                hover: { scale: 1.06 },
                tap: { scale: 0.96 },
            }}
            transition={{
                type: "tween",
                ease: EASE,
                duration: DURATION,
            }}
            onClick={onClick}
        >
            {stickers?.map((s, i) => {
                const MotionImg = motion(Image);
                return (
                    <MotionImg
                        key={i}
                        src={s.src}
                        alt={s.alt ?? `sticker-${i}`}
                        className={`absolute z-50 select-none pointer-events-none ${s.className ?? ""}`}
                        draggable={false}
                    />
                );
            })}

            <div className="relative">
                <div
                    className="h-0.5 absolute w-[84px] rounded-full z-30 bottom-[53px] left-1/2 -translate-x-1/2 bg-white"
                    style={{ boxShadow: "0 0.5px 1px 0 rgba(186, 186, 186, 0.49) inset" }}
                />
                <div
                    className="h-0.5 absolute w-[82px] bg-white z-30 rounded-full bottom-[49px] left-1/2 -translate-x-1/2"
                    style={{ boxShadow: "0 0.5px 1px 0 rgba(186, 186, 186, 0.49) inset" }}
                />

                <div>
                    <motion.div
                        className="relative top-7 z-10 rotate-[3deg]"
                        style={{ willChange: "transform" }}
                        variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -12 }, tap: { x: 2, y: -12 } }}
                        transition={{ type: "tween", ease: EASE, duration: DURATION }}
                    >
                        <CldImage src={img2} alt={alt2 ?? "Image 2"} width={52} height={52} loading={"eager"} className="absolute z-10 aspect-square object-cover rounded-[6px] ring-1 ring-[#E8E8E8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div
                            className="absolute w-[62px] aspect-square bg-white rounded-[10px] ring-1 ring-[#E8E8E8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </motion.div>

                    <motion.div
                        className="relative top-11 left-8 z-0 rotate-[15deg]"
                        style={{ willChange: "transform" }}
                        variants={{ rest: { x: 0, y: 0 }, hover: { x: 5, y: -10 }, tap: { x: 5, y: -10 } }}
                    >
                        <CldImage src={img1} alt={alt1 ?? "Image 1"} width={52} height={52} loading={"eager"} className="absolute z-10 aspect-square object-cover rounded-[6px] ring-1 ring-[#E8E8E8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div
                            className="absolute w-[62px] aspect-square bg-white rounded-[10px] ring-1 ring-[#E8E8E8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </motion.div>

                    <motion.div
                        className="relative top-11 right-7 -z-10 rotate-[-17deg]"
                        style={{ willChange: "transform" }}
                        variants={{ rest: { x: 0, y: 0 }, hover: { x: -5, y: -10 }, tap: { x: -5, y: -10 } }}
                    >
                        <CldImage src={img3} alt={alt3 ?? "Image 3"} width={52} height={52} loading={"eager"} className="absolute z-10 aspect-square object-cover rounded-[6px] ring-1 ring-[#E8E8E8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div
                            className="absolute w-[62px] aspect-square bg-white rounded-[10px] ring-1 ring-[#E8E8E8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </motion.div>
                </div>

                <div className="relative w-[155px] h-[129px]">
                    {/* Backdrop blur layer using HTML div with clip-path (better browser support) */}
                    <div
                        className="absolute inset-0 z-15"
                        style={{
                            WebkitBackdropFilter: 'blur(20px)',
                            backdropFilter: 'blur(20px)',
                            clipPath: 'path("M31.2494 78.179L26.8955 22.3698C26.4421 16.5581 31.0358 11.592 36.8652 11.592H63.6373C66.3638 11.592 68.9722 12.7054 70.8584 14.6743L75.2542 19.2629C77.1404 21.2318 79.7488 22.3451 82.4753 22.3451H118.828C124.724 22.3451 129.341 27.4138 128.784 33.2833C127.674 44.9751 125.888 63.7941 124.501 78.352C124.013 83.4836 119.703 87.4013 114.548 87.4013H41.2191C35.9979 87.4013 31.6555 83.3844 31.2494 78.179Z")',
                        }}
                    />

                    {/* Stroke outline */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="155" height="129" viewBox="0 0 155 129"
                        fill="none" className="absolute inset-0 z-30"
                        style={{ filter: 'drop-shadow(0 3px 7px rgba(0, 0, 0, 0.25)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.15))' }}
                    >
                        <path
                            d="M31.2494 78.179L26.8955 22.3698C26.4421 16.5581 31.0358 11.592 36.8652 11.592H63.6373C66.3638 11.592 68.9722 12.7054 70.8584 14.6743L75.2542 19.2629C77.1404 21.2318 79.7488 22.3451 82.4753 22.3451H118.828C124.724 22.3451 129.341 27.4138 128.784 33.2833C127.674 44.9751 125.888 63.7941 124.501 78.352C124.013 83.4836 119.703 87.4013 114.548 87.4013H41.2191C35.9979 87.4013 31.6555 83.3844 31.2494 78.179Z"
                            stroke="white" strokeOpacity="0.9" strokeWidth="2"
                        />
                    </svg>

                    {/* Fill with shadow effects */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={155}
                        height={129}
                        viewBox="0 0 155 129"
                        fill="none"
                        shapeRendering="geometricPrecision"
                        className="absolute inset-0 z-20"
                    >
                        <g filter="url(#filter0_ddi_591_752)">
                            <path d="M31.2494 78.179L26.8955 22.3698C26.4421 16.5581 31.0358 11.592 36.8652 11.592H63.6373C66.3638 11.592 68.9722 12.7054 70.8584 14.6743L75.2542 19.2629C77.1404 21.2318 79.7488 22.3451 82.4753 22.3451H118.828C124.724 22.3451 129.341 27.4138 128.784 33.2833C127.674 44.9751 125.888 63.7941 124.501 78.352C124.013 83.4836 119.703 87.4013 114.548 87.4013H41.2191C35.9979 87.4013 31.6555 83.3844 31.2494 78.179Z" fill="#F9F9F9" fillOpacity="0.55" />
                            <path d="M31.2494 78.179L26.8955 22.3698C26.4421 16.5581 31.0358 11.592 36.8652 11.592H63.6373C66.3638 11.592 68.9722 12.7054 70.8584 14.6743L75.2542 19.2629C77.1404 21.2318 79.7488 22.3451 82.4753 22.3451H118.828C124.724 22.3451 129.341 27.4138 128.784 33.2833C127.674 44.9751 125.888 63.7941 124.501 78.352C124.013 83.4836 119.703 87.4013 114.548 87.4013H41.2191C35.9979 87.4013 31.6555 83.3844 31.2494 78.179Z" stroke="white" strokeOpacity="0.8" strokeWidth="0" />
                        </g>

                        <defs>
                            <filter id="filter0_ddi_591_752" x="-34.1348" y="-49.408" width="223.965" height="197.809" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="3" />
                                <feGaussianBlur stdDeviation="3.5" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_591_752" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="15" />
                                <feGaussianBlur stdDeviation="12.5" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend mode="normal" in2="effect1_dropShadow_591_752" result="effect2_dropShadow_591_752" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_591_752" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="15" />
                                <feGaussianBlur stdDeviation="8.5" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.39 0" />
                                <feBlend mode="normal" in2="shape" result="effect3_innerShadow_591_752" />
                            </filter>
                        </defs>
                    </svg>
                </div>

                <div className="w-[89px] h-[83px] bg-[#EFEFEF] ring-1 ring-[#D9D9D9] rounded-xl absolute -z-30 top-[4px] left-1/2 -translate-x-1/2" />
            </div>

            <p className={`${sfProDisplayMedium.className} text-sm lg:text-base -mt-7`}>
                {title}
            </p>

            {showDate && !!dateText && (
                <p className={`${sfProDisplayMedium.className} px-3 text-[13px] py-1 bg-[#D9D9D9] text-[#888888] rounded-full mt-2`}>
                    {dateText}
                </p>)
            }

            {showDescription && !!descriptionText && (
                <p className={`${sfProDisplayLight.className} text-sm mt-2`}>
                    {descriptionText}
                </p>)
            }
        </motion.div>
    );
}

export default AboutMeFolder;
