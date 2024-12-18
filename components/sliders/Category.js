import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import API_BASE_URL from "../../util/config";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);

    // Fetch data from backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}jobs/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="relative py-10">
            <Swiper
                slidesPerView={5} // Number of slides shown at once
                spaceBetween={20} // Space between slides
                navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                }}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                    1440: { slidesPerView: 5, spaceBetween: 30 },
                }}
            >
                {categories.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white rounded-lg p-4 mx-4 flex items-center justify-center h-52 shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                            <Link href={`/jobs-list?category=${encodeURIComponent(item.name)}`}>
                                <div className="flex flex-col items-center">
                                    <div className="mb-3">
                                        <img
                                            alt="category"
                                            className="w-12 h-12"
                                            src="assets/imgs/page/homepage1/lightning.svg"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-lg font-semibold truncate max-w-[150px]">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {item.job_count} <span>Jobs Available</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper Navigation Buttons */}
            <button
                className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-transparent border border-gray-300 rounded-full hover:scale-110 transition duration-200 ease-in-out"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>
            <button
                className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-transparent border border-gray-300 rounded-full hover:scale-110 transition duration-200 ease-in-out"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CategorySlider;
