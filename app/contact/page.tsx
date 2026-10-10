"use client";

import { motion } from "motion/react";
import AppleGaramondItalic from "next/font/local";
import { useState, useEffect, useRef, useCallback } from "react";
import SendButton from "@/app/ui/sendbutton";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";

const appleGaramondItalic = AppleGaramondItalic({
    src: "../../public/fonts/AppleGaramond-Italic.ttf",
    variable: "--AppleGaramondItalic",
})


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

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [message, setMessage] = useState("");
    const [active, setActive] = useState<null | 'name' | 'email' | 'messageTitle' | 'message'>(null);
    const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [showScrollHint, setShowScrollHint] = useState(true);
    
    // NEW: Track if input is focused and lock scroll position
    const isInputFocused = useRef(false);
    const lockedScrollTop = useRef(0);

    // ADD: lock body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    // NEW: Lock scroll position while input is focused
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (isInputFocused.current) {
                // Force scroll back to locked position
                el.scrollTop = lockedScrollTop.current;
            }
        };

        el.addEventListener("scroll", handleScroll, { passive: false });
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    // NEW: Also listen to window scroll (iOS sometimes scrolls window)
    useEffect(() => {
        const handleWindowScroll = () => {
            if (isInputFocused.current) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener("scroll", handleWindowScroll, { passive: false });
        return () => window.removeEventListener("scroll", handleWindowScroll);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const update = () => {
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
            setShowScrollHint(!atBottom);
        };

        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    // NEW: Handle input focus - lock current scroll position
    const handleInputFocus = useCallback((inputType: 'name' | 'email' | 'messageTitle' | 'message') => {
        setActive(inputType);
        
        const el = scrollRef.current;
        if (el) {
            // Lock to section 2 (form section) - which is 1 * viewport height
            lockedScrollTop.current = el.clientHeight;
            isInputFocused.current = true;
            
            // Immediately force scroll to locked position
            el.scrollTop = lockedScrollTop.current;
            window.scrollTo(0, 0);
        }
    }, []);

    // NEW: Handle input blur - unlock and snap
    const handleInputBlur = useCallback(() => {
        isInputFocused.current = false;
        
        const el = scrollRef.current;
        if (el) {
            // Snap to section 2 (form section)
            setTimeout(() => {
                el.scrollTo({ top: el.clientHeight, behavior: "smooth" });
                window.scrollTo(0, 0);
            }, 50);
            
            setTimeout(() => {
                el.scrollTo({ top: el.clientHeight, behavior: "instant" });
                window.scrollTo(0, 0);
            }, 350);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sendState === "sending") return;
        
        setSendState("sending");
        try {
            const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, messageTitle, message }),
            });
        
            if (!res.ok) throw new Error(await res.text());
        
            // reset form
            setName("");
            setEmail("");
            setMessageTitle("");
            setMessage("");
            setActive(null);
        
            setSendState("sent");
            setTimeout(() => setSendState("idle"), 2000);
        } catch {
            setSendState("error");
            setTimeout(() => setSendState("idle"), 2000);
        }
    };

    return (
        <motion.div
            ref={scrollRef}
            className="scroll-snap overflow-x-hidden scrollbar-hide overscroll-none"
        >
            <div
                className="h-screen w-full overflow-hidden scrollbar-hide overscroll-none"
            >
                <p className={`mt-10 ${appleGaramondItalic.className} text-5xl text-center mb-5 color-word`}>Contact</p>

                <div className="mx-6">
                    <p className={`mt-10 ${appleGaramondItalic.className} text-3xl text-left mb-5 color-word`}>Reach out</p>
                    
                    <div>
                        <p className={`${sfProDisplayMedium.className}`}>Email</p>
                        <p className={`${sfProDisplayLight.className}`}>duongminhthuan.work@gmail.com</p>
                    </div>

                    <div className="mt-2">
                        <p className={`${sfProDisplayMedium.className}`}>Location</p>
                        <p className={`${sfProDisplayLight.className}`}>Gia Dinh Ward, Ho Chi Minh City, Vietnam</p>
                    </div>

                    <div className="mt-2">
                        <p className={`${sfProDisplayMedium.className}`}>Availability</p>
                        <p className={`${sfProDisplayLight.className}`}>Open to internships</p>
                    </div>
                </div>
                
                <div className="flex flex-col gap-2 mx-6">
                    <p className={`mt-10 ${appleGaramondItalic.className} text-3xl text-left mb-3 color-word`}>Find me online</p>
                    <a href="https://www.linkedin.com/in/duongminhthuan2003/" target="_blank" className="flex items-center gap-2">
                        <p className={`${sfProDisplayLight.className}`}>LinkedIn</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.0017 3C7.05534 3.03208 5.41096 3.21929 4.31838 4.31188C2.99988 5.63037 2.99988 7.75248 2.99988 11.9966C2.99988 16.2409 2.99988 18.363 4.31838 19.6815C5.63688 21 7.75899 21 12.0032 21C16.2474 21 18.3695 21 19.688 19.6815C20.7808 18.5887 20.9678 16.9438 20.9999 13.9963" />
                            <path d="M14 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V10M20 4L11 13" />
                        </svg>
                    </a>
                    <a href="https://github.com/duongminhthuan2003" target="_blank" className="flex items-center gap-2">
                        <p className={`${sfProDisplayLight.className}`}>GitHub</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.0017 3C7.05534 3.03208 5.41096 3.21929 4.31838 4.31188C2.99988 5.63037 2.99988 7.75248 2.99988 11.9966C2.99988 16.2409 2.99988 18.363 4.31838 19.6815C5.63688 21 7.75899 21 12.0032 21C16.2474 21 18.3695 21 19.688 19.6815C20.7808 18.5887 20.9678 16.9438 20.9999 13.9963" />
                            <path d="M14 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V10M20 4L11 13" />
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/duongminhthuan.2003/" target="_blank" className="flex items-center gap-2">
                        <p className={`${sfProDisplayLight.className}`}>Facebook</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.0017 3C7.05534 3.03208 5.41096 3.21929 4.31838 4.31188C2.99988 5.63037 2.99988 7.75248 2.99988 11.9966C2.99988 16.2409 2.99988 18.363 4.31838 19.6815C5.63688 21 7.75899 21 12.0032 21C16.2474 21 18.3695 21 19.688 19.6815C20.7808 18.5887 20.9678 16.9438 20.9999 13.9963" />
                            <path d="M14 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V10M20 4L11 13" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/duongminhthuan2003/" target="_blank" className="flex items-center gap-2">
                        <p className={`${sfProDisplayLight.className}`}>Instagram</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.0017 3C7.05534 3.03208 5.41096 3.21929 4.31838 4.31188C2.99988 5.63037 2.99988 7.75248 2.99988 11.9966C2.99988 16.2409 2.99988 18.363 4.31838 19.6815C5.63688 21 7.75899 21 12.0032 21C16.2474 21 18.3695 21 19.688 19.6815C20.7808 18.5887 20.9678 16.9438 20.9999 13.9963" />
                            <path d="M14 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V10M20 4L11 13" />
                        </svg>
                    </a>
                </div>
            </div>

            <div 
                className="h-screen w-full overflow-hidden scrollbar-hide overscroll-none flex flex-col"
                tabIndex={-1}
                onClick={(e) => {
                    // Nếu click không phải vào form, set active = null
                    const form = e.currentTarget.querySelector('form');
                    if (form && !form.contains(e.target as Node)) {
                        setActive(null);
                        // Blur input đang active (nếu có)
                        if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                        }
                    }
                }}
                onBlurCapture={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setActive(null);
                    }
                }}
            >
                <p className={`mt-10 ${appleGaramondItalic.className} text-3xl mx-6 text-left mb-5 color-word`}>Feel free to <br/>leave me a message!</p>

                <form 
                    className="mx-6 flex flex-col gap-4"
                    onSubmit={handleSubmit}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <input
                        type="text" 
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                        placeholder="Your name"
                        className={`h-10 ${sfProDisplayLight.className} w-64 flex pl-4 rounded-full transition-all duration-300 cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-transparent ${(active === 'name' || active ===null) ? 'opacity-100' : 'opacity-30'}`}
                        style={{
                            border: '1px solid #F1F1F1',
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(2px)',
                        }}
                        onFocus={() => handleInputFocus('name')}
                        onBlur={handleInputBlur}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => {setEmail(event.target.value)}}
                        placeholder="Your email"
                        className={`h-10 ${sfProDisplayLight.className} w-64 flex pl-4 rounded-full transition-all duration-300 cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-transparent ${(active === 'email' || active ===null) ? 'opacity-100' : 'opacity-30'}`}
                        style={{
                            border: '1px solid #F1F1F1',
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(2px)',
                        }}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                    />
                    <input
                        type="text"
                        value={messageTitle}
                        onChange={(event) => {setMessageTitle(event.target.value)}}
                        placeholder="Message title"
                        className={`h-10 ${sfProDisplayLight.className} w-full flex pl-4 rounded-full transition-all duration-300 cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-transparent ${(active === 'messageTitle' || active ===null) ? 'opacity-100' : 'opacity-30'}`}
                        style={{
                            border: '1px solid #F1F1F1',
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(2px)',
                        }}
                        onFocus={() => handleInputFocus('messageTitle')}
                        onBlur={handleInputBlur}
                    />
                    <textarea 
                        value={message}
                        onChange={(event) => {setMessage(event.target.value)}}
                        placeholder="Your message"
                        className={`h-40 ${sfProDisplayLight.className} w-full p-4 rounded-xl transition-all duration-300 cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-transparent ${(active === 'message' || active ===null) ? 'opacity-100' : 'opacity-30'}`}
                        style={{
                            border: '1px solid #F1F1F1',
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%)',
                            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(2px)',
                            resize: 'none'
                        }}
                        onFocus={() => handleInputFocus('message')}
                        onBlur={handleInputBlur}
                    />
                    <SendButton state={sendState} />
                </form>

                <div className="flex-1"/>
            
                <div className={`${sfProDisplayLight.className} mb-[14.5vh] text-[#888888] mx-6`}>
                    <p className="text-sm">Brought to you by Duong Minh Thuan aka Toonie</p>
                    <p className="text-sm">Last updated: 10/10/2026</p>
                </div>
            </div>
            {/* <AnimatePresence>
                {showScrollHint && (
                    <motion.div
                        className="flex gap-1 fixed left-1/2 -translate-x-1/2 bottom-24 z-[60] pointer-events-none justify-center items-center"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ y: 6, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >   
                        <p className={`${sfProDisplayLight.className} text-sm text-[#888888]`}>Scroll down for more!</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </motion.div>
    )
}

export default Contact;
