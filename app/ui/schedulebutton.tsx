import { motion } from "motion/react";
import SFMonoSemibold from "next/font/local";
import React from "react";

const sfMonoSemibold = SFMonoSemibold({
    weight: "600",
    src: "../../public/fonts/SFMono-Semibold.otf",
    variable: "--SFMono-Semibold",
});

const EASE = "easeInOut";
const DURATION = 0.25;

interface ScheduleButtonProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    text?: string;
    className?: string;
}

export default function ScheduleButton({
    onClick,
    text = "SCHEDULE",
    className = "",
}: ScheduleButtonProps) {
    return (
        <motion.div
            onClick={onClick}
            className={`${sfMonoSemibold.className} relative w-[168px] h-[40px] px-4 bg-black text-white rounded-full flex items-center justify-between cursor-pointer select-none ${className}`}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
                rest:  { scale: 1 },
                hover: { scale: 1.05 },
                tap:   { scale: 0.97 },
            }}
            transition={{
                type: "tween",
                ease: EASE,
                duration: DURATION,
            }}
            style={{
                willChange: "transform",
                transformOrigin: "center",
            }}
        >
            {/* --- SHADOW WRAPPERS --- */}
            {/* Bóng trạng thái REST */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                    boxShadow:
                        "0 1px 2px 0px rgba(0,0,0,0.25), 0 4px 6px 0px rgba(0,0,0,0.22), 0 10px 16px 0px rgba(0,0,0,0.35), 0 24px 28px 0px rgba(0,0,0,0.20)",
                }}
                variants={{ rest: { opacity: 1 }, hover: { opacity: 0 }, tap: { opacity: 0 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />
            {/* Bóng trạng thái HOVER/TAP (đỏ) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                    boxShadow:
                        "0 1px 2px 0px rgba(186,0,0,0.25), 0 4px 6px 0px rgba(186,0,0,0.22), 0 10px 16px 0px rgba(186,0,0,0.38), 0 24px 28px 0px rgba(186,0,0,0.22)",
                }}
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 }, tap: { opacity: 1 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            <span className="font-SFMono-Semibold relative z-10 text-[13px] w-full flex flex-row items-center justify-between select-none">
                <p className="text-[#AAAAAA] tracking-wider">
                    {text}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="12" viewBox="0 0 34 14" fill="none" aria-hidden="true" className="shrink-0">
                  <g filter="url(#filter0_i_schedule_arrow)">
                    <path d="M1 7H33M33 7L26.9033 1M33 7L26.9033 13" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <filter id="filter0_i_schedule_arrow" x="0.25" y="0.25" width="33.5" height="14.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                      <feOffset dy="1"/>
                      <feGaussianBlur stdDeviation="0.5"/>
                      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_schedule_arrow"/>
                    </filter>
                  </defs>
                </svg>
            </span>

            {/* Phản sáng trên cùng (đậm và sáng rõ như bản gốc) */}
            <div className="pointer-events-none absolute bg-linear-to-b from-[rgba(255,255,255,0.30)] from-5% via-[rgba(255,255,255,0.08)] via-25% to-[rgba(0,0,0,0)] to-80% inset-0 w-[88%] h-1/2 rounded-full mx-auto mt-[3px]" />

            {/* Inner shadow đen mờ dần khi hover/tap (tiệm cận độ đậm sáng của bản gốc) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 14px 4px rgba(255,255,255,0.25) inset, 0 0 17px 0 rgba(255,255,255,0.08) inset" }}
                variants={{ rest: { opacity: 1 }, hover: { opacity: 0 }, tap: { opacity: 0 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            {/* Inner shadow đỏ hiện dần khi hover/tap (tiệm cận bản gốc) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 14px 4px rgba(255,255,255,0.25) inset, 0 -5px 17px 0 rgba(168,0,0,0.4) inset" }}
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 }, tap: { opacity: 1 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            {/* Glow dưới đáy */}
            <motion.div
                className="pointer-events-none absolute w-20 h-5 left-1/2 -translate-x-1/2 -bottom-2 bg-[#BA0000] blur-md rounded-full"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 0.7 }, tap: { opacity: 0.7 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            {/* Đèn dưới */}
            <motion.div
                className="pointer-events-none absolute bottom-[1.5px] left-1/2 -translate-x-1/2 rounded-full w-14 h-[4px]"
                style={{ boxShadow: "0 1px 1.5px 1px rgba(11,11,11,0.30) inset" }}
                variants={{
                    rest:  { backgroundColor: "rgba(70,70,70,1)",  boxShadow: "0 2px 1.5px 1px rgba(11,11,11,0.30) inset" },
                    hover: { backgroundColor: "rgba(255,108,108,1)", boxShadow: "0 1.5px 1.5px 1px rgba(199,35,35,1) inset" },
                    tap:   { backgroundColor: "rgba(255,108,108,1)", boxShadow: "0 1.5px 1.5px 1px rgba(199,35,35,1) inset" },
                }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />
        </motion.div>
    );
}
