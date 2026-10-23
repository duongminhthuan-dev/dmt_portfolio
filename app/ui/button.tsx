import { motion } from "motion/react";
import SFMono from 'next/font/local';
import SFMonoSemibold from 'next/font/local';
import React from "react";

const sfMonoSemibold = SFMonoSemibold({
    weight: "600",
    src: "../../public/fonts/SFMono-Semibold.otf",
    variable: "--SFMono-Semibold",
});

const EASE = "easeInOut";
const DURATION = 0.25;

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function Button({ onClick }: ButtonProps) {
    return (
        <motion.div
            onClick={onClick}
            className={`${sfMonoSemibold.className} relative py-3 px-6 bg-black text-white rounded-full w-fit cursor-pointer`}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
                rest:  { scale: 1 },
                hover: { scale: 1.06 },
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
            {/* --- SHADOW WRAPPERS (thay vì animate box-shadow) --- */}
            {/* Bóng trạng thái REST */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                    // bóng ngoài (tĩnh): mô phỏng chuỗi shadow cũ REST
                    boxShadow:
                        "0 1px 2px 0px rgba(0,0,0,0.25), 0 13px 20px 0px rgba(0,0,0,0.45), 0 40px 35px 0px rgba(0,0,0,0.25), 0 5px 5px 0px rgba(0,0,0,0.25)",
                }}
                variants={{ rest: { opacity: 1 }, hover: { opacity: 0 }, tap: { opacity: 0 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />
            {/* Bóng trạng thái HOVER/TAP (đỏ) */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                    boxShadow:
                        "0 1px 2px 0px rgba(186,0,0,0.25), 0 13px 20px 0px rgba(186,0,0,0.45), 0 40px 35px 0px rgba(15,0,0,0.25), 0 5px 5px 0px rgba(0,0,0,0.25)",
                }}
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 }, tap: { opacity: 1 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            <span className="font-SFMono-Semibold relative z-10 text-sm flex flex-row items-center gap-4 select-none">
        <p className="text-[#AAAAAA]">
          GET TO KNOW ME!
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden="true">
          <g filter="url(#filter0_i_572_3061)">
            <path d="M1 7H33M33 7L26.9033 1M33 7L26.9033 13" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <filter id="filter0_i_572_3061" x="0.25" y="0.25" width="33.5" height="14.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_572_3061"/>
            </filter>
          </defs>
        </svg>
      </span>

            {/* Phản sáng trên cùng */}
            <div className="absolute bg-linear-to-b from-[rgba(255,255,255,0.25)] from-10% via-[rgba(0,0,0,0)] via-30% to-[rgba(0,0,0,0)] to-90% inset-0 w-[88%] h-1/2 rounded-full mx-auto mt-[4px]" />

            {/* Inner shadow đen mờ dần khi hover/tap */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 14px 4px rgba(255,255,255,0.25) inset, 0 0 17px 0 rgba(255,255,255,0.08) inset" }}
                variants={{ rest: { opacity: 1 }, hover: { opacity: 0 }, tap: { opacity: 0 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            {/* Inner shadow đỏ hiện dần khi hover/tap */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 14px 4px rgba(255,255,255,0.25) inset, 0 -5px 17px 0 rgba(168,0,0,0.4) inset" }}
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 }, tap: { opacity: 1 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            {/* Glow dưới đáy */}
            <motion.div
                className="absolute w-24 h-6 left-1/2 -translate-x-1/2 -bottom-2.5 bg-[#BA0000] blur-lg rounded-full"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 0.7 }, tap: { opacity: 0.7 } }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            {/* Đèn dưới */}
            <motion.div
                className="absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full w-16 h-[5px]"
                style={{ boxShadow: "0 1px 1.5px 1px rgba(11,11,11,0.30) inset" }}
                variants={{
                    rest:  { backgroundColor: "rgba(70,70,70,1)",  boxShadow: "0 2px 1.5px 1px rgba(11,11,11,0.30) inset" },
                    hover: { backgroundColor: "rgba(255,108,108,1)", boxShadow: "0 1.5px 1.5px 1px rgba(199,35,35,1) inset" },
                    tap:   { backgroundColor: "rgba(255,108,108,1)", boxShadow: "0 1.5px 1.5px 1px rgba(199,35,35,1) inset" },
                }}
                transition={{ type: "tween", ease: EASE, duration: DURATION }}
            />

            {/* Mask pill */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <defs>
                    <mask id="ellipseMask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                        <rect width="100%" height="100%" fill="black" />
                        <ellipse cx="50%" cy="50%" rx="90%" ry="60" transform="translate(0,-50)" fill="#1D1D1D" opacity={0.9} />
                    </mask>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" rx="20" ry="50%" fill="currentColor" mask="url(#ellipseMask)" />
            </svg>
        </motion.div>
    );
}

export default Button;
