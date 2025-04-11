/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import BlogSlider from "../components/sliders/Blog";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import API_BASE_URL from "../util/config";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState({
    category: [],
    salaryRange: [],
    experienceLevel: [],
    jobType: [],
  });
  const [jobCount, setJobCount] = useState(0);
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);

  const router = useRouter();
  const { keyword, category } = router.query;

  useEffect(() => {
    if (router.isReady) {
      if (keyword) {
        setSearchQuery(keyword.toString());
      }
      if (category) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          category: [category.toString()],
        }));
      }
    }
  }, [router.isReady, keyword, category]);

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
        if (data.results.length < pageSize) {
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

  useEffect(() => {
    fetchJobs();
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
        updatedFilters[name] = prevFilters[name].filter(
          (filterValue) => filterValue !== value
        );
      }
      return updatedFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      category: [],
      salaryRange: [],
      experienceLevel: [],
      jobType: [],
    });
  };

  const handleApplyNowClick = (jobId) => {
    router.push(`/job-details/${jobId}`);
  };

  const getRelativeTime = (jobCreated) => {
    const jobDate = new Date(jobCreated);
    return formatDistanceToNow(jobDate, { addSuffix: true });
  };

  function formatSalary(amount) {
    if (amount >= 1000 && amount < 100000) {
      return (amount / 1000).toFixed(0) + "k";
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(0) + "L";
    }
    return amount;
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
                    <span className="color-brand-2">
                      {jobCount || 0} Jobs
                    </span>{" "}
                    Available Now
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
                <div className="col-lg-9 col-md-12 col-sm-12 col-12">
                  <div className="content-page">
                    <div className="box-filters-job">
                      <div className="row">
                        <div className="col-xl-6 col-lg-5">
                          <span className="text-small text-showing">
                            Showing <strong>{jobs.length}</strong> jobs of <strong>{jobCount}</strong> results
                          </span>
                        </div>
                        <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
                          <div className="display-flex2">
                            <div className="box-border mr-10">
                              <span className="text-sortby">Show:</span>
                              <div className="dropdown dropdown-sort">
                                <button className="btn dropdown-toggle" type="button" id="dropdownSort" data-bs-toggle="dropdown" aria-expanded="false">
                                  <span>{pageSize}</span> <i className="fi-rr-angle-small-down"></i>
                                </button>
                              </div>
                            </div>
                            <button 
                              className="btn btn-filters-job d-block d-md-none" 
                              onClick={() => setShowFilters(!showFilters)}
                            >
                              <i className="fi-rr-filter mr-5"></i>Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

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
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="card-grid-2-image-left">
                                      <div className="image-box">
                                        <img
                                          src="assets/imgs/brands/brand-1.png"
                                          alt="bugbear"
                                        />
                                      </div>
                                      <div className="right-info">
                                        <Link
                                          href={`/job-details/${job.id}`}
                                          className="name-job"
                                        >
                                          {job.company_name}
                                        </Link>
                                        <span className="location-small">
                                          {job.location}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                                    <div className="pl-15 mb-15 mt-30">
                                      <Link
                                        href="#"
                                        className="btn btn-grey-small mr-5"
                                      >
                                        {job.category}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-block-info">
                                  <h4>
                                    <Link href={`/job-details/${job.id}`}>
                                      {job.title}
                                    </Link>
                                  </h4>
                                  <div className="mt-5">
                                    <span className="card-briefcase">
                                      {job.job_type}
                                    </span>
                                    <span className="card-time">
                                      <span>
                                        {getRelativeTime(job.job_created)}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="card-2-bottom mt-20">
                                    <div className="row">
                                      <div className="col-lg-7 col-7">
                                        <span className="card-text-price">
                                          ₹{formatSalary(job.salary_min)}
                                        </span>
                                        <span className="text-muted">-</span>
                                        <span className="card-text-price">
                                          ₹{formatSalary(job.salary_max)}
                                        </span>
                                      </div>

                                      <div className="col-lg-5 col-5 text-end">
                                        <button
                                          className="btn btn-apply-now"
                                          onClick={() =>
                                            handleApplyNowClick(job.id)
                                          }
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
                          <div className="pagination-container mt-30">
                            <div className="pagination-info text-center mb-10">
                              <p>Showing page {page} of {Math.ceil(jobCount / pageSize)} · {jobCount} total results</p>
                            </div>
                            <div className="pagination-controls">
                              <div className="pagination-scroller">
                                <button
                                  className={`pagination-button ${page === 1 ? 'pagination-disabled' : 'pagination-active'}`}
                                  onClick={() => page > 1 && setPage(1)}
                                  disabled={page === 1}
                                  aria-label="First page"
                                >
                                  <i className="fi-rr-angle-double-left"></i>
                                </button>
                                <button
                                  className={`pagination-button ${page === 1 ? 'pagination-disabled' : 'pagination-active'}`}
                                  onClick={() => page > 1 && setPage(page - 1)}
                                  disabled={page === 1}
                                  aria-label="Previous page"
                                >
                                  <i className="fi-rr-angle-left"></i> Prev
                                </button>
                                
                                <div className="pagination-pages">
                                  {Array.from({ length: Math.min(10, Math.ceil(jobCount / pageSize)) }, (_, i) => {
                                    let pageNum;
                                    const totalPages = Math.ceil(jobCount / pageSize);
                                    
                                    if (totalPages <= 10) {
                                      pageNum = i + 1;
                                    } else if (page <= 5) {
                                      pageNum = i + 1;
                                    } else if (page >= totalPages - 5) {
                                      pageNum = totalPages - 9 + i;
                                    } else {
                                      pageNum = page - 4 + i;
                                    }
                                    
                                    return pageNum > 0 && pageNum <= totalPages ? (
                                      <button
                                        key={pageNum}
                                        className={`pagination-number ${pageNum === page ? 'pagination-current' : ''}`}
                                        onClick={() => setPage(pageNum)}
                                      >
                                        {pageNum}
                                      </button>
                                    ) : null;
                                  })}
                                </div>
                                
                                <button
                                  className={`pagination-button ${jobs.length < pageSize ? 'pagination-disabled' : 'pagination-active'}`}
                                  onClick={() => jobs.length === pageSize && setPage(page + 1)}
                                  disabled={jobs.length < pageSize}
                                  aria-label="Next page"
                                >
                                  Next <i className="fi-rr-angle-right"></i>
                                </button>
                                <button
                                  className={`pagination-button ${jobs.length < pageSize ? 'pagination-disabled' : 'pagination-active'}`}
                                  onClick={() => jobs.length === pageSize && setPage(Math.ceil(jobCount / pageSize))}
                                  disabled={jobs.length < pageSize || page === Math.ceil(jobCount / pageSize)}
                                  aria-label="Last page"
                                >
                                  <i className="fi-rr-angle-double-right"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className={`col-lg-3 col-md-12 col-sm-12 col-12 filter-section ${showFilters ? 'active' : ''}`}>
                  <div className="sidebar-shadow none-shadow mb-30">
                    <div className="sidebar-filters">
                      <div className="filter-header">
                        <div className="d-flex justify-content-between align-items-center mb-20">
                          <h5 className="font-semibold">Filters</h5>
                          <div>
                            <button
                              className="btn btn-sm btn-outline-danger me-2 d-inline-block d-md-none"
                              onClick={() => setShowFilters(false)}
                            >
                              <i className="fi-rr-cross-small"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={resetFilters}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="filter-content">
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
                              "AD Security/AD Pentesting",
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
                                    checked={filters.salaryRange.includes(
                                      range.value
                                    )}
                                    onChange={handleFilterChange}
                                  />
                                  <span className="text-small">
                                    {range.label}
                                  </span>
                                  <span className="checkmark" />
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="filter-block mb-30">
                          <h5 className="medium-heading mb-15">
                            Experience Level
                          </h5>
                          <ul className="list-checkbox">
                            {[
                              "Internship",
                              "Entry Level",
                              "Associate",
                              "Mid Level",
                              "Director",
                              "Executive",
                            ].map((level) => (
                              <li key={level}>
                                <label className="cb-container">
                                  <input
                                    type="checkbox"
                                    name="experienceLevel"
                                    value={level}
                                    checked={filters.experienceLevel.includes(
                                      level
                                    )}
                                    onChange={handleFilterChange}
                                  />
                                  <span className="text-small">{level}</span>
                                  <span className="checkmark" />
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>

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
            </div>
          </section>
        </div>
      </Layout>
      <div className={`filter-overlay ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(false)}></div>
      <style jsx>{`
        .pagination-container {
          width: 100%;
          margin: 25px 0;
        }
        
        .pagination-info {
          color: #66789c;
          font-size: 14px;
        }
        
        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        
        .pagination-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 15px;
          border: 1px solid #e0e6f7;
          background-color: #ffffff;
          color: #4f5e74;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .pagination-button i {
          margin: 0 4px;
        }
        
        .pagination-active:hover {
          background-color: #3457d5;
          color: white;
          border-color: #3457d5;
        }
        
        .pagination-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pagination-scroller {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding: 10px 0;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          max-width: 100%;
        }
        
        .pagination-scroller::-webkit-scrollbar {
          height: 4px;
        }
        
        .pagination-scroller::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .pagination-scroller::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        
        .pagination-scroller::-webkit-scrollbar-thumb:hover {
          background: #3457d5;
        }
        
        .pagination-pages {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
        }
        
        /* Filter styles */
        .filter-section {
          transition: all 0.3s ease;
        }
        
        .filter-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 998;
          display: none;
        }
        
        .filter-overlay.active {
          display: block;
        }
        
        .filter-header {
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
          padding-top: 15px;
          border-bottom: 1px solid #e0e6f7;
        }
        
        .filter-content {
          max-height: calc(100vh - 150px);
          overflow-y: auto;
          padding-right: 10px;
          scrollbar-width: thin;
        }
        
        .filter-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .filter-content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .filter-content::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        
        .filter-content::-webkit-scrollbar-thumb:hover {
          background: #3457d5;
        }
        
        @media (max-width: 991px) {
          .filter-section {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            z-index: 999;
            height: 80vh;
            max-height: 80vh;
            transform: translateY(100%);
            box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            padding: 15px;
          }
          
          .filter-section.active {
            transform: translateY(0);
          }
          
          .sidebar-filters {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .filter-content {
            flex: 1;
            overflow-y: auto;
          }
          
          .btn-filters-job {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 997;
            background: #3457d5;
            color: white;
            border-radius: 30px;
            padding: 10px 20px;
            box-shadow: 0 4px 12px rgba(52, 87, 213, 0.3);
          }
        }
      `}</style>
    </>
  );
}
