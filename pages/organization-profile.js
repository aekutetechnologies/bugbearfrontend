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
                    console.log(profileData);
                    
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


    const handleCompanyLogoUpload = async () => {
        const formData = new FormData();
        formData.append("company_logo", companyLogo); // Upload company logo

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`${API_BASE_URL}user/upload-company-logo/`, {
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
                    company_logo_url: data.company_logo_url, // Update the company logo URL in the profile data
                }));
                toast.success("Company logo uploaded successfully!");
            } else {
                toast.error("Failed to upload company logo");
            }
        } catch (error) {
            console.error("Error uploading company logo:", error);
            toast.error("An error occurred while uploading the company logo");
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
                            <img src="assets/imgs/page/candidates/img.png" alt="Organization profile" />
                        </div>
                        <div className="box-company-profile">
                            <div className="w-[200px]  image-compay">
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
                                            {/* {profileData.city}, {profileData.country} */}
                                            {profileData.city && profileData.country ? (
                                                <>
                                                {profileData.city}, {profileData.country} 
                                                </>
                                            ):(
                                                <span className="text-red-500">* updated</span>
                                            )}
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
                                            <a className="btn btn-border aboutus-icon mb-20 active">
                                                My Profile
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
                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="box-info-profie mb-40">
                                            <div className="image-profile">
                                                <img
                                                    src={profileData.profile_pic_url || "assets/imgs/page/organization/organization-profile.png"}
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

                                        {/* Personal Details */}
                                        <h4 className="small-header">Personal Details</h4>
                                        <div className="row form-contact">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="font-sm color-text-mutted mb-10">First Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="first_name"
                                                        value={profileData.first_name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="font-sm color-text-mutted mb-10">Last Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="last_name"
                                                        value={profileData.last_name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
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
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="font-sm color-text-mutted mb-10">Current Location</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="current_location"
                                                        value={profileData.current_location}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Professional Details */}
                                        <h4 className="small-header">Professional Details</h4>
                                        <div className="row form-contact">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="font-sm color-text-mutted mb-10">Current Company Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="current_company_name"
                                                        value={profileData.current_company_name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="font-sm color-text-mutted mb-10">Current Designation</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="current_designation"
                                                        value={profileData.current_designation}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Company Logo Upload Section */}
                                        <h4 className="small-header">Upload Company Logo</h4>
                                        <div className="box-info-profie mb-40">
                                            <div className="image-profile">
                                                <img
                                                    src={profileData.company_logo_url}
                                                    alt="Company Logo"
                                                />
                                            </div>
                                            <input
                                                type="file"
                                                onChange={(e) => setCompanyLogo(e.target.files[0])}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-apply"
                                                onClick={handleCompanyLogoUpload}
                                                // disabled={!companyLogo}
                                            >
                                                Upload Company Logo
                                            </button>
                                        </div>

                                        {/* Company Information */}
                                        <h4 className="small-header">Company Information</h4>
                                        <div className="row form-contact">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label className="font-sm color-text-mutted mb-10">Address</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="address"
                                                        value={profileData.address}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label className="font-sm color-text-mutted mb-10">About Company</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={4}
                                                        name="about_company"
                                                        value={profileData.about_company}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
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
                                            <div className="col-lg-6 col-md-12">
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
                                            <div className="col-lg-6 col-md-12">
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
                                            <div className="col-lg-6 col-md-12">
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

                                        <div className="box-button mt-15">
                                            <button
                                                className="btn btn-apply-big font-md font-bold"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {loading ? "Saving..." : "Save All Changes"}
                                            </button>
                                        </div>
                                    </form>
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
