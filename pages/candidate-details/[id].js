import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookie from 'cookie'; // Import cookie parser to handle cookies
import { fetchCandidateDetails } from "../../util/api"; // Import the API function

export default function CandidateDetails() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;  // Candidate ID from the URL

    const handleOnClick = (index) => setActiveIndex(index);

    // Fetch candidate data from the backend
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  // Wait for the candidate ID from the URL

            // Parse the token from cookies
            const token = cookie.parse(document.cookie).accessToken;

            try {
                const data = await fetchCandidateDetails(id, token);
                setCandidate(data);
            } catch (err) {
                setError("An error occurred while fetching the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Layout>
            <section className="section-box-2">
                <div className="container">
                    <div className="banner-hero banner-image-single">
                        <img src={candidate?.banner_image || "assets/imgs/page/candidates/img.png"} alt="bugbear" />
                    </div>
                    <div className="box-company-profile">
                        <div className="image-compay">
                            <img src={candidate?.profile_pic_url || "assets/imgs/page/candidates/candidate-profile.png"} alt="bugbear" />
                        </div>
                        <div className="row mt-10">
                            <div className="col-lg-8 col-md-12">
                                <h5 className="f-18">
                                    {candidate?.first_name} {candidate?.last_name} <span className="card-location font-regular ml-20">{candidate?.city}, {candidate?.country}</span>
                                </h5>
                                <p className="mt-0 font-md color-text-paragraph-2 mb-15">{candidate?.job_title}</p>
                                <div className="mt-10 mb-15">
                                    {Array(candidate?.rating).fill().map((_, i) => (
                                        <img key={i} src="assets/imgs/template/icons/star.svg" alt="star" />
                                    ))}
                                    <span className="font-xs color-text-muted ml-10">({candidate?.reviews_count})</span>
                                    {candidate?.is_verified && (
                                        <img className="ml-30" src="assets/imgs/page/candidates/verified.png" alt="verified" />
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 text-lg-end">
                                {/* Conditionally render the CV download link */}
                                {candidate?.cv_url ? (
                                    <Link href={candidate.cv_url} legacyBehavior>
                                        <a className="btn btn-download-icon btn-apply btn-apply-big" target="_blank">Download CV</a>
                                    </Link>
                                ) : (
                                    <p>No CV available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="box-nav-tabs mt-40 mb-5">
                        <ul className="nav" role="tablist">
                            <li>
                                <a className={`btn btn-border aboutus-icon mr-15 mb-5 ${activeIndex === 1 ? "active" : ""}`} onClick={() => handleOnClick(1)}>
                                    Short Bio
                                </a>
                            </li>
                            <li>
                                <a className={`btn btn-border recruitment-icon mr-15 mb-5 ${activeIndex === 2 ? "active" : ""}`} onClick={() => handleOnClick(2)}>
                                    Skills
                                </a>
                            </li>
                            <li>
                                <a className={`btn btn-border people-icon mb-5 ${activeIndex === 3 ? "active" : ""}`} onClick={() => handleOnClick(3)}>
                                    Working Experience
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="border-bottom pt-10 pb-10" />
                </div>
            </section>

            <section className="section-box mt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="content-single">
                                <div className="tab-content">
                                    {/* Short Bio */}
                                    <div className={`tab-pane fade ${activeIndex === 1 && "show active"}`}>
                                        <h4>About Me</h4>
                                        <p>{candidate?.about_me}</p>
                                    </div>

                                    {/* Skills */}
                                    <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
                                        <h4>Skills</h4>
                                        <ul>
                                            {candidate?.skills?.map((skill, index) => (
                                                <li key={index}>{skill}</li>
                                            )) || <p>No skills available.</p>}
                                        </ul>
                                    </div>

                                    {/* Working Experience */}
                                    <div className={`tab-pane fade ${activeIndex === 3 && "show active"}`}>
                                        <h4>Work Experience</h4>
                                        <p>{candidate?.work_experience}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar */}
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
                            <div className="sidebar-border">
                                <h5 className="f-18">Overview</h5>
                                <div className="sidebar-list-job">
                                    <ul>
                                        <li>
                                            <div className="sidebar-icon-item">
                                                <i className="fi-rr-briefcase" />
                                            </div>
                                            <div className="sidebar-text-info">
                                                <span className="text-description">Experience</span>
                                                <strong className="small-heading">{candidate?.experience_years} years</strong>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-icon-item">
                                                <i className="fi-rr-dollar" />
                                            </div>
                                            <div className="sidebar-text-info">
                                                <span className="text-description">Expected Salary</span>
                                                <strong className="small-heading">${candidate?.salary_min} - ${candidate?.salary_max}</strong>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-icon-item">
                                                <i className="fi-rr-marker" />
                                            </div>
                                            <div className="sidebar-text-info">
                                                <span className="text-description">Language</span>
                                                <strong className="small-heading">{candidate?.languages?.join(', ')}</strong>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-icon-item">
                                                <i className="fi-rr-time-fast" />
                                            </div>
                                            <div className="sidebar-text-info">
                                                <span className="text-description">Education Level</span>
                                                <strong className="small-heading">{candidate?.education_level}</strong>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-30">
                                    <Link href="page-contact" legacyBehavior>
                                        <a className="btn btn-send-message">Send Message</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
