import Link from "next/link";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout/Layout";
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/router";
import API_BASE_URL from "../util/config";

// Skill suggestions data
const skillOptions = [
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "AWS", label: "AWS" },
    { value: "Figma", label: "Figma" },
    { value: "Laravel", label: "Laravel" },
    { value: "Golang", label: "Golang" },
];

export default function CandidateProfile() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [profileData, setProfileData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        bio: "",
        website: "",
        position: "",
        country: "",
        state: "",
        city: "",
        zip_code: "",
        profile_pic_url: "",
        skills: [],
    });
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);

    const router = useRouter();

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    const handleApplyNowClick = (jobId) => {
        router.push(`/job-details/${jobId}`);
    };

    // Fetch profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(`${API_BASE_URL}user/user-details`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        phone: data.phone,
                        bio: data.about_me,
                        position: data.position,
                        country: data.country,
                        city: data.city,
                        zip_code: data.address,
                        profile_pic_url: data.profile_pic_url,
                        skills: data.skills || [],
                    });
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    // Fetch applied jobs
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(`${API_BASE_URL}jobs/applied`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAppliedJobs(data);
                }
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            }
        };

        fetchAppliedJobs();
    }, []);

    // Fetch saved jobs
    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(`${API_BASE_URL}jobs/saved`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setSavedJobs(data);
                }
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
            }
        };

        fetchSavedJobs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`${API_BASE_URL}user/user-details/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...profileData,
                    skills: selectedSkills.map((skill) => skill.value),
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setProfileData((prevData) => ({
                    ...prevData,
                    ...updatedData,
                }));
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred while updating the profile");
        } finally {
            setLoading(false);
        }
    };

    const handleProfilePicUpload = async () => {
        const formData = new FormData();
        formData.append("profile_pic", profilePic);

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`${API_BASE_URL}user/upload-profile-pic/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProfileData((prevData) => ({
                    ...prevData,
                    profile_pic_url: data.profile_pic_url,
                }));
                toast.success("Profile picture uploaded successfully!");
            } else {
                toast.error("Failed to upload profile picture");
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            toast.error("An error occurred while uploading the profile picture");
        }
    };

    return (
        <>
            <style jsx>{`
                /* Container for the logo box */
                .logo-box {
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    background-color: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                }

                /* Styling for the logo image inside the box */
                .company-logo {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: cover;
                    mix-blend-mode: multiply;
                }
            `}</style>
            <Layout>
                <div>
                    <ToastContainer />
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-image-single">
                                <img src="assets/imgs/page/candidates/img.png" alt="bugbear" />
                                <a className="btn-editor" href="#" />
                            </div>
                            <div className="box-company-profile">
                                <div className="image-compay">
                                    <img
                                        src={profileData.profile_pic_url}
                                        alt="Profile"
                                    />
                                </div>
                                <div className="row mt-10">
                                    <div className="col-lg-8 col-md-12">
                                        <h5 className="f-18">
                                            {profileData.first_name} {profileData.last_name}{" "}
                                            <span className="card-location font-regular ml-20">
                                                {profileData.city}, {profileData.country}
                                            </span>
                                        </h5>
                                        <p className="mt-0 font-md color-text-paragraph-2 mb-15">
                                            {profileData.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom pt-10 pb-10" />
                        </div>
                    </section>
                    <section className="section-box mt-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-12">
                                    <div className="box-nav-tabs nav-tavs-profile mb-5">
                                        <ul className="nav" role="tablist">
                                            <li>
                                                <a className="btn btn-border aboutus-icon mb-20 active" onClick={() => handleOnClick(1)}>
                                                    My Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a className="btn btn-border recruitment-icon mb-20" onClick={() => handleOnClick(2)}>
                                                    My Jobs
                                                </a>
                                            </li>
                                            <li>
                                                <a className="btn btn-border people-icon mb-20" onClick={() => handleOnClick(3)}>
                                                    Saved Jobs
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="border-bottom pt-10 pb-10" />
                                        <div className="mt-20 mb-20">
                                            <Link href="#">
                                                <button className="link-red">Delete Account</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 col-12 mb-50">
                                    <div className="content-single">
                                        <div className="tab-content">
                                            <div className={`tab-pane fade ${activeIndex === 1 && "show active"}`}>
                                                <h3 className="mt-0 mb-15 color-brand-1">My Account</h3>
                                                <form onSubmit={handleProfileUpdate}>
                                                    <div className="mt-35 mb-40 box-info-profie">
                                                        <div className="image-profile">
                                                            <img
                                                                src={profileData.profile_pic_url || "assets/imgs/page/candidates/candidate-profile.png"}
                                                                alt="Profile Pic"
                                                            />
                                                        </div>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => setProfilePic(e.target.files[0])}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-apply"
                                                            onClick={handleProfilePicUpload}
                                                            disabled={!profilePic}
                                                        >
                                                            Upload Avatar
                                                        </button>
                                                    </div>

                                                    <div className="row form-contact">
                                                        <div className="col-lg-6 col-md-12">
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Full Name *</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="first_name"
                                                                    value={profileData.first_name}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Email *</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="email"
                                                                    value={profileData.email}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Phone</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="phone"
                                                                    value={profileData.phone}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Bio</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows={4}
                                                                    name="bio"
                                                                    value={profileData.bio}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Website</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="website"
                                                                    value={profileData.website}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>

                                                            {/* Skills Section */}
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Skills</label>
                                                                <Select
                                                                    isMulti
                                                                    name="skills"
                                                                    options={skillOptions}
                                                                    value={selectedSkills}
                                                                    onChange={(selected) => setSelectedSkills(selected)}
                                                                    className="basic-multi-select"
                                                                    classNamePrefix="select"
                                                                />
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">Country</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="country"
                                                                            value={profileData.country}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">State</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="state"
                                                                            value={profileData.state}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">City</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="city"
                                                                            value={profileData.city}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">Zip Code</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="zip_code"
                                                                            value={profileData.zip_code}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="box-button mt-15">
                                                            <button
                                                                className="btn btn-apply-big font-md font-bold"
                                                                type="submit"
                                                                disabled={loading}
                                                            >
                                                                {loading ? "Saving..." : "Save All Changes"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
                                                <h3 className="mt-0 color-brand-1 mb-50">My Jobs</h3>
                                                <div className="row display-list">
                                                    {appliedJobs.map((job, index) => (
                                                        <div className="col-xl-12 col-12" key={index}>
                                                            <div className="card-grid-2 hover-up">
                                                                <span className="flash" />
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                                        <div className="card-grid-2-image-left">
                                                                        <div className="card-grid-2-image-left">
    <div className="image-box logo-box">
        <img src={job.company_logo || "assets/imgs/brands/brand-default.png"} alt="bugbear" className="company-logo" />
    </div>
    <div className="right-info" style={{ marginLeft: '15px' }}>  {/* Added marginLeft */}
        <Link legacyBehavior href="#">
            <a className="name-job">{job.company_name}</a>
        </Link>
        <span className="location-small">{job.location}</span>
    </div>
</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                                                                        <div className="pl-15 mb-15 mt-30">
                                                                            {job.skills && job.skills.map((skill, skillIndex) => (
                                                                                <Link legacyBehavior href="#" key={skillIndex}>
                                                                                    <a className="btn btn-grey-small mr-5">{skill}</a>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-block-info">
                                                                    <h4>
                                                                        <Link legacyBehavior href={`/job-details/${job.id}`}>
                                                                            <a>{job.job_title}</a>
                                                                        </Link>
                                                                    </h4>
                                                                    <div className="mt-5">
                                                                        <span className="card-briefcase">{job.job_type}</span>
                                                                        <span className="card-time">
                                                                        <span>{formatDistanceToNow(new Date(job.job_created), { addSuffix: true })}</span>

                                                                        </span>
                                                                    </div>
                                                                    <p className="font-sm color-text-paragraph mt-10">{job.description}</p>
                                                                    <div className="card-2-bottom mt-20">
                                                                        <div className="row">
                                                                            <div className="col-lg-7 col-7">
                                                                                <span className="card-text-price">${job.salary_min}-</span>
                                                                                <span className="card-text-price">${job.salary_max}</span>                                                                                
                                                                            </div>
                                                                            <div className="col-lg-5 col-5 text-end">
                                                                                <div className="btn btn-apply-now" disabled>
                                                                                    Applied
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {appliedJobs.length === 0 && (
                                                    <p>You haven't applied to any jobs yet.</p>
                                                )}
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 3 && "show active"}`}>
                                                <h3 className="mt-0 color-brand-1 mb-50">Saved Jobs</h3>
                                                <div className="row">
                                                    {savedJobs.length > 0 ? (
                                                        savedJobs.map((job, index) => (
                                                            <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                                <div className="card-grid-2 hover-up">
                                                                    <div className="card-grid-2-image-left">
                                                                        <span className="flash" />
                                                                        <div className="card-grid-2-image-left">
    <div className="image-box logo-box">
        <img src={job.company_logo || "assets/imgs/brands/brand-default.png"} alt="bugbear" className="company-logo" />
    </div>
    <div className="right-info" style={{ marginLeft: '15px' }}>  {/* Added marginLeft */}
        <Link legacyBehavior href="#">
            <a className="name-job">{job.company_name}</a>
        </Link>
        <span className="location-small">{job.location}</span>
    </div>
</div>
                                                                    </div>
                                                                    <div className="card-block-info">
                                                                        <h6>
                                                                            <Link legacyBehavior href={`/job-details/${job.id}`}>
                                                                                <a>{job.job_title}</a>
                                                                            </Link>
                                                                        </h6>
                                                                        <div className="mt-5">
                                                                            <span className="card-briefcase">{job.job_type}</span>
                                                                            <span className="card-time">
                                                                            <span>{formatDistanceToNow(new Date(job.job_created), { addSuffix: true })}</span>
                                                                            </span>
                                                                        </div>
                                                                        <p className="font-sm color-text-paragraph mt-15">{job.description}</p>
                                                                        <div className="mt-30">
                                                                            {job.skills && job.skills.map((skill, skillIndex) => (
                                                                                <Link legacyBehavior href="/jobs-grid" key={skillIndex}>
                                                                                    <a className="btn btn-grey-small mr-5">{skill}</a>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                        <div className="card-2-bottom mt-30">
                                                                            <div className="row">
                                                                                <div className="col-lg-7 col-7">
                                                                                <span className="card-text-price">${job.salary_min}-</span>
                                                                                <span className="card-text-price">${job.salary_max}</span> 
                                                                                </div>
                                                                                <div className="col-lg-5 col-5 text-end">
                                                                                    <div className="btn btn-apply-now" onClick={() => handleApplyNowClick(job.id)}>
                                                                                        Apply now
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>You haven't saved any jobs yet.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-20">
                        <div className="container">
                            <div className="box-newsletter">
                                <div className="row">
                                    <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                        <img src="assets/imgs/template/newsletter-left.png" alt="joxBox" />
                                    </div>
                                    <div className="col-lg-12 col-xl-6 col-12">
                                        <h2 className="text-md-newsletter text-center">
                                            New Things Will Always
                                            <br /> Update Regularly
                                        </h2>
                                        <div className="box-form-newsletter mt-40">
                                            <form className="form-newsletter">
                                                <input className="input-newsletter" type="text" placeholder="Enter your email here" />
                                                <button className="btn btn-default font-heading icon-send-letter">Subscribe</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                        <img src="assets/imgs/template/newsletter-right.png" alt="joxBox" />
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
