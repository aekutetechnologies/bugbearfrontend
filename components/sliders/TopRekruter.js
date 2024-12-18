import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper CSS
import "swiper/css/navigation"; // Import Swiper Navigation CSS

SwiperCore.use([Autoplay, Navigation]);

const data = [
    {
        img: "/assets/imgs/brands/brand-1.png",
        title: "LinkedIn",
        rating: 5,
        location: "New York, US",
        openJobs: 25
    },
    {
        img: "/assets/imgs/brands/brand-2.png",
        title: "Adobe",
        rating: 4,
        location: "San Francisco, US",
        openJobs: 17
    },
    {
        img: "/assets/imgs/brands/brand-3.png",
        title: "Dailymotion",
        rating: 5,
        location: "Paris, France",
        openJobs: 65
    },
    {
        img: "/assets/imgs/brands/brand-4.png",
        title: "NewSum",
        rating: 4,
        location: "London, UK",
        openJobs: 22
    },
    {
        img: "/assets/imgs/brands/brand-5.png",
        title: "PowerHome",
        rating: 5,
        location: "Berlin, Germany",
        openJobs: 30
    },
    {
        img: "/assets/imgs/brands/brand-6.png",
        title: "Tesla",
        rating: 5,
        location: "Palo Alto, US",
        openJobs: 45
    },
    {
        img: "/assets/imgs/brands/brand-7.png",
        title: "Microsoft",
        rating: 5,
        location: "Redmond, US",
        openJobs: 40
    },
    {
        img: "/assets/imgs/brands/brand-8.png",
        title: "Google",
        rating: 5,
        location: "Mountain View, US",
        openJobs: 50
    },
    {
        img: "/assets/imgs/brands/brand-9.png",
        title: "Facebook",
        rating: 4,
        location: "Menlo Park, US",
        openJobs: 35
    }
];


const TopRekruterSlider = () => {
    return (
        <div className="relative">
            <Swiper
                slidesPerView={3} // Default slides shown
                spaceBetween={20} // Spacing between slides
                navigation={{
                    prevEl: ".swiper-button-prev-1",
                    nextEl: ".swiper-button-next-1",
                }}
                autoplay={{
                    delay: 3000, // Slide change interval in milliseconds
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    1440: { slidesPerView: 4, spaceBetween: 40 },
                }}
                className="swiper-wrapper pt-5"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-5 rounded-xl shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
                            <a href="#">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16">
                                        <img
                                            alt={item.title}
                                            src={item.img}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <img
                                                    key={i}
                                                    alt="star"
                                                    src="/assets/imgs/template/icons/star.svg"
                                                    className="w-4 h-4"
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-2">
                                                ({item.rating})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-3 text-xs text-gray-500">
                                    <span>{item.location}</span>
                                    <span>{item.openJobs} Open Jobs</span>
                                </div>
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button
                className="swiper-button-prev-1 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-transparent border border-gray-400 rounded-full hover:scale-110 transition duration-200 ease-in-out"
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
                className="swiper-button-next-1 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-transparent border border-gray-400 rounded-full hover:scale-110 transition duration-200 ease-in-out"
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

export default TopRekruterSlider;
