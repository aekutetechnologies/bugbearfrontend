﻿import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import BlogSlider from "./../components/sliders/Blog";
import { useRouter } from "next/router";
import { formatDistanceToNow } from 'date-fns';
import API_BASE_URL from "../util/config";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [filters, setFilters] = useState({
        category: [],
        salaryRange: [],
        experienceLevel: [],
        jobType: [],
    });
    const [jobCount, setJobCount] = useState(0);
    // const [token, setToken] = useState(null);
    const [salaryRange, setSalaryRange] = useState([0, 200000]);

    const router = useRouter();
    const { keyword, category } = router.query;

    // Capture the keyword from the query and pass it to searchQuery
    useEffect(() => {
        if (router.isReady) {
            if (keyword) {
                console.log("Keyword from Query:", keyword);
                setSearchQuery(keyword);
            }
            if (category) {
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    category: [category],
                }));
            }
        }
    }, [router.isReady, keyword, category]);
    

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('accessToken');
    //     setToken(storedToken);
    // }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}jobs/search/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: searchQuery || "",
                    page: page,
                    page_size: pageSize,
                    category: filters.category.length ? filters.category : [],
                    salaryRange: filters.salaryRange,
                    experienceLevel: filters.experienceLevel,
                    jobType: filters.jobType,
                }),
            });
    
            const data = await res.json();
    
            if (data && data.results) {
                setJobs(data.results);
                setJobCount(data.count);
                
                // If fewer results than page size, we're on the last page
                if (data.results.length < pageSize) {
                    // Optionally adjust page to last possible page
                    const lastPage = Math.ceil(data.count / pageSize);
                    setPage(lastPage);
                }
            } else {
                setJobs([]);
                setJobCount(0);
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
            setJobs([]);
            setJobCount(0);
        }
        setLoading(false);
    };

    // Trigger fetchJobs whenever the filters or page changes
    useEffect(() => {
        // if (token) {
            fetchJobs();
        // }
    }, [filters, page, searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;

        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (checked) {
                updatedFilters[name] = [...prevFilters[name], value];
            } else {
                updatedFilters[name] = prevFilters[name].filter((filterValue) => filterValue !== value);
            }
            return updatedFilters;
        });
    };

    const handleFilterApply = (e) => {
        e.preventDefault();
        fetchJobs(); // Call the API when the apply button is clicked
    };

    // Reset filters to their default values (empty arrays)
    const resetFilters = () => {
        setFilters({
            category: [],
            salaryRange: [],
            experienceLevel: [],
            jobType: [],
        });
    };

    // Function to handle redirect when "Apply now" is clicked
    const handleApplyNowClick = (jobId) => {
        router.push(`/job-details/${jobId}`);
    };

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
        <>
            <Layout>
                <div>
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-single banner-single-bg">
                                <div className="block-banner text-center">
                                    <h3 className="wow animate__animated animate__fadeInUp">
                                        <span className="color-brand-2">{jobCount || 0} Jobs</span> Available Now
                                    </h3>
                                    <div className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                        Find jobs tailored to your experience and preferences.
                                    </div>
                                    <div className="form-find text-start mt-40 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                                        <form onSubmit={handleSearch}>
                                            <input
                                                className="form-input input-keysearch mr-10"
                                                type="text"
                                                placeholder="Your keyword..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <button className="btn btn-default btn-find font-sm" type="submit">
                                                Search
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section-box mt-30">
                        <div className="container">
                            <div className="row flex-row-reverse">
                                <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
                                    <div className="content-page">
                                        {loading ? (
                                            <p>Loading jobs...</p>
                                        ) : jobs.length === 0 ? (
                                            <p>No jobs found.</p>
                                        ) : (
                                            <>
                                                <div className="row display-list">
                                                    {jobs?.map((job) => (
                                                        <div key={job.id} className="col-xl-12 col-12">
                                                            <div className="card-grid-2 hover-up">
                                                                <span className="flash" />
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                                        <div className="card-grid-2-image-left">
                                                                            <div className="image-box">
                                                                                <img src="assets/imgs/brands/brand-1.png" alt="bugbear" />
                                                                            </div>
                                                                            <div className="right-info">
                                                                                <Link href={`/job-details/${job.id}`} className="name-job">
                                                                                    {job.company_name}
                                                                                </Link>
                                                                                <span className="location-small">{job.location}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                                                                        <div className="pl-15 mb-15 mt-30">
                                                                            <Link href="#" className="btn btn-grey-small mr-5">{job.category}</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-block-info">
                                                                    <h4>
                                                                        <Link href={`/job-details/${job.id}`}>{job.title}</Link>
                                                                    </h4>
                                                                    <div className="mt-5">
                                                                        <span className="card-briefcase">{job.job_type}</span>
                                                                        <span className="card-time">
                                                                            <span>{getRelativeTime(job.job_created)}</span>
                                                                        </span>
                                                                    </div>
                                                                    {/* <p className="font-sm color-text-paragraph mt-10">
                                                                        {job.description}
                                                                    </p> */}
                                                                    {/* <p dangerouslySetInnerHTML={{ __html: job.description || "Job description not available." }} /> */}
                                                                    <div className="card-2-bottom mt-20">
                                                                        <div className="row">
                                                                            <div className="col-lg-7 col-7">
                                                                                <span className="card-text-price">₹{formatSalary(job.salary_min)}</span>
                                                                                <span className="text-muted">-</span>
                                                                                <span className="card-text-price">₹{formatSalary(job.salary_max)}</span>
                                                                            </div>

                                                                            <div className="col-lg-5 col-5 text-end">
                                                                                <button
                                                                                    className="btn btn-apply-now"
                                                                                    onClick={() => handleApplyNowClick(job.id)}
                                                                                >
                                                                                    View Job
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {jobs.length > 0 && (
                                                    <div className="paginations">
                                                        <ul className="pager">
                                                            <li>
                                                                <button 
                                                                    className={`pager-prev ${page === 1 ? 'disabled' : ''}`} 
                                                                    onClick={() => page > 1 && setPage(page - 1)}
                                                                    disabled={page === 1}
                                                                >
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <span className="pager-number">{page}</span>
                                                            </li>
                                                            <li>
                                                                <button 
                                                                    className={`pager-next ${jobs.length < pageSize ? 'disabled' : ''}`} 
                                                                    onClick={() => jobs.length === pageSize && setPage(page + 1)}
                                                                    disabled={jobs.length < pageSize}
                                                                >
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Sidebar with filters */}
                                <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div className="sidebar-shadow none-shadow mb-30">
                                        <div className="sidebar-filters">
                                            {/* Apply and Reset Filter Buttons */}
                                            <div className="d-flex justify-content-between mb-20">
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={resetFilters}
                                                >
                                                    Reset Filters
                                                </button>
                                            </div>

                                            {/* Category Filter */}
                                            <div className="filter-block mb-30">
                                                <h5 className="medium-heading mb-15">Category</h5>
                                                <ul className="list-checkbox">
                                                    {[
                                                        "DevSecOps",
                                                        "Cloud Security",
                                                        "Security Auditing",
                                                        "Web Application Security",
                                                        "Vulnerability Management",
                                                        "VPAT",
                                                        "Network Security",
                                                        "Physical Red Teaming",
                                                        "Physical Security",
                                                        "WebProxy",
                                                        "EDR/XDR",
                                                        "SOCaaS",
                                                        "AD Security/AD Pentesting"
                                                    ].map((category) => (
                                                        <li key={category}>
                                                            <label className="cb-container">
                                                                <input
                                                                    type="checkbox"
                                                                    name="category"
                                                                    value={category}
                                                                    checked={filters.category.includes(category)}
                                                                    onChange={handleFilterChange}
                                                                />
                                                                <span className="text-small">{category}</span>
                                                                <span className="checkmark" />
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Salary Range Filter */}
                                            <div className="filter-block mb-30">
                                                <h5 className="medium-heading mb-15">Salary Range</h5>
                                                <ul className="list-checkbox">
                                                    {[
                                                        { label: "0k - 20k", value: "0-20000" },
                                                        { label: "20k - 40k", value: "20000-40000" },
                                                        { label: "40k - 60k", value: "40000-60000" },
                                                        { label: "60k - 80k", value: "60000-80000" },
                                                        { label: "80k - 100k", value: "80000-100000" },
                                                        { label: "100k - 200k", value: "100000-200000" },
                                                    ].map((range) => (
                                                        <li key={range.value}>
                                                            <label className="cb-container">
                                                                <input
                                                                    type="checkbox"
                                                                    name="salaryRange"
                                                                    value={range.value}
                                                                    checked={filters.salaryRange.includes(range.value)}
                                                                    onChange={handleFilterChange}
                                                                />
                                                                <span className="text-small">{range.label}</span>
                                                                <span className="checkmark" />
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Experience Level Filter */}
                                            <div className="filter-block mb-30">
                                                <h5 className="medium-heading mb-15">Experience Level</h5>
                                                <ul className="list-checkbox">
                                                    {["Internship", "Entry Level", "Associate", "Mid Level", "Director", "Executive"].map((level) => (
                                                        <li key={level}>
                                                            <label className="cb-container">
                                                                <input
                                                                    type="checkbox"
                                                                    name="experienceLevel"
                                                                    value={level}
                                                                    checked={filters.experienceLevel.includes(level)}
                                                                    onChange={handleFilterChange}
                                                                />
                                                                <span className="text-small">{level}</span>
                                                                <span className="checkmark" />
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Job Type Filter */}
                                            <div className="filter-block mb-30">
                                                <h5 className="medium-heading mb-15">Job Type</h5>
                                                <ul className="list-checkbox">
                                                    {["Full Time", "Part Time", "Remote Jobs", "Freelancer"].map((type) => (
                                                        <li key={type}>
                                                            <label className="cb-container">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobType"
                                                                    value={type}
                                                                    checked={filters.jobType.includes(type)}
                                                                    onChange={handleFilterChange}
                                                                />
                                                                <span className="text-small">{type}</span>
                                                                <span className="checkmark" />
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
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
