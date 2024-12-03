import { useState, useEffect } from "react";
import Link from "next/link";
import API_BASE_URL from "../../util/config";

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesToShow = 5; // Number of slides to show at once

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

    // Calculate the total number of slides
    const totalSlides = Math.ceil(categories.length / slidesToShow);

    // Move to the next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    // Move to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="relative py-10">
            <div className="overflow-hidden px-3">
                <div
                    className="flex  transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
                >
                    {categories.map((item, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-full md:w-1/3 lg:w-1/5 p-2 "
                        >
                            <div className="bg-white rounded-lg p-4 mx-4 flex items-center justify-center h-52 shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                                <Link href="/jobs-list">
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            {/* Navigation buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-400 transition duration-200 ease-in-out"
            >
                <span className="text-white text-lg font-bold">&lt;</span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-400 transition duration-200 ease-in-out"
            >
                <span className="text-white text-lg font-bold">&gt;</span>
            </button>

        </div>
    );
};

export default CategorySlider;
