"use client";

import React, { useState, useEffect } from "react";
import Masonry, { Item } from "@/app/ui/mansory";
import SFMono from "next/font/local";
import { useRouter } from "next/navigation";
import AppleGaramond from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";
import { motion, AnimatePresence } from "motion/react";

const sfMono = SFMono({
  weight: "400",
  src: "../../../../public/fonts/SFMono-Regular.otf",
  variable: "--SFMono-Regular",
});

const appleGaramond = AppleGaramond({
  weight: "400",
  src: "../../../../public/fonts/AppleGaramond.ttf",
  variable: "--AppleGaramond",
});

const sfProDisplayLight = SFProDisplayLight({
  weight: "200",
  src: "../../../../public/fonts/SFProDisplay-Light.otf",
  variable: "--SFProDisplayLight",
});

const sfProDisplayMedium = SFProDisplayMedium({
  weight: "600",
  src: "../../../../public/fonts/SFProDisplay-Medium.otf",
  variable: "--SFProDisplayMedium",
});

const items: Item[] = [
  {
    id: "1",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818951/1000eyes/metro_1.webp",
    url: "#",
    height: 900,
  },
  {
    id: "2",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818955/1000eyes/metro_2.webp",
    url: "#",
    height: 400,
  },
  {
    id: "3",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818959/1000eyes/metro_3.webp",
    url: "#",
    height: 900,
  },
  {
    id: "4",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818963/1000eyes/metro_4.webp",
    url: "#",
    height: 400,
  },
  {
    id: "5",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818967/1000eyes/metro_5.webp",
    url: "#",
    height: 400,
  },
  {
    id: "6",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818971/1000eyes/metro_6.webp",
    url: "#",
    height: 900,
  },
  {
    id: "7",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818976/1000eyes/metro_7.webp",
    url: "#",
    height: 900,
  },
  {
    id: "8",
    img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1792818980/1000eyes/metro_8.webp",
    url: "#",
    height: 900,
  },
];

export default function ThousandEyesGallery() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Handle escape, left, right keys for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight") {
        setSelectedItem((prev) => {
          if (!prev) return null;
          const idx = items.findIndex((i) => i.id === prev.id);
          return items[(idx + 1) % items.length];
        });
      } else if (e.key === "ArrowLeft") {
        setSelectedItem((prev) => {
          if (!prev) return null;
          const idx = items.findIndex((i) => i.id === prev.id);
          return items[(idx - 1 + items.length) % items.length];
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = items.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedItem(items[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = items.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedItem(items[prevIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:px-8 md:py-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-row w-full justify-between items-center">
        <div
          className={`${sfMono.className} flex justify-center items-center gap-3 md:gap-4 cursor-pointer text-sm md:text-base select-none transition-transform hover:-translate-x-1 duration-150`}
          onClick={() => {
            router.back();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="12"
            viewBox="0 0 29 12"
            fill="none"
          >
            <path
              d="M28 6L1 6M1 6L6.14412 11M1 6L6.14412 1"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>BACK</p>
        </div>

        <div
          className={`${sfProDisplayLight.className} flex text-sm md:text-base flex-col items-end`}
        >
          <p>Multimedia Producer</p>
          <p
            className={`${appleGaramond.className} text-3xl md:text-5xl -mt-2 md:-mt-3 text-[#BA0000]`}>
            1000 Eyes
          </p>
        </div>
      </div>

      {/* Subtitle / Location */}
      <div className="mt-3 mb-6 flex flex-col items-end">
        <p
          className={`${sfProDisplayLight.className} text-xs md:text-sm text-gray-500`}
        >
          Shot at HCMC Metro System • 8 Photos
        </p>
      </div>

      {/* Masonry Gallery */}
      <div className="w-full">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          colorShiftOnHover={false}
          onItemClick={(item) => setSelectedItem(item)}
        />
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Close preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Preview */}
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedItem.img}
                alt="1000 Eyes Metro"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-12"></div>
    </div>
  );
}
