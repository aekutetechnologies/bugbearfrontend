/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout/Layout";
import FeaturedSlider from "../../components/sliders/Featured";
import { format } from 'date-fns';
import {
  FaIndustry,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { GoBriefcase } from "react-icons/go";
import { useState, useEffect } from "react";  // Import useState and useEffect
import { ToastContainer, toast } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications
import API_BASE_URL from "../../util/config"; // Import API base URL

export default function JobDetails({ job, featuredJobs, token }) {
  const [isApplying, setIsApplying] = useState(false);
  const [saved, setSaved] = useState(job?.saved || false); // Initialize with job.saved

  // Log client-side job data to compare with server-side
  useEffect(() => {
    console.log('Client-side job data:', job);
  }, [job]);

  if (!job) {
    return <div>Job details not found!</div>;
  }

  // Format the job_posted and job_expiry dates using date-fns
  const jobPostedDate = job.job_posted ? format(new Date(job.job_posted), 'MM/dd/yyyy') : 'N/A';
  const jobExpiryDate = job.job_expiry ? format(new Date(job.job_expiry), 'MM/dd/yyyy') : 'N/A';

  // Function to handle job application
  const handleApply = async () => {
    setIsApplying(true);
    try {
      const response = await fetch(`${API_BASE_URL}jobs/apply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined, // Use token passed as prop
        },
        body: JSON.stringify({ job_id: job.id }),
      });
      if (!response.ok) {
        throw new Error(`Failed to apply for the job: ${response.status}`);
      }
      toast.success("Job application submitted successfully!");
      // Optionally update job.applied state if necessary
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("There was an issue applying for the job.");
    } finally {
      setIsApplying(false);
    }
  };

  // Function to handle job saving
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}jobs/${saved ? "unsave" : "save"}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined, // Use token passed as prop
          },
          body: JSON.stringify({ job_id: job.id }),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to ${saved ? "unsave" : "save"} the job: ${response.status}`);
      }
      setSaved(!saved);
      toast.success(`Job ${saved ? "unsaved" : "saved"} successfully!`);
    } catch (error) {
      console.error(`Error ${saved ? "unsaving" : "saving"} job:`, error);
      toast.error(`There was an issue ${saved ? "unsaving" : "saving"} the job.`);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to handle "Connect VDI"
  const handleConnectVDI = () => {
    toast.info("Connecting to VDI...");
  };

  function formatSalary(amount) {
    if (amount >= 1000 && amount < 100000) {
      return (amount / 1000).toFixed(0) + 'k';
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(0) + 'L';
    }
    return amount;
  }

  return (
    <>
      <Layout>
        <ToastContainer />
        <div>
          <section className="section-box-2">
            <div className="container">
              <div className="banner-hero banner-image-single">
                <img src="/assets/imgs/page/job-single/thumb.png" alt="job-thumbnail" />
              </div>
              <div className="flex flex-wrap">
                {/* First column: Job Title and Info */}
                <div className="col-lg-8 col-md-12 flex flex-col justify-center">
                  <h3>{job.title || "Job Title"}</h3>
                  <div className="mt-10 mb-15 flex items-center gap-3">
                    <span className="text-xs flex gap-2 text-gray-500">
                      <GoBriefcase /> {job.job_type || "Full Time"}
                    </span>
                    <span className="text-xs flex gap-2 text-gray-500">
                      <FaClock /> {jobPostedDate}
                    </span>
                    <span className="text-xs flex gap-2 text-gray-500">
                      <FaClock /> {jobExpiryDate}
                    </span>
                  </div>
                </div>

                {/* Second column: Buttons and Save Icon */}
                <div className="col-lg-4 col-md-12 flex items-center justify-end">
                  <div className="flex items-center">
                    {job.is_approved && (
                      <button
                        className="btn btn-connect-vdi hover-up mr-2"
                        onClick={handleConnectVDI}
                      >
                        Connect VDI
                      </button>
                    )}

                    <button
                      className="btn btn-apply-icon btn-apply btn-apply-big hover-up"
                      disabled={isApplying || job.applied}
                      onClick={handleApply}
                    >
                      {job.applied
                        ? "Applied"
                        : isApplying
                        ? "Applying..."
                        : "Apply now"}
                    </button>

                    <FaStar
                      size={24}
                      color={saved ? "yellow" : "gray"}
                      className="ml-2 cursor-pointer"
                      onClick={handleSave}
                    />
                  </div>
                </div>
              </div>

              <div className="border-bottom pt-10 pb-10" />
            </div>
          </section>

          {/* Employment Information */}
          <section className="section-box mt-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                  <div className="job-overview">
                    <h5 className="border-bottom pb-15 mb-30">Employment Information</h5>
                    <div className="row">
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-icon-item">
                          <FaIndustry size={24} />
                        </div>
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description industry-icon mb-10">Category</span>
                          <strong className="small-heading">
                            {job.category || "Industry not provided"}
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <FaMoneyBillWave size={24} />
                        </div>
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description salary-icon mb-10">Salary</span>
                          <strong className="small-heading">
                            ₹{formatSalary(job.salary_min)} - ₹{formatSalary(job.salary_max)}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-25">
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <FaClock size={24} />
                        </div>
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description experience-icon mb-10">
                            Experience
                          </span>
                          <strong className="small-heading">
                            {job.experience || "Not specified"} years
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-icon-item">
                          <FaMapMarkerAlt size={24} />
                        </div>
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description jobtype-icon mb-10">Location</span>
                          <strong className="small-heading">
                            {job.location || "Remote"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Display if the job is featured or active */}
                    <div className="row mt-25">
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-icon-item">
                          <FaStar size={24} color="gray" />
                        </div>
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description mb-10">Featured</span>
                          <strong className="small-heading">
                            {job.featured ? "Yes" : "No"}
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-icon-item">
                          {job.is_active ? (
                            <FaCheckCircle size={24} color="gray" />
                          ) : (
                            <FaTimesCircle size={24} color="gray" />
                          )}
                        </div>
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description mb-10">Status</span>
                          <strong className="small-heading">
                            {job.is_active ? "Open" : "Closed"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="content-single">
                    <h4>Job Description</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job.responsibilities ? job.responsibilities.replace(/\n/g, '<br/>') : "Job description not available.",
                      }}
                    />

                    <h4>Essential Knowledge, Skills, and Experience</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job.skills ? job.skills.replace(/\n/g, '<br/>') : "Skills not provided.",
                      }}
                    />

                    <h4>Qualifications</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job.qualifications ? job.qualifications.replace(/\n/g, '<br/>') : "No qualifications provided.",
                      }}
                    />
                  </div>
                </div>

                {/* Sidebar or additional content here */}
              </div>
            </div>
          </section>

          {/* Featured Jobs */}
          <section className="section-box mt-50">
            <div className="container">
              <div className="text-left">
                <h2 className="section-title mb-10">Featured Jobs</h2>
                <div className="mt-50">
                  <FeaturedSlider featuredJobs={featuredJobs} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}


