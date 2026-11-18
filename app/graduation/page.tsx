"use client";

import { motion } from "motion/react";
import AppleGaramondItalic from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import {useEffect, useRef, useState} from "react";
import ScheduleButton from "@/app/ui/schedulebutton";
import { CldImage } from "next-cloudinary";

const appleGaramondItalic = AppleGaramondItalic({
    src: "../../public/fonts/AppleGaramond-Italic.ttf",
    variable: "--AppleGaramondItalic",
});

const sfProDisplayLight = SFProDisplayLight({
    src: "../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
});

const sfProDisplayMedium = SFProDisplayMedium({
    src: "../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
});

interface WishItem {
    id: number;
    title: string;
    variant?: string; // Phân loại chi tiết để tránh mua nhầm
    price: string | number;
    link?: string;
    claimed: boolean;
    claimedBy?: string;
}

// Gọi thông qua Next.js Route Handler để tránh lỗi CORS / Failed to fetch
const API_URL = "/api/wishlist";
const WISHLIST_PASSCODE = "dmtgrad";

const timelineEvents = [
    { time: "10:00 - 12:00", content: "Chụp ảnh lưu niệm tại khuôn viên trường" },
    { time: "14:30 - 17:00", content: "Lễ chính ở hội trường A5" },
    { time: "17:00 - 17:30", content: "Gặp mặt sau lễ" },
];

const claimButtonStyle: React.CSSProperties = {
    borderRadius: "35px",
    border: "1px solid #F1F1F1",
    background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)",
    boxShadow:
        "0 10px 25px 0 rgba(0, 0, 0, 0.25), 0 3px 7px 0 rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(1.5px)",
    WebkitBackdropFilter: "blur(1.5px)",
};

