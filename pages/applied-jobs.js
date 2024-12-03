import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import Loader from "../components/elements/Loader";
import API_BASE_URL from "../util/config";

export default function JobGrid() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // For tracking the current page
    const jobsPerPage = 10; // Number of jobs to display per page

    const router = useRouter();

    // Fetch the token from localStorage when on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const tokenFromStorage = localStorage.getItem('accessToken');
            setToken(tokenFromStorage);
        }
    }, []);

    // Fetch jobs from the backend
    useEffect(() => {
        const fetchJobs = async () => {
            if (!token) return; // If token is not available yet, do not make the request

            try {
                const response = await fetch(`${API_BASE_URL}jobs/applied`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Pass token here
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setJobs(data); // Assume this is an array of jobs
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (token) {
            fetchJobs();
        }
    }, [token]);

    // Helper function to format salary in "k" format
    function formatSalary(amount) {
        if (amount >= 1000 && amount < 100000) {
            return (amount / 1000).toFixed(0) + 'k'; // For amounts in thousands (e.g., 10k, 15k)
        } else if (amount >= 100000) {
            return (amount / 100000).toFixed(0) + 'L'; // For lakhs if needed
        }
        return amount; // Return the original amount if it doesn't meet conditions
    }

    // Determine the jobs to display on the current page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    // Handle page navigation
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Loading state
    if (loading) {
        return <>
        <Loader/>
        </>;
    }

    // Error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleApplyNowClick = (jobId) => {
        router.push(`/job-details/${jobId}`);
    };

    return (
        <>
            <Layout>
                <div>
                    <section className="mt-8">
                        <div className="container mx-auto">
                            <div className="flex flex-wrap">
                                <div className="w-full">
                                    <div className="content-page">
                                        <div className="box-filters-job">
                                            <div className="flex justify-between">
                                                <div className="flex items-center">
                                                    {/* <span className="text-sm">
                                                        Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> pages
                                                    </span> */}

                                                    <span className="text-lg font-semibold">
                                                        Applied Jobs
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                                            {/* Loop through current jobs and display */}
                                            {currentJobs.map((job) => (
                                                <div key={job.id} className="p-2">
                                                    <div className="bg-white shadow-md shadow-blue-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                                        <div className="flex items-start">
                                                            <div className="flex-none p-4 ">
                                                                <img
                                                                    src={job.company_logo || "assets/imgs/brands/brand-1.png"}
                                                                    alt={job.company_name}
                                                                    className="w-16 h-16 object-contain border rounded-md "
                                                                />
                                                            </div>
                                                            <div className="flex-grow p-4 flex flex-col">
                                                                <Link href={`/company-details/${job.company_id}`} legacyBehavior>
                                                                    <a className="text-lg font-semibold hover:text-blue-600 transition-colors duration-200">{job.company_name}</a>
                                                                </Link>
                                                                <span className="text-sm text-gray-500">{job.location}</span>
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="p-4 border-t border-gray-200">
                                                            <h6>
                                                                <Link href={`/job-details/${job.id}`} legacyBehavior>
                                                                    <a className="font-medium text-lg hover:text-blue-600 transition-colors duration-200">{job.title}</a>
                                                                </Link>
                                                            </h6>
                                                            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                                                                <span>{job.job_type}</span>
                                                                <span>{job.posted_time}</span>
                                                            </div>
                                                            {/* <p className="text-sm text-gray-600 mt-2">{job.description}</p> */}
                                                            <div className="mt-4 flex justify-between items-center">
                                                                <span className="text-lg font-bold">{formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}</span>
                                                                <button
                                                                    className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                    onClick={() => handleApplyNowClick(job.id)}
                                                                >
                                                                    Apply now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    {/* Pagination Controls */}
                                    <div className="flex justify-center mt-25">
                                        <ul className="flex items-center space-x-2">
                                            <li>
                                                <button
                                                    className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                                                    onClick={handlePreviousPage}
                                                    disabled={currentPage === 1} // Disable if on the first page
                                                >
                                                    Prev
                                                </button>
                                            </li>

                                            {/* Pagination Numbers */}
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li key={index + 1}>
                                                    <button
                                                        className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                                                        onClick={() => goToPage(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            <li>
                                                <button
                                                    className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                                                    onClick={handleNextPage}
                                                    disabled={currentPage === totalPages} // Disable if on the last page
                                                >
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>

        </>
    );
}
