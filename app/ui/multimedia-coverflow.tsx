import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import {useRouter} from "next/navigation";

const slides = [
    {
        img: "/images/projects/ananas/thumbnail.webp",
        title: "GIC 2023 Opening Short Film",
        desc: "Redeveloped the Ananas website with a modern design. A Web Programming subject's project. Built with React and Tailwind CSS.",
        navigate: "/works/product/ananas",
    },
    {
        img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1765721122/talksign_thumb.webp",
        title: "1000 Eyes - Shot at HCMC Metro System",
        desc: "A web application that translates sign language into text. Built for Naver AI Hackathon 2025 Final round. Built with React and Naver Cloud Platform.",
        navigate: "/works/product/ananas",
    },
];

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


export default function MultimediaSwiperCoverflow() {
    const myRouter = useRouter();

    const [active, setActive] = useState(0);
    return (
        <div className="mb-4">
            <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                effect="coverflow"
                coverflowEffect={{
                    rotate: 50,
                    stretch: 40,
                    depth: 600,
                    modifier: 1,
                    slideShadows: true
                }}
                slidesPerView={2}
                centeredSlides={true}
                watchSlidesProgress={true}
                spaceBetween={12}
                className="h-[300px] md:h-[400px]"
                onInit={(swiper) => setActive(swiper.realIndex)}
                onSlideChange={(swiper) => setActive(swiper.realIndex)}
                onTouchEnd={(swiper) => {
                    // Đảm bảo slide đã được activate
                    setActive(swiper.realIndex);
                }}

                slideToClickedSlide={true}
                allowTouchMove={true}
            >
                {slides.map((s, i) => (
                    <SwiperSlide
                        key={i}
                        style={{
                            backgroundImage: `url(${s.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "5px"
                        }}
                        onClick={
                            () => {myRouter.push(s.navigate)}
                        }
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            if (active === i) {
                                myRouter.push(s.navigate);
                            }
                        }}
                    />
                ))}
            </Swiper>

            <div
                style={{
                    marginTop: 8,
                    textAlign: "center",
                    padding: "0 16px",
                    minHeight: 72,
                }}
                aria-live="polite"
            >
                <motion.div
                    key={active}
                >
                    <motion.p
                        className={`${sfProDisplayMedium.className} text-lg`}
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{ duration: 0.3, type: "tween" }}
                    >
                        {slides[active].title}
                    </motion.p>

                    <motion.p
                        className={`${sfProDisplayLight.className} text-base`}
                        initial={{y: 30, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{ duration: 0.3, delay: 0.1, type: "tween"  }}
                    >
                        {slides[active].desc}
                    </motion.p>
                </motion.div>
            </div>

            <style>
                {`
                    .swiper {
                        position: relative;
                        padding-bottom: 35px;
                        padding-left: 40px;
                        padding-right: 40px;
                        padding-top: 20px;
                    }
                    
                    /* Responsive padding for smaller screens */
                    @media (max-width: 768px) {
                        .swiper {
                            margin-left: -20px;
                            margin-right: -20px;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .swiper {
                            padding-left: 0px;
                            padding-right: 0px;
                        }
                    }
                    
                    .swiper-button-prev,
                    .swiper-button-next {
                      color: #ba0000;         /* màu mũi tên */
                      width: 40px;            /* kích thước khung */
                      height: 40px;
                      border-radius: 50%;     /* thành hình tròn */
                      border: 1px solid #F1F1F1;
                      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(221, 221, 221, 0.30) 31.73%, rgba(221, 221, 221, 0.30) 65.38%, rgba(255, 255, 255, 0.30) 100%);
                      box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.15), 0 3px 7px 0 rgba(0, 0, 0, 0.15);
                      backdrop-filter: blur(2px);
                      display: flex;
                      align-items: center;
                      justify-items: center;
                      transition: all
                    }
                    
                    .swiper-button-prev::after,
                    .swiper-button-next::after {
                      font-size: 18px;        /* kích thước icon mũi tên */
                      font-weight: bold;
                    }
                    
                    /* chỉnh khoảng cách 2 nút cho responsive */
                    .swiper-button-prev {
                        margin-left: 30px;  /* cách lề trái */
                        padding-right: 2px;
                        padding-top:2px
                    }
                    .swiper-button-next {
                        margin-right: 30px; /* cách lề phải */
                        padding-left: 2px;
                        padding-top:2px
                    }
                    
                    @media (max-width: 768px) {
                        .swiper-button-prev {
                            left: 10px;
                        }
                        .swiper-button-next {
                            right: 10px;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .swiper-button-prev {
                            left: 1%;
                        }
                        .swiper-button-next {
                            right: 1%;
                        }
                    }

                    .swiper-pagination {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                    }
                
                    .swiper-pagination .swiper-pagination-bullet {
                        width: 24px;
                        height: 4px;
                        background: #bbbbbb;
                        opacity: 0.5;
                        border-radius: 5px;
                        transition: all 0.3s ease;
                    }
                    .swiper-pagination .swiper-pagination-bullet-active {
                        background: #ba0000;
                        opacity: 1;
                    }
                    .swiper-slide {
                        box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.1), 0 3px 15px 0 rgba(0, 0, 0, 0.05);
                        cursor: pointer;
                      }
                      .swiper-slide-active { opacity: 1; }
                      
                      /* Cho phép click qua shadow của coverflow effect */
                      .swiper-slide-shadow-left,
                      .swiper-slide-shadow-right,
                      .swiper-slide-shadow-coverflow {
                        pointer-events: none;
                      }

                    /* FIX CHO SAFARI iOS */
                    .swiper-slide {
                        -webkit-transform: translateZ(0);
                        transform: translateZ(0);
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                    }
                    
                    /* Force hardware acceleration trên iOS */
                    .swiper-wrapper {
                        -webkit-transform-style: preserve-3d;
                        transform-style: preserve-3d;
                    }
                    
                    /* Đảm bảo touch events hoạt động trên iOS */
                    .swiper-slide > * {
                        pointer-events: auto;
                        -webkit-tap-highlight-color: transparent;
                    }
                    `}
            </style>
        </div>
    );
}
