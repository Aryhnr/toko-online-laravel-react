import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "@/Components/cards/ProductCard";

export default function BestSellerSlider({ products }) {
    return (
        <section className="mt-14">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Best Seller</h2>

                <div className="flex gap-2">
                    <button className="best-prev px-3 py-2 border rounded hover:bg-gray-100">
                        ‹
                    </button>
                    <button className="best-next px-3 py-2 border rounded hover:bg-gray-100">
                        ›
                    </button>
                </div>
            </div>

            {/* SLIDER */}
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={4}
                slidesPerGroup={4}
                loop={false}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: ".best-prev",
                    nextEl: ".best-next",
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                        slidesPerGroup: 1,
                    },
                    640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
