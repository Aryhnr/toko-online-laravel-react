import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import CategoryCard from "@/Components/cards/CategoryCard";

export default function CategorySlider({ categories }) {
    return (
        <section className="mt-14">
            <h2 className="text-xl font-bold mb-6">Shop by Category</h2>

            {/* WRAPPER SLIDER */}
            <div className="relative group">
                {/* PREV */}
                <button
                    className="
                        cat-prev absolute
                        left-0 inset-y-0 my-auto z-10
                        -translate-x-1/2
                        w-9 h-9 sm:w-10 sm:h-10
                        rounded-full
                        bg-slate-900/90 text-white
                        flex items-center justify-center
                        shadow-lg hover:bg-slate-800 transition

                        opacity-0 group-hover:opacity-100
                        pointer-events-none group-hover:pointer-events-auto
                    "
                >
                    ‹
                </button>

                {/* NEXT */}
                <button
                    className="
                        cat-next absolute
                        right-0 inset-y-0 my-auto z-10
                        translate-x-1/2
                        w-9 h-9 sm:w-10 sm:h-10
                        rounded-full
                        bg-slate-900/90 text-white
                        flex items-center justify-center
                        shadow-lg hover:bg-slate-800 transition

                        opacity-0 group-hover:opacity-100
                        pointer-events-none group-hover:pointer-events-auto
                    "
                >
                    ›
                </button>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: ".cat-prev",
                        nextEl: ".cat-next",
                    }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={16}
                    breakpoints={{
                        0: { slidesPerView: 1.2 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="px-4 sm:px-10 lg:px-14"
                >
                    {categories.map((cat) => (
                        <SwiperSlide key={cat.id} className="py-4">
                            <CategoryCard category={cat} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
