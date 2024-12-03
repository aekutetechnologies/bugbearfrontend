import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);

const data = [
    {
        img: "1.png",
        title: "Avy"
    },
    {
        img: "2.png",
        title: "Mark"
    },
    {
        img: "2.png",
        title: "Mark"
    }
];

const TopRekruterSlider = () => {
    return (
        <>
            <div className="swiper-container swiper-group-1 swiper-style-2">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    navigation={{
                        prevEl: ".swiper-button-prev-1",
                        nextEl: ".swiper-button-next-1"
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        575: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        767: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        991: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        1199: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        }
                    }}
                    className="swiper-wrapper pt-5 "
                >
                    <div>
                    <button
                // onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-400 transition duration-200 ease-in-out"
            >
                <span className="text-white text-lg font-bold">&lt;</span>
            </button>
            <button
                // onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-400 transition duration-200 ease-in-out"
            >
                <span className="text-white text-lg font-bold">&gt;</span>
            </button>

                    </div>
                    {data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="swiper-slide ">
                                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5  p-3 ">
                                    {/* Item 1 */}
                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="LinkedIn" src="/assets/imgs/brands/brand-1.png" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">LinkedIn</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(68)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>25 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Adobe" src="/assets/imgs/brands/brand-2.png" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Adobe</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(42)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>17 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-3.png" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Dailymotion</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Item 4 */}
                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-4.png" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">NewSum</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(68)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Item 5 */}
                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-5.png" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">PowerHome</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Item 5 */}
                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-7.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">GreeWood</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Item 5 */}
                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-8.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Kentucky</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-9.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Qeuity</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-10.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Honda</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-5.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Toyota</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-3.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Lexuxs</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-6.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Honda</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>


                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-2.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Squre</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-8.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Vista</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn">
                                        <a href="#">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16">
                                                    <img alt="Dailymotion" src="/assets/imgs/brands/brand-3.png"/>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold">Lexuxs</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <img key={i} alt="star" src="/assets/imgs/template/icons/star.svg" />
                                                        ))}
                                                        <span className="text-xs text-gray-500 ml-2">(46)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                <span>New York, US</span>
                                                <span>65 Open Jobs</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
            </div>
            {/* <div className="swiper-button-next swiper-button-next-1" />
            <div className="swiper-button-prev swiper-button-prev-1" /> */}

            
        </>
    );
};

export default TopRekruterSlider;
// import SwiperCore, { Autoplay, Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// SwiperCore.use([Autoplay, Navigation]);

// const data = [
//     {
//         img: "1.png",
//         title: "Avy"
//     },
//     {
//         img: "2.png",
//         title: "Mark"
//     },
//     {
//         img: "2.png",
//         title: "Mark"
//     }
// ];

// const TopRekruterSlider = () => {
//     return (
//         <>
//             <div className="swiper-container swiper-group-1 swiper-style-2">
//                 <Swiper
//                     slidesPerView={5}
//                     spaceBetween={30}
//                     navigation={{
//                         prevEl: ".swiper-button-prev-1",
//                         nextEl: ".swiper-button-next-1"
//                     }}
//                     breakpoints={{
//                         320: {
//                             slidesPerView: 1,
//                             spaceBetween: 30
//                         },
//                         575: {
//                             slidesPerView: 1,
//                             spaceBetween: 30
//                         },
//                         767: {
//                             slidesPerView: 1,
//                             spaceBetween: 30
//                         },
//                         991: {
//                             slidesPerView: 1,
//                             spaceBetween: 30
//                         },
//                         1199: {
//                             slidesPerView: 1,
//                             spaceBetween: 30
//                         }
//                     }}
//                     className="swiper-wrapper pt-5"
//                 >
//                     {data.map((item, i) => (
//                         <SwiperSlide key={i}>
//                             <div className="swiper-slide">
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-1.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Linkedin</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>68</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     25<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-2.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Adobe</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>42</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     17<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-3.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Dailymotion</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>46</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     65<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-4.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>NewSum</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>68</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     25<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-5.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>PowerHome</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>87</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     34<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-6.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Whop.com</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>34</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     56<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-7.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Greewood</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>124</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     78<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-8.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Kentucky</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>54</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     98<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-9.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Qeuity</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>76</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     9<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-10.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Honda</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>89</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     34<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-5.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Toyota</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>34</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     26<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-3.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Lexuxs</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>27</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     54<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-6.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Ondo</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>54</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     58<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-2.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Square</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>16</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     37<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="item-5 hover-up wow animate__animated animate__fadeIn">
//                                     <a href="#">
//                                         <div className="item-logo">
//                                             <div className="image-left">
//                                                 <img alt="bugbear" src="/assets/imgs/brands/brand-8.png" />
//                                             </div>
//                                             <div className="text-info-right">
//                                                 <h4>Vista</h4>
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <img alt="bugbear" src="/assets/imgs/template/icons/star.svg" />
//                                                 <span className="font-xs color-text-mutted ml-10">
//                                                     <span>(</span>
//                                                     <span>97</span>
//                                                     <span>)</span>
//                                                 </span>
//                                             </div>
//                                             <div className="text-info-bottom mt-5">
//                                                 <span className="font-xs color-text-mutted icon-location">New York, US</span>
//                                                 <span className="font-xs color-text-mutted float-end mt-5">
//                                                     43<span> Open Jobs</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//             <div className="swiper-button-next swiper-button-next-1" />
//             <div className="swiper-button-prev swiper-button-prev-1" />
//         </>
//     );
// };

// export default TopRekruterSlider;
