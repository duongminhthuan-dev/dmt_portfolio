"use client"

import React from "react";
import Masonry from "@/app/ui/mansory";
import SFMono from "next/font/local";
import {useRouter} from "next/navigation";
import AppleGaramond from "next/font/local";
import SFProDisplayLight from "next/font/local";
import SFProDisplayMedium from "next/font/local";

const items = [
    {
      id: "1",
      img: "https://res.cloudinary.com/dhquqou4h/image/upload/v1758104892/samples/cup-on-a-table.jpg",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
];

const sfMono = SFMono({
    weight: "400",
    src: "../../../../../public/fonts/SFMono-Regular.otf",
    variable: "--SFMono-Regular",
});

const appleGaramond = AppleGaramond({
    weight:"400",
    src: "../../../../../public/fonts/AppleGaramond.ttf",
    variable: "--AppleGaramond",
});

const sfProDisplayLight = SFProDisplayLight({
    weight:"200",
    src: "../../../../../public/fonts/SFProDisplay-Light.otf",
    variable: "--SFProDisplayLight",
});

const sfProDisplayMedium = SFProDisplayMedium({
    weight:"600",
    src: "../../../../../public/fonts/SFProDisplay-Medium.otf",
    variable: "--SFProDisplayMedium",
});

export default function ShokoGallery() {
    const myRouter = useRouter();

    return (
        <div className="flex flex-col p-4 md:px-8 md:py-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-row w-full justify-between items-center">
                <div
                    className={`${sfMono.className} flex justify-center items-center gap-3 md:gap-4 cursor-pointer text-sm md:text-base select-none transition-transform hover:-translate-x-1 duration-150`}
                    onClick={() => {
                        myRouter.back();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="12" viewBox="0 0 29 12" fill="none">
                        <path d="M28 6L1 6M1 6L6.14412 11M1 6L6.14412 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>BACK</p>
                </div>

                <div className={`${sfProDisplayLight.className} flex text-sm md:text-base flex-col items-end`}>
                    <p>
                        Product & Design
                    </p>
                    <p className={`${appleGaramond.className} text-3xl md:text-5xl -mt-2 md:-mt-3 text-[#BA0000]`}>
                        Shoko
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <Masonry
                    items={items}
                    ease="power3.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                />
            </div>
        </div>
    );
}
