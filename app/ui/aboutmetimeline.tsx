"use client"

import { useState, useEffect, useRef } from 'react';
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import { motion, AnimatePresence } from "motion/react";

const sfProDisplayLight = SFProDisplayLight({
    weight:"200",
    src: "../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
})

const sfProDisplayMedium = SFProDisplayMedium({
    weight:"600",
    src: "../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
})

// Timeline configuration
const MONTH_WIDTH = 48; // Fixed width per month in pixels
const START_OFFSET = 24; // Left padding in pixels
const GAP_WIDTH = 90;    // Compressed width for year 2025

// Segment 1: Late 2022 - Late 2024
const SEGMENT_1 = [
    { year: 2022, month: "Sep", isYear: false },
    { year: 2022, month: "Oct", isYear: true },  // GDSC Start (Index 1)
    { year: 2022, month: "Nov", isYear: false },
    { year: 2022, month: "Dec", isYear: false },
    { year: 2023, month: "Jan", isYear: true },   // Index 4
    { year: 2023, month: "Feb", isYear: false },
    { year: 2023, month: "Mar", isYear: false },
    { year: 2023, month: "Apr", isYear: false },
    { year: 2023, month: "May", isYear: false },
    { year: 2023, month: "Jun", isYear: false },
    { year: 2023, month: "Jul", isYear: false },
    { year: 2023, month: "Aug", isYear: false },
    { year: 2023, month: "Sep", isYear: false },
    { year: 2023, month: "Oct", isYear: false },
    { year: 2023, month: "Nov", isYear: false },
    { year: 2023, month: "Dec", isYear: false },
    { year: 2024, month: "Jan", isYear: true },   // GAM Start (Index 16)
    { year: 2024, month: "Feb", isYear: false },
    { year: 2024, month: "Mar", isYear: false },
    { year: 2024, month: "Apr", isYear: false },
    { year: 2024, month: "May", isYear: false },
    { year: 2024, month: "Jun", isYear: false },  // GDSC End (Index 21)
    { year: 2024, month: "Jul", isYear: false },
    { year: 2024, month: "Aug", isYear: false },
    { year: 2024, month: "Sep", isYear: false },  // GAM End (Index 24)
    { year: 2024, month: "Oct", isYear: false },
];

// Segment 2: Year 2026 (ShopBack)
const SEGMENT_2 = [
    { year: 2026, month: "Jan", isYear: true },   // Index 0
    { year: 2026, month: "Feb", isYear: false },  // ShopBack Start (Index 1)
    { year: 2026, month: "Mar", isYear: false },
    { year: 2026, month: "Apr", isYear: false },
    { year: 2026, month: "May", isYear: false },
    { year: 2026, month: "Jun", isYear: false },
    { year: 2026, month: "Jul", isYear: false },
    { year: 2026, month: "Aug", isYear: false },
    { year: 2026, month: "Sep", isYear: false },  // ShopBack End (Index 8)
    { year: 2026, month: "Oct", isYear: false },
];

// Coordinate Calculations:
// GDSC (Oct '22 - Jun '24)
const GDSC_PILL_WIDTH = 288; // w-72
const gdscLeft = START_OFFSET + MONTH_WIDTH;
const gdscTotalWidth = (21 - 1 + 1) * MONTH_WIDTH;
const gdscLineWidth = Math.max(0, gdscTotalWidth - GDSC_PILL_WIDTH);

// GAM (Jan '24 - Sep '24)
const GAM_PILL_WIDTH = 256; // w-64
const gamLeft = START_OFFSET + 16 * MONTH_WIDTH;
const gamTotalWidth = (24 - 16 + 1) * MONTH_WIDTH;
const gamLineWidth = Math.max(0, gamTotalWidth - GAM_PILL_WIDTH);

// Segment 2 starting X (after Segment 1 + Gap)
const segment2StartX = START_OFFSET + SEGMENT_1.length * MONTH_WIDTH + GAP_WIDTH;

