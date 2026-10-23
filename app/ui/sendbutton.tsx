import { motion, AnimatePresence } from "motion/react";
import SFMono from 'next/font/local';
import SFMonoSemibold from 'next/font/local';

const sfMonoSemibold = SFMonoSemibold({
    weight: "600",
    src: "../../public/fonts/SFMono-Semibold.otf",
    variable: "--SFMono-Semibold",
});

const EASE = "easeInOut";
const DURATION = 0.25;

function SendButton({state = "idle"}: {state: "idle" | "sending" | "sent" | "error"}) {

    const label =
    state === "sending" ? "SENDING..." :
    state === "sent" ? "SENT" :
    state === "error" ? "ERROR" :
    "SEND";
    

    return (
        <motion.button
            className={`${sfMonoSemibold.className} relative py-3 px-6 bg-black text-white rounded-full w-[140px]`}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            type="submit"
            disabled={state === "sending"}
            aria-busy={state === "sending"}
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

            <span className="font-SFMono-Semibold relative z-10 text-[13px] flex flex-row items-center justify-center gap-3 select-none">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div 
                        key={state}
                        className="text-[#888888] flex flex-row items-center justify-center gap-3 select-none"
                        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            mass: 0.5,
                        }}
                    >
                        <p>{label}</p>
                                            
                        {
                            state === "sent" && (
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="18" 
                                    height="18" 
                                    viewBox="0 0 22 22" 
                                    fill="none"
                                >
                                    <g filter="url(#filter0_i_878_515)">
                                        <path d="M15.75 2.08782C14.2791 1.23697 12.5714 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75C20.75 10.0651 20.6811 9.3962 20.55 8.75" stroke="#747474" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M6.75 11.25C6.75 11.25 8.25 11.25 10.25 14.75C10.25 14.75 15.8088 5.58333 20.75 3.75" stroke="#747474" strokeWidth="1.5" strokeLinecap="round"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_i_878_515" x="0" y="0" width="21.5" height="22.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="1"/>
                                            <feGaussianBlur stdDeviation="0.5"/>
                                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_878_515"/>
                                        </filter>
                                    </defs>
                                </svg>
                            )
                        }

                        {
                            state === "idle" && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 22 20" fill="none">
                                    <g filter="url(#filter0_i_875_546)">
                                        <path d="M3.33203 10H17.7765" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3.17522 9.52566L1.11157 3.33471C0.693826 2.08148 1.98286 0.93925 3.17672 1.50476L18.2493 8.64439C19.3931 9.18621 19.3931 10.8138 18.2493 11.3556L3.17673 18.4952C1.98286 19.0607 0.693826 17.9185 1.11157 16.6653L3.17522 10.4743C3.27785 10.1664 3.27785 9.83356 3.17522 9.52566Z" stroke="#747474" strokeWidth="1.5"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_i_875_546" x="0.279297" y="0.603912" width="19.5781" height="19.7922" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="1"/>
                                            <feGaussianBlur stdDeviation="0.5"/>
                                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_875_546"/>
                                        </filter>
                                    </defs>
                                </svg>
                            )
                        }
                    </motion.div>                                    
                </AnimatePresence>
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
                className="absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full w-16 h-[4px]"
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
        </motion.button>
    );
}

export default SendButton;