import cookie from 'cookie'; // Import cookie module

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    // Parse cookies from the request header
    const cookies = context.req.headers.cookie
      ? cookie.parse(context.req.headers.cookie)
      : {};
    const token = cookies.accessToken || null; // Get the token from cookies

    let job = null;

    // Fetch job details with or without token
    const res = await fetch(`${API_BASE_URL}jobs/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined, // Pass the token if available
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch job details: ${res.status}`);
    }

    job = await res.json();

    // If 'applied' or 'saved' fields are missing, set default values
    if (!('applied' in job)) {
      job.applied = false;
    }
    if (!('saved' in job)) {
      job.saved = false;
    }

    // Fetch featured jobs with POST request
    const featuredRes = await fetch(`${API_BASE_URL}jobs/search/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: "",
        page: 1,
        page_size: 4, // Limit the featured jobs to 4
        category: [],
        salaryRange: [],
        experienceLevel: [],
        jobType: [],
      }),
    });

    if (!featuredRes.ok) {
      throw new Error(`Failed to fetch featured jobs: ${featuredRes.status}`);
    }

    const featuredJobs = await featuredRes.json();

    return {
      props: {
        job,
        featuredJobs: featuredJobs.results || [],
        token, // Pass the token to the component
      },
    };
  } catch (error) {
    console.error('Error fetching job details:', error);

    return {
      props: {
        job: null,
        featuredJobs: [],
        token: null,
      },
    };
  }
}
