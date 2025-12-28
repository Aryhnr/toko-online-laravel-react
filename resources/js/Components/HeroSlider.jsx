import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            loop
            className="h-full"
        >
            <SwiperSlide>
                <Slide
                    image="/images/banner1.png"
                    subtitle="Lifestyle collection"
                    title="Men"
                    promoText="SALE UP TO"
                    promoValue="30% OFF"
                    desc="Get Free Shipping on orders over $99.00"
                    buttonText="Shop Now"
                />
            </SwiperSlide>

            <SwiperSlide>
                <Slide
                    image="/images/banner2.png"
                    subtitle="New arrivals"
                    title="Women"
                    promoText="DISCOUNT"
                    promoValue="40% OFF"
                    desc="Limited time offer"
                    buttonText="Explore"
                />
            </SwiperSlide>
        </Swiper>
    );
}

function Slide({
    image,
    subtitle,
    title,
    promoText,
    promoValue,
    desc,
    buttonText,
}) {
    return (
        <div
            className="h-[420px] md:h-full bg-cover bg-center flex items-center px-6 md:px-10"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="w-full md:max-w-md flex flex-col gap-3 text-center md:text-left items-center md:items-start mx-auto md:mx-0">
                {subtitle && (
                    <p className="uppercase tracking-widest text-sm text-gray-500">
                        {subtitle}
                    </p>
                )}

                <h1 className="text-5xl md:text-6xl font-bold leading-none">
                    {title}
                </h1>

                {(promoText || promoValue) && (
                    <div className="flex gap-2 justify-center md:justify-start">
                        <span className="font-semibold">{promoText}</span>
                        <span className="text-[#DDA853] font-bold">
                            {promoValue}
                        </span>
                    </div>
                )}

                {desc && <p className="text-sm text-gray-600">{desc}</p>}

                {buttonText && (
                    <button className="mt-4 px-6 py-3 bg-[#DDA853] text-white rounded-lg">
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}