// ShopBack (Feb '26 - Sep '26)
const SHOPBACK_PILL_WIDTH = 256; // w-64
const shopbackLeft = segment2StartX + MONTH_WIDTH;
const shopbackTotalWidth = (8 - 1 + 1) * MONTH_WIDTH;
const shopbackLineWidth = Math.max(0, shopbackTotalWidth - SHOPBACK_PILL_WIDTH);

const TOTAL_TRACK_WIDTH = segment2StartX + SEGMENT_2.length * MONTH_WIDTH + 40;

function AboutMeTimeLine() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState<null | 'gdsc' | 'gam' | 'shopback'>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const totalDots = 3;

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            if (scrollLeft < gamLeft - 100) {
                setCurrentIndex(0); // GDSC Section
            } else if (scrollLeft < shopbackLeft - 150) {
                setCurrentIndex(1); // GAM Section
            } else {
                setCurrentIndex(2); // ShopBack Section
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToIndex = (index: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let targetScrollLeft = 0;
        if (index === 0) targetScrollLeft = 0;
        if (index === 1) targetScrollLeft = Math.max(0, gamLeft - 40);
        if (index === 2) targetScrollLeft = Math.max(0, shopbackLeft - 40);

        container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative w-full">
            {/* Horizontal Scrollable Timeline Container */}
            <div
                ref={scrollContainerRef}
                className="overflow-x-scroll w-full flex flex-row touch-pan-x scrollbar-hide select-none pt-2 pb-3"
            >
                <div
                    className={`relative shrink-0`}
                    style={{ width: `${TOTAL_TRACK_WIDTH}px`, height: '175px' }}
                >
                    {/* --- GDSC TRACK (PILL + LINE CENTERED) --- */}
                    <div
                        className={`absolute flex items-center cursor-pointer transition-all duration-300 ${
                            active === null || active === 'gdsc' ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{
                            left: `${gdscLeft}px`,
                            top: '10px',
                        }}
                        onClick={() => setActive(active === 'gdsc' ? null : 'gdsc')}
                    >
                        {/* GDSC Pill */}
                        <div
                            className="h-10 w-80 shrink-0 flex items-center pl-4 rounded-full transition-all duration-300 z-10"
                            style={{
                                border: '1px solid #F1F1F1',
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(221, 221, 221, 0.40) 31.73%, rgba(221, 221, 221, 0.40) 65.38%, rgba(255, 255, 255, 0.45) 100%)',
                                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            <p className={`${sfProDisplayMedium.className} text-sm lg:text-base text-[#444444] truncate pr-3`}>
                                GDSC HCMUT - Marketing Lead & Organizer
                            </p>
                        </div>

                        {/* Duration Line starting at the right end of Pill */}
                        <div
                            className={`h-[3px] rounded-r-full -ml-[1px] transition-colors duration-300 ${
                                active === 'gdsc' ? 'bg-[#BA0000]' : 'bg-[#D0D0D0] hover:bg-[#B5B5B5]'
                            }`}
                            style={{ width: `${gdscLineWidth}px` }}
                        />

                        {/* End marker dot */}
                        <div
                            className={`w-2 h-2 rounded-full shrink-0 -ml-1 transition-colors duration-300 ${
                                active === 'gdsc' ? 'bg-[#BA0000]' : 'bg-[#999999]'
                            }`}
                        />
                    </div>

                    {/* --- GAM TRACK (PILL + LINE CENTERED) --- */}
                    <div
                        className={`absolute flex items-center cursor-pointer transition-all duration-300 ${
                            active === null || active === 'gam' ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{
                            left: `${gamLeft}px`,
                            top: '62px',
                        }}
                        onClick={() => setActive(active === 'gam' ? null : 'gam')}
                    >
                        {/* GAM Pill */}
                        <div
                            className="h-10 w-64 shrink-0 flex pl-4 items-center rounded-full transition-all duration-300 z-10"
                            style={{
                                border: '1px solid #F1F1F1',
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(221, 221, 221, 0.40) 31.73%, rgba(221, 221, 221, 0.40) 65.38%, rgba(255, 255, 255, 0.45) 100%)',
                                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            <p className={`${sfProDisplayMedium.className} text-sm lg:text-base text-[#444444]`}>
                                GAM Esports - Video Editor
                            </p>
                        </div>

                        {/* Duration Line starting at the right end of Pill */}
                        <div
                            className={`h-[3px] rounded-r-full -ml-[1px] transition-colors duration-300 ${
                                active === 'gam' ? 'bg-[#BA0000]' : 'bg-[#D0D0D0] hover:bg-[#B5B5B5]'
                            }`}
                            style={{ width: `${gamLineWidth}px` }}
                        />

                        {/* End marker dot */}
                        <div
                            className={`w-2 h-2 rounded-full shrink-0 -ml-1 transition-colors duration-300 ${
                                active === 'gam' ? 'bg-[#BA0000]' : 'bg-[#999999]'
                            }`}
                        />
                    </div>

                    {/* --- SHOPBACK TRACK (PILL + LINE CENTERED) --- */}
                    <div
                        className={`absolute flex items-center cursor-pointer transition-all duration-300 ${
                            active === null || active === 'shopback' ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{
                            left: `${shopbackLeft}px`,
                            top: '10px',
                        }}
                        onClick={() => setActive(active === 'shopback' ? null : 'shopback')}
                    >
                        {/* ShopBack Pill */}
                        <div
                            className="h-10 w-64 shrink-0 flex items-center pl-4 rounded-full transition-all duration-300 z-10"
                            style={{
                                border: '1px solid #F1F1F1',
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(221, 221, 221, 0.40) 31.73%, rgba(221, 221, 221, 0.40) 65.38%, rgba(255, 255, 255, 0.45) 100%)',
                                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            <p className={`${sfProDisplayMedium.className} text-sm lg:text-base text-[#444444] truncate pr-3`}>
                                ShopBack - Software Engineer
                            </p>
                        </div>

                        {/* Duration Line starting at the right end of Pill */}
                        <div
                            className={`h-[3px] rounded-r-full -ml-[1px] transition-colors duration-300 ${
                                active === 'shopback' ? 'bg-[#BA0000]' : 'bg-[#D0D0D0] hover:bg-[#B5B5B5]'
                            }`}
                            style={{ width: `${shopbackLineWidth}px` }}
                        />

                        {/* End marker dot */}
                        <div
                            className={`w-2 h-2 rounded-full shrink-0 -ml-1 transition-colors duration-300 ${
                                active === 'shopback' ? 'bg-[#BA0000]' : 'bg-[#999999]'
                            }`}
                        />
                    </div>

                    {/* --- MONTHLY TIMELINE RULER --- */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-10"
                        style={{ paddingLeft: `${START_OFFSET}px` }}
                    >
                        {/* 1. Continuous Baseline across the entire ruler on the exact same horizontal level */}
                        <div className="flex flex-row items-center">
                            {/* Segment 1 solid line */}
                            <div
                                className="border-t border-[#D0D0D0] shrink-0"
                                style={{ width: `${SEGMENT_1.length * MONTH_WIDTH}px` }}
                            />

                            {/* 2025 dashed line on the exact same horizontal level */}
                            <div
                                className="border-t border-dashed border-[#888888] shrink-0"
                                style={{ width: `${GAP_WIDTH}px` }}
                            />

                            {/* Segment 2 solid line */}
                            <div
                                className="border-t border-[#D0D0D0] shrink-0"
                                style={{ width: `${SEGMENT_2.length * MONTH_WIDTH}px` }}
                            />
                        </div>

                        {/* 2. Month ticks & labels under the baseline */}
                        <div className="flex flex-row items-start">
                            {/* Segment 1 months */}
                            <div className="flex flex-row shrink-0">
                                {SEGMENT_1.map((m, idx) => (
                                    <div
                                        key={`seg1-${idx}`}
                                        className="flex flex-col items-center shrink-0"
                                        style={{ width: `${MONTH_WIDTH}px` }}
                                    >
                                        <div
                                            className={`w-[1px] ${
                                                m.isYear ? 'h-2.5 bg-[#BA0000]' : 'h-1.5 bg-[#B8B8B8]'
                                            }`}
                                        />
                                        <span className={`${sfProDisplayLight.className} text-[10px] text-[#777777] mt-0.5 select-none`}>
                                            {m.month}
                                        </span>
                                        {m.isYear && (
                                            <span className={`${sfProDisplayMedium.className} text-[11px] text-[#BA0000] -mt-0.5 font-medium select-none`}>
                                                {m.year}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* 2025 Compressed Gap Text Label under the line */}
                            <div
                                className="flex flex-col items-center shrink-0 pt-1.5"
                                style={{ width: `${GAP_WIDTH}px` }}
                            >
                                <span className={`${sfProDisplayLight.className} text-[10px] text-[#888888] select-none tracking-wider`}>
                                    ··· 2025 ···
                                </span>
                            </div>

                            {/* Segment 2 months */}
                            <div className="flex flex-row shrink-0">
                                {SEGMENT_2.map((m, idx) => (
                                    <div
                                        key={`seg2-${idx}`}
                                        className="flex flex-col items-center shrink-0"
                                        style={{ width: `${MONTH_WIDTH}px` }}
                                    >
                                        <div
                                            className={`w-[1px] ${
                                                m.isYear ? 'h-2.5 bg-[#BA0000]' : 'h-1.5 bg-[#B8B8B8]'
                                            }`}
                                        />
                                        <span className={`${sfProDisplayLight.className} text-[10px] text-[#777777] mt-0.5 select-none`}>
                                            {m.month}
                                        </span>
                                        {m.isYear && (
                                            <span className={`${sfProDisplayMedium.className} text-[11px] text-[#BA0000] -mt-0.5 font-medium select-none`}>
                                                {m.year}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pill-shaped pagination indicators */}
            <div className="flex justify-center items-center mt-4 space-x-2 md:hidden">
                {Array.from({ length: totalDots }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={`w-6 h-1 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? 'bg-[#BA0000] scale-110'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to section ${index + 1}`}
                    />
                ))}
            </div>

            {/* Reserved space for expandable detail card */}
            <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{ height: active ? '340px' : '0px' }}
            >
                <AnimatePresence>
                    {active !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full flex justify-center items-center"
                        >
                            {/* GDSC Details */}
                            {active === "gdsc" && (
                                <div className="flex flex-col md:flex-row w-full lg:w-11/12 xl:w-9/12 max-w-5xl mx-auto justify-center items-center md:items-stretch gap-3 md:gap-4 px-4 md:px-0">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="w-full md:w-5/12 md:shrink-0 mt-5 md:mt-0 p-5 rounded-xl flex flex-row justify-center items-center"
                                        style={{
                                            border: '1px solid #F1F1F1',
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        <div>
                                            <p className={`${sfProDisplayMedium.className} text-sm lg:text-xl`}>GDSC HCMUT</p>
                                            <p className={`${sfProDisplayLight.className} text-sm `}>Marketing Lead & Organizer</p>
                                        </div>
                                        <div className="flex-1 min-w-4"></div>
                                        <div className={`${sfProDisplayLight.className} bg-gray-300 px-2 py-1 mr-4 w-28 rounded-full text-xs text-center`}>
                                            Oct &#39;22 - Jun &#39;24
                                        </div>
                                        <button
                                            onClick={() => {setActive(null)}}
                                            className="hover:bg-gray-200 hover:bg-opacity-30 rounded-full transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                <path d="M15 1L1.00095 14.9991M14.9991 15L1 1.00099" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="relative w-full md:flex-1 p-4 mb-14 md:mb-0 rounded-xl flex flex-col justify-center"
                                        style={{
                                            border: '1px solid #F1F1F1',
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        <div className="text-sm lg:text-base">
                                            <p className={`${sfProDisplayLight.className} mt-1`}>- Led a 4-member team to deliver 3 major campaigns, including Info Seminar 2024 (largest annual event).</p>
                                            <p className={`${sfProDisplayLight.className} mt-1`}>- Developed marketing plans to boost student engagement and support media-related activities.</p>
                                            <p className={`${sfProDisplayLight.className} mt-1`}>- Supported team in marketing-related tasks.</p>
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* GAM Details */}
                            {active === "gam" && (
                                <div className="flex flex-col md:flex-row w-full lg:w-11/12 xl:w-9/12 max-w-5xl mx-auto justify-center items-center md:items-stretch gap-3 md:gap-4 px-4 md:px-0">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="w-full md:w-5/12 md:shrink-0 mt-5 md:mt-0 p-5 rounded-xl flex flex-row justify-center items-center"
                                        style={{
                                            border: '1px solid #F1F1F1',
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        <div>
                                            <p className={`${sfProDisplayMedium.className} text-sm lg:text-xl`}>GAM Esports</p>
                                            <p className={`${sfProDisplayLight.className} text-sm `}>Video Editor</p>
                                        </div>
                                        <div className="flex-1 min-w-4"></div>
                                        <div className={`${sfProDisplayLight.className} bg-gray-300 px-2 py-1 mr-4 w-28 rounded-full text-xs text-center`}>
                                            Jan &#39;24 - Sep &#39;24
                                        </div>
                                        <button
                                            onClick={() => {setActive(null)}}
                                            className="hover:bg-gray-200 hover:bg-opacity-30 rounded-full transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                <path d="M15 1L1.00095 14.9991M14.9991 15L1 1.00099" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="relative w-full md:flex-1 p-4 mb-14 md:mb-0 rounded-xl flex flex-col justify-center"
                                        style={{
                                            border: '1px solid #F1F1F1',
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        <div className="text-sm lg:text-base">
                                            <p className={`${sfProDisplayLight.className} mt-1`}>- Produced and edited videos and promo content for one of the top Vietnam E-sports teams.</p>
                                            <p className={`${sfProDisplayLight.className} mt-1`}>- Collaborated with designers, players, and managers to deliver results under tight deadlines.</p>
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* ShopBack Details */}
                            {active === "shopback" && (
                                <div className="flex flex-col md:flex-row w-full lg:w-11/12 xl:w-9/12 max-w-5xl mx-auto justify-center items-center md:items-stretch gap-3 md:gap-4 px-4 md:px-0">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="w-full md:w-5/12 md:shrink-0 mt-5 md:mt-0 p-5 rounded-xl flex flex-row justify-center items-center"
                                        style={{
                                            border: '1px solid #F1F1F1',
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        <div>
                                            <p className={`${sfProDisplayMedium.className} text-sm lg:text-xl`}>ShopBack</p>
                                            <p className={`${sfProDisplayLight.className} text-sm `}>Software Engineer</p>
                                        </div>
                                        <div className="flex-1 min-w-4"></div>
                                        <div className={`${sfProDisplayLight.className} bg-gray-300 px-2 py-1 mr-4 w-28 rounded-full text-xs text-center`}>
                                            Feb &#39;26 - Sep &#39;26
                                        </div>
                                        <button
                                            onClick={() => {setActive(null)}}
                                            className="hover:bg-gray-200 hover:bg-opacity-30 rounded-full transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                <path d="M15 1L1.00095 14.9991M14.9991 15L1 1.00099" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="relative w-full md:flex-1 p-4 mb-14 md:mb-0 rounded-xl flex flex-col justify-center"
                                        style={{
                                            border: '1px solid #F1F1F1',
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(2px)',
                                        }}
                                    >
                                        <div className="text-sm lg:text-base">
                                            <p className={`${sfProDisplayLight.className} mt-1`}>- Contributed to core web & mobile product features, improving user experience and performance.</p>
                                            <p className={`${sfProDisplayLight.className} mt-1`}>- Collaborated with regional product and engineering teams in an Agile development environment.</p>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AboutMeTimeLine;