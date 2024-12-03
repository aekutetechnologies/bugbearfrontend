import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns"; // Import the date-fns function

SwiperCore.use([Navigation]);

const FeaturedSlider = ({ featuredJobs }) => {
    const getRelativeTime = (jobCreated) => {
        const jobDate = new Date(jobCreated); // Parse job creation date
        return formatDistanceToNow(jobDate, { addSuffix: true }); // Get relative time (e.g., '3 days ago')
    };

    function formatSalary(amount) {
        if (amount >= 1000 && amount < 100000) {
            return (amount / 1000).toFixed(0) + 'k'; // For amounts in thousands (e.g., 10k, 15k)
        } else if (amount >= 100000) {
            return (amount / 100000).toFixed(0) + 'L'; // For lakhs if needed
        }
        return amount; // Return the original amount if it doesn't meet conditions
    }

    return (

        <div className="swiper-container swiper-group-4">
        <Swiper
            spaceBetween={30}
            loop={true}
            navigation={{
                prevEl: ".swiper-button-prev-4",
                nextEl: ".swiper-button-next-4",
            }}
            className="pb-10 pt-5"
            breakpoints={{
                320: { // Small devices (phones, portrait)
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: { // Small devices (phones, landscape)
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: { // Medium devices (tablets)
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: { // Large devices (desktops)
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }}
        >
            {featuredJobs && featuredJobs.length > 0 ? (
                featuredJobs.map((job) => (
                    <SwiperSlide key={job.id}>
                        <div className="h-fit flex flex-col bg-white shadow-md shadow-blue-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center p-4">
                                <span className="flash" />
                                <div className="relative w-20 h-12 mr-4">
                                    <div className="absolute inset-0 bg-gray-200 rounded-md overflow-hidden">
                                        <img
                                            src={job.company_logo || "/assets/imgs/brands/default-logo.png"}
                                            alt="Company Logo"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Link href={`/company-details/${job.companyId}`} legacyBehavior>
                                        <a className="text-lg font-semibold text-blue-600 hover:underline">
                                            {job.company_name || "Company Name"}
                                        </a>
                                    </Link>
                                    <span className="text-sm text-gray-500">
                                        {job.location || "Location not provided"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col p-4">
                                <div className="h-[100px]">
                                    <Link href={`/job-details/${job.id}`} legacyBehavior>
                                        <a className="text-lg font-bold py-2 hover:text-blue-700 transition-colors duration-300">
                                            {job.title || "Job Title"}
                                        </a>
                                    </Link>
                                </div>
                                <div className="mt-5 flex justify-between text-sm text-gray-700">
                                    <span>{job.jobType || "Full time"}</span>
                                    <span className="text-gray-500">
                                        {getRelativeTime(job.job_created)}
                                    </span>
                                </div>
                                <div className="mt-6 flex justify-between">
                                    <span className="font-semibold">
                                        ₹{formatSalary(job.salary_min)} - ₹{formatSalary(job.salary_max)}
                                    </span>
                                    <Link href={`/job-details/${job.id}`} legacyBehavior>
                                        <a className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                                            Apply now
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <div className="text-center text-gray-500">
                    No featured jobs available
                </div>
            )}
        </Swiper>
    
        <div className="swiper-button-next swiper-button-next-4" />
        <div className="swiper-button-prev swiper-button-prev-4" />
    </div>
    

    );
};

export default FeaturedSlider;
