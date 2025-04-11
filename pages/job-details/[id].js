import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Layout from "../../components/Layout/Layout";
import { format } from 'date-fns';
import cookie from 'cookie';
import {
  FaIndustry,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaCopy
} from 'react-icons/fa';
import { GoBriefcase } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from "../../util/config";

// Dynamically import FeaturedSlider with no SSR
const FeaturedSlider = dynamic(() => import("../../components/sliders/Featured"), {
  ssr: false
});

export default function JobDetails({ job: initialJob, featuredJobs, token }) {
  // Client-side states
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [job, setJob] = useState(() => {
    return initialJob || {
      title: '',
      job_type: '',
      category: '',
      salary_min: 0,
      salary_max: 0,
      experience: '',
      location: '',
      responsibilities: '',
      skills: '',
      qualifications: '',
      is_active: false,
      is_approved: false,
      featured: false,
      applied: false,
      saved: false
    };
  });
  const [isApplying, setIsApplying] = useState(false);
  const [saved, setSaved] = useState(initialJob?.saved || false);
  const [showVDIModal, setShowVDIModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Debug logging
  useEffect(() => {
    console.log('Component mounted with job:', job);
    console.log('Initial job:', initialJob);
    console.log('API Base URL:', API_BASE_URL);
  }, []);

  // Set isClient to true once component mounts and handle initial loading
  useEffect(() => {
    setIsClient(true);
    if (!initialJob) {
      setError('Job not found');
    } else {
      setJob(initialJob);
    }
    setIsLoading(false);
  }, [initialJob]);

  // Format dates only on client-side
  const formatDate = (date) => {
    if (!date) return 'N/A';
    if (!isClient) return ''; // Return empty string during SSR
    return format(new Date(date), 'MM/dd/yyyy');
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container">
          <div className="flex justify-center items-center min-h-screen">
            <div>Loading job details...</div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="container">
          <div className="flex justify-center items-center min-h-screen">
            <div>Error: {error}</div>
          </div>
        </div>
      </Layout>
    );
  }

  // Not found state
  if (!job.title) {
    return (
      <Layout>
        <div className="container">
          <div className="flex justify-center items-center min-h-screen">
            <div>Job details not found!</div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleApply = async () => {
    if (isApplying) return;
    setIsApplying(true);
    try {
      const response = await fetch(`${API_BASE_URL}jobs/apply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({ job_id: job.id }),
      });
      
      if (response.ok) {
        toast.success("Job application submitted successfully!", {
          toastId: 101,
          containerId: "applyNotification",
        });
        setJob(prev => ({ ...prev, applied: true }));
      } else {
        throw new Error(`Failed to apply for the job: ${response.status}`);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("There was an issue applying for the job.", {
        toastId: 102,
        containerId: "applyNotification",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleSave = async () => {
    if (!isClient) return;
    setIsSaving(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}jobs/${saved ? "unsave" : "save"}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
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

  const handleConnectVDI = () => setShowVDIModal(true);
  const closeModal = () => setShowVDIModal(false);

  const copyToClipboard = (text) => {
    if (!isClient) return;
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy!"));
  };

  function formatSalary(amount) {
    if (!amount) return 'N/A';
    if (amount >= 1000 && amount < 100000) {
      return `${(amount / 1000).toFixed(0)}k`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(0)}L`;
    }
    return amount;
  }

  // Rest of your component JSX remains the same...
  return (
    <Layout>
      <div suppressHydrationWarning>
        <ToastContainer containerId="applyNotification" />
          <section className="section-box-2">
            <div className="container">
              <div className="banner-hero banner-image-single">
                <img src="/assets/imgs/page/job-single/thumb.png" alt="job-thumbnail" />
              </div>
              <div className="flex flex-wrap">
                <div className="col-lg-8 col-md-12 flex flex-col justify-center">
                  <h3>{job.title || "Job Title"}</h3>
                  <div className="mt-10 mb-15 flex items-center gap-3">
                    <span className="text-xs flex gap-2 text-gray-500">
                      <GoBriefcase /> {job.job_type || "Full Time"}
                    </span>
                    {isClient && (
                      <>
                        <span className="text-xs flex gap-2 text-gray-500">
                          <FaClock /> {formatDate(job.job_posted)}
                        </span>
                        <span className="text-xs flex gap-2 text-gray-500">
                          <FaClock /> {formatDate(job.job_expiry)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {isClient && (
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
                )}
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

          {/* VDI Modal */}
          {isClient && showVDIModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>VDI Connection Information</h2>
                <p>
                  <a
                    href="https://us-east-1.webclient.amazonworkspaces.com/wsp.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click Here to connect to the VDI
                  </a>
                </p>
                <p>
                  <strong>Registration code:</strong> SLiad+PWFSH4 
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard("SLiad+PWFSH4")}
                  >
                    <FaCopy />
                  </button>
                </p>
                <p>
                  <strong>Username:</strong> Sourav 
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard("Sourav")}
                  >
                    <FaCopy />
                  </button>
                </p>
                <p>
                  <strong>Password:</strong> Vicky_532 
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard("Vicky_532")}
                  >
                    <FaCopy />
                  </button>
                </p>
                <button className="btn btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  if (!id) {
    return {
      notFound: true
    };
  }

  try {
    const cookies = context.req.headers.cookie
      ? cookie.parse(context.req.headers.cookie)
      : {};
    const token = cookies.accessToken || null;

    console.log(`Fetching job with ID: ${id} from ${API_BASE_URL}jobs/${id}`);

    const res = await fetch(`${API_BASE_URL}jobs/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    console.log('Job fetch response status:', res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch job details: ${res.status}`);
    }

    const job = await res.json();
    console.log('Fetched job data:', job);

    if (!job || !job.id) {
      return {
        notFound: true
      };
    }

    // Set default values for missing fields
    const jobWithDefaults = {
      applied: false,
      saved: false,
      ...job
    };

    // Only fetch featured jobs if we successfully got the main job
    let featuredJobs = [];
    try {
      const featuredRes = await fetch(`${API_BASE_URL}jobs/search/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: "",
          page: 1,
          page_size: 4,
          category: [],
          salaryRange: [],
          experienceLevel: [],
          jobType: [],
        }),
      });

      if (featuredRes.ok) {
        const featuredData = await featuredRes.json();
        featuredJobs = featuredData.results || [];
      }
    } catch (error) {
      console.error('Error fetching featured jobs:', error);
    }

    return {
      props: {
        job: jobWithDefaults,
        featuredJobs,
        token,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    return {
      notFound: true
    };
  }
}