function WishlistCard() {
    const [items, setItems] = useState<WishItem[]>([]);
    const [processingId, setProcessingId] = useState<number | null>(null);

    // State cho Modal nhập tên khi Claim
    const [selectedItem, setSelectedItem] = useState<WishItem | null>(null);
    const [giverName, setGiverName] = useState("");
    const [giverError, setGiverError] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    console.warn("Dữ liệu trả về không phải là mảng:", data);
                }
            })
            .catch((err) => console.error("Lỗi tải wishlist:", err));
    }, []);

    // Mở Modal nhập tên khi bấm Claim
    const handleOpenClaimModal = (item: WishItem) => {
        setSelectedItem(item);
        setGiverName("");
        setGiverError("");
    };

    // Đóng Modal
    const handleCloseClaimModal = () => {
        if (processingId) return; // Không đóng khi đang gửi API
        setSelectedItem(null);
        setGiverName("");
        setGiverError("");
    };

    // Xác nhận gửi Claim kèm tên
    const handleSubmitClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedItem) return;

        const trimmedName = giverName.trim();
        if (!trimmedName) {
            setGiverError("Vui lòng nhập tên hoặc nickname của bạn");
            return;
        }

        const itemToClaim = selectedItem;
        setProcessingId(itemToClaim.id);

        // Optimistic UI Update
        setItems((prev) =>
            prev.map((i) =>
                i.id === itemToClaim.id ? { ...i, claimed: true, claimedBy: trimmedName } : i
            )
        );

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: itemToClaim.id,
                    giverName: trimmedName,
                }),
            });

            if (!res.ok) {
                const errJson = await res.json().catch(() => ({}));
                throw new Error(errJson.details || errJson.error || errJson.message || "Không thể cập nhật Google Sheet");
            }

            // Đóng Modal sau khi thành công
            setSelectedItem(null);
        } catch (err: any) {
            console.error("Lỗi cập nhật:", err);
            // Rollback optimistic update
            setItems((prev) =>
                prev.map((i) => (i.id === itemToClaim.id ? { ...i, claimed: false, claimedBy: undefined } : i))
            );
            alert(`Lỗi: ${err.message || "Vui lòng thử lại sau"}`);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                {items
                    .filter((item: WishItem) => item.title && item.title.trim() !== "")
                    .map((item: WishItem) => (
                        <div
                            key={item.id}
                            className={`py-3.5 md:py-4 px-4 md:px-5 rounded-xl md:rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                                item.claimed
                                    ? "bg-neutral-100 border-neutral-200 opacity-60"
                                    : "bg-white/80 backdrop-blur border-neutral-300 shadow-xs hover:shadow-md hover:border-neutral-400/80"
                            }`}
                        >
                            <div>
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    {/* Tên sản phẩm chính */}
                                    <h3 className={`${sfProDisplayMedium.className} text-sm md:text-base text-neutral-800 leading-snug`}>
                                        {item.title}
                                    </h3>

                                    <span className="inline-block text-xs md:text-sm font-mono tracking-tight mt-0.5 shrink-0 text-neutral-600">
                                        {typeof item.price === "number" ? `${item.price.toLocaleString("vi-VN")}đ` : item.price}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mt-3 pt-2 border-t border-neutral-100/80">
                                    {/* Dòng phân loại chi tiết / Variant để không mua nhầm */}
                                    {item.variant ? (
                                        <p className={`${sfProDisplayLight.className} text-xs md:text-sm font-mono inline-block text-neutral-500 truncate max-w-[140px] md:max-w-[170px]`}>
                                            Phân loại: {item.variant}
                                        </p>
                                    ) : item.claimed && item.claimedBy ? (
                                        <p className={`${sfProDisplayLight.className} text-xs md:text-sm font-mono inline-block text-neutral-400 truncate max-w-[140px] md:max-w-[170px]`}>
                                            Bởi: {item.claimedBy}
                                        </p>
                                    ) : (
                                        <div/>
                                    )}

                                    {/* Nút bấm claim ở góc dưới bên phải */}
                                    <div className="flex justify-end items-center gap-1.5 md:gap-2">
                                        <button
                                            onClick={() => {
                                                if (item.link) {
                                                    window.open(item.link, "_blank");
                                                }
                                            }}
                                            disabled={item.claimed || processingId === item.id}
                                            className="text-xs md:text-sm px-2.5 md:px-3 py-1 rounded-full transition-all duration-200 select-none underline text-neutral-600 hover:text-neutral-900 cursor-pointer"
                                        >
                                            Link
                                        </button>

                                        <button
                                            onClick={() => !item.claimed && handleOpenClaimModal(item)}
                                            disabled={item.claimed || processingId === item.id}
                                            style={!item.claimed ? claimButtonStyle : { borderRadius: "35px" }}
                                            className={`text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 transition-all duration-200 select-none font-medium ${
                                                item.claimed
                                                    ? "bg-neutral-200/80 text-neutral-400 cursor-not-allowed border border-neutral-200"
                                                    : "text-neutral-900 hover:text-[#BA0000] active:scale-95 cursor-pointer"
                                            }`}
                                        >
                                            {processingId === item.id ? "Claiming..." : item.claimed ? "Claimed" : "Claim"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Modal Glassmorphism xác nhận và nhập Tên khi Claim */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-xs"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleCloseClaimModal();
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full max-w-sm md:max-w-md p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/95 border border-neutral-200 shadow-2xl backdrop-blur-xl flex flex-col text-left"
                    >
                        <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
                            <div>
                                <span className="text-[11px] md:text-xs font-mono tracking-wider text-neutral-400 uppercase">
                                    Xác nhận tặng quà
                                </span>
                                <h4 className={`${appleGaramondItalic.className} text-2xl md:text-3xl text-neutral-900 leading-tight mt-0.5`}>
                                    {selectedItem.title}
                                </h4>
                            </div>

                            <button
                                type="button"
                                onClick={handleCloseClaimModal}
                                disabled={processingId !== null}
                                className="text-neutral-400 hover:text-neutral-700 p-1 -mr-1 -mt-1 transition-colors cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        </div>

                        {selectedItem.variant && (
                            <p className={`${sfProDisplayLight.className} text-xs md:text-sm text-neutral-500 mb-4 md:mb-5`}>
                                Phân loại: <span className="font-mono text-neutral-700">{selectedItem.variant}</span>
                            </p>
                        )}

                        <form onSubmit={handleSubmitClaim} className="flex flex-col gap-3 md:gap-4 mt-1">
                            <div>
                                <label className="block text-xs md:text-sm font-mono text-neutral-600 mb-1.5">
                                    Tên hoặc nickname của bạn:
                                </label>
                                <input
                                    type="text"
                                    value={giverName}
                                    onChange={(e) => {
                                        setGiverName(e.target.value);
                                        if (giverError) setGiverError("");
                                    }}
                                    placeholder="vd: Minh Tuấn c3, Thảo Design..."
                                    maxLength={50}
                                    disabled={processingId !== null}
                                    className="w-full px-3.5 md:px-4 py-2 md:py-2.5 text-sm md:text-base rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#BA0000]/40 focus:border-[#BA0000] transition-all text-neutral-800 placeholder:text-neutral-400"
                                />
                                {giverError && (
                                    <p className="text-xs md:text-sm text-[#BA0000] mt-1 font-sans">
                                        {giverError}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-2 md:gap-3 mt-3 pt-3 border-t border-neutral-100">
                                <button
                                    type="button"
                                    onClick={handleCloseClaimModal}
                                    disabled={processingId !== null}
                                    className="px-4 py-2 md:py-2.5 rounded-xl text-xs md:text-sm text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    disabled={processingId !== null}
                                    style={claimButtonStyle}
                                    className="px-5 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-neutral-900 hover:text-[#BA0000] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                    {processingId ? "Đang lưu..." : "Xác nhận"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default function Graduation() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isWishlistUnlocked, setIsWishlistUnlocked] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [passcodeError, setPasscodeError] = useState("");

    const handleScrollToTimeline = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        // Đảm bảo khi mới vào trang luôn ở đỉnh đầu (Section 1)
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode.trim() === WISHLIST_PASSCODE) {
            setIsWishlistUnlocked(true);
            setPasscodeError("");
        } else {
            setPasscodeError("Mật khẩu chưa chính xác. Vui lòng thử lại!");
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <motion.div
                ref={scrollRef}
                className="scroll-snap overflow-x-hidden scrollbar-hide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {/* Section 1: Hero Header */}
                <div className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 py-28 text-center overflow-hidden bg-black">
                    <div className="absolute inset-0 z-0 pointer-events-none select-none">
                        <CldImage
                            src="hero_web_resized"
                            alt="Graduation Hero"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-[62%_center] md:object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />
                    </div>

                    <div className="relative z-10 flex-1"/>

                    <div className="relative z-10 flex flex-col md:flex-row items-start gap-2 md:items-center md:justify-between text-white/85 drop-shadow-xs">
                        <p className="font-mono text-base">
                            28.11.2026
                        </p>

                        <p className="font-mono text-base">
                            HCMUT - LY THUONG KIET CAMPUS
                        </p>
                    </div>

                    <div className="relative z-10 flex-1"/>

                    <div className="relative z-10 flex flex-col justify-center items-center">
                        <motion.p
                            className={`text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-sm color-word ${appleGaramondItalic.className}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            My strange little journey is coming to an end,
                            and I&#39;d love to have you there for the finale.
                        </motion.p>

                        <motion.div
                            className="mt-6 md:mt-8 flex justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                        >
                            <ScheduleButton onClick={handleScrollToTimeline} />
                        </motion.div>
                    </div>
                </div>

                {/* Section 2: Graduation Details & Thesis (Timeline trải dài toàn bộ trang, nằm ngang trên desktop) */}
                <div className="h-screen w-full flex flex-col justify-center px-6 md:px-16 py-8 md:py-16 overflow-hidden">
                    <div className="w-full max-w-6xl mx-auto mb-8 md:mb-16">
                        <h3 className={`text-3xl md:text-4xl color-word ${appleGaramondItalic.className}`}>
                            Timeline
                        </h3>
                    </div>

                    {/* Desktop: Trục timeline ngang trải dài toàn bộ bề ngang trang */}
                    <div className="hidden md:block relative w-full my-auto">
                        {/* Đường trục ngang trải dài toàn bộ trang */}
                        <div className="absolute left-[-100vw] right-[-100vw] top-[7px] h-[2px] bg-neutral-200" />

                        <div className="w-full max-w-6xl mx-auto">
                            <div className="grid grid-cols-3 gap-8 lg:gap-14 w-full">
                                {timelineEvents.map((item, index) => (
                                    <div key={index} className="flex flex-col items-start group">
                                        {/* Điểm chấm tròn nằm trên trục ngang */}
                                        <div className="relative flex items-center justify-center w-4 h-4 shrink-0 z-10">
                                            <div className="w-3.5 h-3.5 rounded-full bg-[#BA0000] ring-4 ring-white shadow-xs group-hover:scale-125 transition-transform duration-300" />
                                        </div>

                                        {/* Mốc thời gian & Nội dung bên dưới trục */}
                                        <div className="flex flex-col mt-8 lg:mt-10">
                                            <span className={`${appleGaramondItalic.className} text-2xl lg:text-3xl xl:text-4xl text-neutral-800 tracking-tight group-hover:text-[#BA0000] transition-colors duration-300`}>
                                                {item.time}
                                            </span>

                                            <span className={`${sfProDisplayMedium.className} text-sm lg:text-base text-neutral-600 mt-2`}>
                                                {item.content}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile: Trục timeline dọc */}
                    <div className="md:hidden relative pl-2 flex flex-col justify-center">
                        {/* Đường trục dọc nối 3 mốc thời gian */}
                        <div className="absolute left-5 top-0 -translate-x-1/2 w-[2px] h-screen bg-neutral-200" />

                        <div className="flex flex-col gap-14">
                            {timelineEvents.map((item, index) => (
                                <div key={index} className="flex items-center gap-8 group">
                                    {/* Điểm chấm tròn nằm trên trục */}
                                    <div className="mt-10 relative flex items-center justify-center w-6 h-6 shrink-0 z-10">
                                        <div className="w-3 h-3 rounded-full bg-[#BA0000] ring-4 ring-white shadow-xs group-hover:scale-125 transition-transform duration-300" />
                                    </div>

                                    {/* Mốc thời gian bên phải */}
                                    <div className="flex flex-col mt-16">
                                        <span className={`${appleGaramondItalic.className} text-2xl text-neutral-800 tracking-tight group-hover:text-[#BA0000] transition-colors duration-300`}>
                                            {item.time}
                                        </span>

                                        <span className={`${sfProDisplayMedium.className}`}>
                                            {item.content}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section 4: Wishlist */}
                <div className={`relative h-screen w-full flex flex-col ${isWishlistUnlocked ? "overflow-y-auto scrollbar-hide" : "overflow-hidden"}`}>
                    {/* Header: Mảng trong suốt liền lạc */}
                    <div
                        className="sticky top-0 z-20 w-full border-b border-neutral-200/40 transition-all shrink-0"
                        style={{
                            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.55) 100%)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                        }}
                    >
                        <div className="max-w-5xl xl:max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                            <h3 className={`text-3xl md:text-4xl lg:text-5xl color-word ${appleGaramondItalic.className} tracking-tight`}>
                                Wishlist
                            </h3>

                            <p className="text-xs md:text-sm font-mono text-neutral-500 max-w-md md:text-right">
                                Your presence is an honor, but if you don’t know what to get, here are some hints.
                            </p>
                        </div>
                    </div>

                    {/* Nội dung danh sách Wishlist (bị blur & vô hiệu hoá tương tác nếu chưa mở khoá) */}
                    <div
                        className={`max-w-5xl xl:max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pt-8 md:pt-10 pb-24 md:pb-28 w-full transition-all duration-500 ${
                            !isWishlistUnlocked ? "blur-md select-none pointer-events-none opacity-40" : ""
                        }`}
                        aria-hidden={!isWishlistUnlocked}
                    >
                        <WishlistCard/>
                    </div>

                    {/* Overlay mật khẩu khi chưa mở khoá */}
                    {!isWishlistUnlocked && (
                        <div
                            className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-8 bg-white/30 backdrop-blur-md"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-sm md:max-w-md p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-white/90 border border-neutral-200/80 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 md:mb-4 text-neutral-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>

                                <h4 className={`${appleGaramondItalic.className} text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-1`}>
                                    Protected Wishlist
                                </h4>
                                <p className={`${sfProDisplayLight.className} text-xs md:text-sm text-neutral-500 mb-5 md:mb-6`}>
                                    Vui lòng nhập mật khẩu để xem danh sách và chọn quà
                                </p>

                                <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3 md:gap-4">
                                    <div className="relative w-full">
                                        <input
                                            type="password"
                                            value={passcode}
                                            onChange={(e) => {
                                                setPasscode(e.target.value);
                                                if (passcodeError) setPasscodeError("");
                                            }}
                                            placeholder="Nhập mật khẩu..."
                                            className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border border-neutral-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#BA0000]/40 focus:border-[#BA0000] transition-all text-neutral-800 placeholder:text-neutral-400 font-mono"
                                        />
                                    </div>

                                    {passcodeError && (
                                        <p className="text-xs md:text-sm text-[#BA0000] font-sans -mt-1 text-left">
                                            {passcodeError}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full py-2.5 md:py-3 px-4 rounded-xl bg-neutral-900 hover:bg-[#BA0000] active:scale-95 text-white text-xs md:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-md"
                                    >
                                        MỞ KHÓA
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
