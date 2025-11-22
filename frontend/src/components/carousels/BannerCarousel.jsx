import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

const BannerCarousel = () => {
    const banners = [banner1, banner2, banner3];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex justify-start mb-8">
            {/* Fixed container for all banners */}
            <div className=" w-full h-auto object-cover">
                {banners.map((banner, index) => (
                    <img
                        key={index}
                        src={banner}
                        alt={`Banner ${index + 1}`}
                        className={` absolute top-0 left-0 w-full h-auto object-contain transition-opacity duration-1000 ease-in-out
                            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    />
                ))}
            </div>
        </div>
    );
};


export default BannerCarousel;
