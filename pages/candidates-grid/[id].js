/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import BlogSlider from "../../components/sliders/Blog";
import cookie from "cookie";
import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { useRouter } from "next/router";
import { fetchCandidateDetails, fetchJobApplicants } from "../../util/api"; // Import the API functions
import API_BASE_URL from "../../util/config";

// Pagination Component
const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const handlePrev = (e) => {
        e.preventDefault();
        handlePageChange(currentPage - 1);
    };

    const handleNext = (e) => {
        e.preventDefault();
        handlePageChange(currentPage + 1);
    };

    return (
        <ul className="pager">
            <li>
                <a
                    className={`pager-prev ${currentPage === 1 ? 'disabled' : ''}`}
                    href="#"
                    onClick={handlePrev}
                >
                    Prev
                </a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                    <Link legacyBehavior href="#">
                        <a
                            className={`pager-number ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(index + 1);
                            }}
                        >
                            {index + 1}
                        </a>
                    </Link>
                </li>
            ))}
            <li>
                <a
                    className={`pager-next ${currentPage === totalPages ? 'disabled' : ''}`}
                    href="#"
                    onClick={handleNext}
                >
                    Next
                </a>
            </li>
            <style jsx>{`
                .pager {
                    list-style: none;
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    padding: 0;
                }

                .pager a {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    color: #0070f3;
                    text-decoration: none;
                    transition: background-color 0.3s ease;
                }

                .pager a:hover:not(.disabled) {
                    background-color: #f0f0f0;
                }

                .pager a.active {
                    background-color: #0070f3;
                    color: white;
                    border-color: #0070f3;
                }

                .pager a.disabled {
                    pointer-events: none;
                    opacity: 0.5;
                }
            `}</style>
        </ul>
    );
};

// Candidate Card Component
const CandidateCard = ({ candidate, handleApprove }) => {
    const appliedDate = format(new Date(candidate.applied_date), 'MM/dd/yyyy HH:mm');

    return (
        <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card-grid-2 hover-up fixed-card-height">
                <div className="card-grid-2-image-left">
                    <div className={`card-grid-2-image-rd ${candidate.user.is_online ? 'online' : 'offline'}`}>
                        <Link legacyBehavior href={`/candidate-details/${candidate.user.id}`}>
                            <a>
                                <figure>
                                    <img alt="bugbear" src={candidate.user.profile_pic} />
                                </figure>
                            </a>
                        </Link>
                    </div>
                    <div className="card-profile pt-10">
                        <Link legacyBehavior href={`/candidate-details/${candidate.user.id}`}>
                            <a>
                                <h5>{candidate.user.first_name} {candidate.user.last_name}</h5>
                            </a>
                        </Link>
                        <span className="font-xs color-text-muted">{candidate.user.position}</span>
                    </div>
                </div>
                <div className="card-block-info">
                    <p className="font-xs color-text-paragraph-2">
                        {candidate.user.about_me}
                    </p>
                    <div className="employers-info align-items-center justify-content-center mt-15">
                        <div className="row">
                            <div className="col-6">
                                <span className="d-flex align-items-center">
                                    <i className="fi-rr-marker mr-5 ml-0" />
                                    <span className="font-sm color-text-muted">{candidate.user.city}, {candidate.user.country}</span>
                                </span>
                            </div>
                            <div className="col-6">
                                <span className="d-flex justify-content-end align-items-center">
                                    <i className="fi-rr-phone mr-5" />
                                    <span className="font-sm color-brand-1">Applied on: {appliedDate}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        {/* Approve or Disapprove Button */}
                        {!candidate.is_approved ? (
                            <button
                                className="btn btn-apply-icon btn-apply btn-apply-big hover-up"
                                onClick={() => handleApprove(candidate.user.id, true)}
                            >
                                Approve
                            </button>
                        ) : (
                            <button
                                className="btn btn-apply-icon btn-apply btn-apply-big hover-up"
                                onClick={() => handleApprove(candidate.user.id, false)}
                            >
                                Disapprove
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .fixed-card-height {
                    height: 400px; /* Fixed height for the card */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .card-grid-2-image-left {
                    position: relative;
                    padding: 10px;
                    display: flex;
                    justify-content: center;
                }

                .card-grid-2-image-left figure {
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    border-radius: 50%;
                    border: 2px solid #f0f0f0;
                }

                .card-grid-2-image-left img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-profile {
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

// Candidate Grid Page Component
export default function CandidateGrid({ initialApplicants, jobId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [applicants, setApplicants] = useState(initialApplicants);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Calculate total pages
    const totalPages = Math.ceil(applicants.length / itemsPerPage);

    // Get the current page applicants
    const currentApplicants = applicants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Function to fetch applicants based on search term
    const fetchApplicants = useCallback(async (searchTerm) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const token = cookie.parse(document.cookie).accessToken;
            const payload = { searchTerm };

            const response = await fetch(`${API_BASE_URL}jobs/applicants/${jobId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch applicants: ${response.statusText}`);
            }

            const data = await response.json();
            setApplicants(data);
            setCurrentPage(1); // Reset to first page on new fetch
        } catch (error) {
            console.error("Error fetching applicants:", error);
            setError("Failed to load applicants. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [jobId]);

    // Approve or Disapprove a candidate
    const handleApprove = async (candidateId, isApproved) => {
        try {
            const token = cookie.parse(document.cookie).accessToken;
            const response = await fetch(`${API_BASE_URL}jobs/apply/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    job_id: jobId,
                    user_id: candidateId,
                    is_approved: isApproved,
                }),
            });

            if (response.ok) {
                // Update the applicant's approval status locally
                setApplicants((prevApplicants) =>
                    prevApplicants.map((applicant) =>
                        applicant.user.id === candidateId
                            ? { ...applicant, is_approved: isApproved } // Update the specific applicant's approval status
                            : applicant
                    )
                );
            } else {
                throw new Error(`Failed to update approval status: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error updating approval status:", error);
        }
    };

    // Debounce search input to prevent excessive API calls
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchApplicants(searchTerm.trim());
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchApplicants]);

    return (
        <>
            <Layout>
                <div>
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-company">
                                <div className="block-banner text-center">
                                    <h3 className="wow animate__animated animate__fadeInUp">Browse Candidates</h3>
                                    <div className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                        Explore applicants who applied for this job.
                                    </div>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by name, position, or city"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-30">
                        <div className="container">
                            <div className="content-page">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p className="error-message">{error}</p>
                                ) : applicants.length === 0 ? (
                                    <p>No candidates found.</p>
                                ) : (
                                    <div className="row">
                                        {currentApplicants.map((candidate, index) => (
                                            <CandidateCard
                                                candidate={candidate}
                                                key={candidate.id || index}
                                                handleApprove={handleApprove}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {totalPages > 1 && (
                                <div className="paginations">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        handlePageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-50">
                        <div className="container">
                            <div className="text-start">
                                <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">News and Blog</h2>
                                <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Get the latest news, updates, and tips</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="mt-50">
                                <div className="box-swiper style-nav-top">
                                    <BlogSlider />
                                </div>
                                <div className="text-center">
                                    <Link legacyBehavior href="blog-grid">
                                        <a className="btn btn-brand-1 btn-icon-load mt--30 hover-up">Load More Posts</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
            <style jsx>{`
                .error-message {
                    color: red;
                    text-align: center;
                    margin-top: 20px;
                }
            `}</style>
        </>
    );
}

// Fetch data from the API
export async function getServerSideProps(context) {
    const { id } = context.query;  // Get job_id from query parameters

    try {
        const cookies = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};
        const token = cookies.accessToken;

        const res = await fetch(`${API_BASE_URL}jobs/applicants/${id}/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch applicants: ${res.status}`);
        }

        const applicants = await res.json();
        console.log("Applicants:", applicants);

        return {
            props: { initialApplicants: applicants, jobId: id },
        };
    } catch (error) {
        console.error("Error fetching job applicants:", error);

        return {
            props: { initialApplicants: [], jobId: id },
        };
    }
}
