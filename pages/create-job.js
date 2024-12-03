import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../components/elements/ProfileModal";
import { Editor } from 'primereact/editor';
import API_BASE_URL from "../util/config";


// Dummy Job Types
const JOB_TYPE_CHOICES = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
];

// Education level samples
const EDUCATION_CHOICES = [
    { value: "High School", label: "High School" },
    { value: "Associate Degree", label: "Associate Degree" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "Doctorate", label: "Doctorate" },
];

export default function CreateJob() {
    const router = useRouter();
    const { id } = router.query;

    const [isEditing, setIsEditing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobData, setJobData] = useState({
        jobTitle: "",
        location: "",
        category: "",
        workplaceType: "Office",
        job_type: "Full Time",
        responsibilities: "",
        qualifications: "",
        preferredSkills: "",
        salary_min: "",
        salary_max: "",
        experience: 0,
        education: "Graduation",
        job_posted: "",
        job_expiry: "",
        featured: false,
    });

    // Fetch categories from API
    useEffect(() => {
        fetch(`${API_BASE_URL}jobs/category/`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            });
    }, []);

    // If editing, fetch job data
    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetch(`${API_BASE_URL}jobs/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setJobData({
                        jobTitle: data.title,
                        location: data.location,
                        category: data.category,
                        workplaceType: data.workplaceType,
                        job_type: data.job_type,
                        responsibilities: data.responsibilities,
                        qualifications: data.qualifications,
                        preferredSkills: data.skills,
                        salary_min: data.salary_min,
                        salary_max: data.salary_max,
                        experience: data.experience,
                        education: data.education,
                        job_posted: data.job_posted,
                        job_expiry: data.job_expiry,
                        featured: data.featured,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching job data:", error);
                    toast.error("Failed to load job data.");
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTextChange = (fieldName, htmlValue) => {
        setJobData((prevData) => ({
            ...prevData,
            [fieldName]: htmlValue, // Dynamically update the specific field (responsibilities, qualifications, preferredSkills)
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isEditing
            ? `${API_BASE_URL}jobs/${id}/` // Update existing job
            : `${API_BASE_URL}jobs/`; // Create new job

        const method = isEditing ? "PUT" : "POST"; // Use PUT for edit, POST for create

        const payload = {
            title: jobData.jobTitle,
            location: jobData.location,
            category: jobData.category,
            location: jobData.workplaceType,
            job_type: jobData.job_type,
            responsibilities: jobData.responsibilities,
            qualifications: jobData.qualifications,
            skills: jobData.preferredSkills,
            salary_min: jobData.salary_min,
            salary_max: jobData.salary_max,
            experience: jobData.experience,
            education: jobData.education,
            job_posted: jobData.job_posted,
            job_expiry: jobData.job_expiry,
            featured: jobData.featured,
        };

        // try {
        //     const token = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage
        //     const response = await fetch(url, {
        //         method: method,
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${token}`, // Add Authorization header
        //         },
        //         body: JSON.stringify(payload),
        //     });

        //     if (response.ok) {
        //         console.log(payload);

        //         toast.success(isEditing ? "Job updated successfully!" : "Job created successfully!");
        //         router.push("/dashboard"); // Redirect to job listing page after success
        //     } else {
        //         toast.error("Something went wrong!");
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        //     toast.error("Error occurred while saving job.");
        // }

        try {
            const token = localStorage.getItem('accessToken'); // Get access token
        
           
            const profileResponse = await fetch(`${API_BASE_URL}user/user-details/`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`, // Use the token for authorization
                },
            });
        
            const profileData = await profileResponse.json();
        
            
            const requiredFields = ['first_name', 'last_name', 'current_location', 'current_company_name', 'current_designation', 'email'];
            const isProfileComplete = requiredFields.every(field => profileData[field] && profileData[field].trim() !== '');
        
            if (profileResponse.ok && isProfileComplete) {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, 
                    },
                    body: JSON.stringify(payload),
                });
        
                if (response.ok) {
                    console.log(payload);
                    toast.success(isEditing ? "Job updated successfully!" : "Job created successfully!");
                    router.push("/dashboard");
                } else {
                    toast.error("Something went wrong!");
                }
            } else {
                // toast.error("Please complete your profile before creating a job.");
                // router.push("/recruiter-profile")
                setIsModalOpen(true);
            }
        } 
        
        catch (error) {
            console.error("Error:", error);
            toast.error("Error occurred while saving job.");
        }
        
    };


    const handleCancel = () => {
        router.back(); // Navigate to the previous page
    };

    return (
        <Layout>
            <ToastContainer />
            <div className="container">
                <section className="section-box">
                    <div className="container mt-50">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 mx-auto">
                                <h3 className="mt-0 mb-15 color-brand-1">
                                    {isEditing ? "Edit Job" : "Create Job"}
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Job Title */}
                                            <div className="form-group">
                                                <label>Job Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="jobTitle"
                                                    value={jobData.jobTitle}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* Location */}
                                            <div className="form-group">
                                                <label>Location (City, State / Remote)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="location"
                                                    value={jobData.location}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Job Category */}
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select
                                                    className="form-control"
                                                    name="category"
                                                    value={jobData.category}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    {categories.length > 0 ? (
                                                        categories.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option value="">Loading categories...</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* Job Type */}
                                            <div className="form-group">
                                                <label>Job Type</label>
                                                <select
                                                    className="form-control"
                                                    name="job_type"
                                                    value={jobData.job_type}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    {JOB_TYPE_CHOICES.map((type) => (
                                                        <option key={type.value} value={type.value}>
                                                            {type.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Salary Min */}
                                            <div className="form-group">
                                                <label>Minimum Salary</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="salary_min"
                                                    value={jobData.salary_min}
                                                    onChange={handleInputChange}
                                                    step={1000}
                                                    min={0}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* Salary Max */}
                                            <div className="form-group">
                                                <label>Maximum Salary</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="salary_max"
                                                    value={jobData.salary_max}
                                                    onChange={handleInputChange}
                                                    step={1000}
                                                    min={0}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Experience */}
                                            <div className="form-group">
                                                <label>Experience (in years)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="experience"
                                                    value={jobData.experience}
                                                    onChange={handleInputChange}
                                                    min={0}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* Education */}
                                            <div className="form-group">
                                                <label>Education</label>
                                                <select
                                                    className="form-control"
                                                    name="education"
                                                    value={jobData.education}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    {EDUCATION_CHOICES.map((education) => (
                                                        <option key={education.value} value={education.value}>
                                                            {education.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* Responsibilities */}
                                            <div className="form-group">
                                                <label>Responsibilities</label>
                                                {/* <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    name="responsibilities"
                                                    value={jobData.responsibilities}
                                                    onChange={handleInputChange}
                                                /> */}
                                                {/* <Editor
                                                    className="form-control"
                                                    rows={3}
                                                    name="responsibilities"
                                                    value={jobData.responsibilities}
                                                    onChange={handleTextChange}
                                                /> */}
                                                <Editor
                                                    value={jobData.responsibilities}
                                                    onTextChange={(e) => handleTextChange('responsibilities', e.htmlValue)}
                                                    style={{ height: '320px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* Qualifications */}
                                            <div className="form-group">
                                                <label>Qualifications</label>
                                                {/* <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    name="qualifications"
                                                    value={jobData.qualifications}
                                                    onChange={handleInputChange}
                                                /> */}
                                                {/* <Editor
                                                    className="form-control"
                                                    rows={3}
                                                    name="qualifications"
                                                    value={jobData.qualifications}
                                                    onChange={handleTextChange}
                                                /> */}
                                                <Editor
                                                    value={jobData.qualifications}
                                                    onTextChange={(e) => handleTextChange('qualifications', e.htmlValue)}
                                                    style={{ height: '320px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* Preferred Skills */}
                                            <div className="form-group">
                                                <label>Preferred Skills</label>
                                                {/* <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    name="preferredSkills"
                                                    value={jobData.preferredSkills}
                                                    onChange={handleInputChange}
                                                /> */}
                                                {/* <Editor
                                                    className="form-control"
                                                    rows={3}
                                                    name="preferredSkills"
                                                    value={jobData.preferredSkills}
                                                    onChange={handleTextChange}
                                                /> */}
                                                <Editor
                                                    value={jobData.preferredSkills}
                                                    onTextChange={(e) => handleTextChange('preferredSkills', e.htmlValue)}
                                                    style={{ height: '320px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Job Posted Date */}
                                            <div className="form-group">
                                                <label>Job Posted Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="job_posted"
                                                    value={jobData.job_posted}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* Job Expiry Date */}
                                            <div className="form-group">
                                                <label>Job Expiry Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="job_expiry"
                                                    value={jobData.job_expiry}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Featured */}
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="featured"
                                                    checked={jobData.featured}
                                                    onChange={(e) =>
                                                        setJobData((prevData) => ({
                                                            ...prevData,
                                                            featured: e.target.checked,
                                                        }))
                                                    }
                                                />
                                                <label className="form-check-label">Featured</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            {/* Submit and Cancel Buttons */}
                                            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
                                                {isEditing ? "Update Job" : "Create Job"}
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                                Cancel
                                            </button>
                                            <button></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ProfileModal isOpen={isModalOpen}  />
        </Layout>
    );
}
