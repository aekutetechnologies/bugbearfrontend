/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import { formatDistanceToNow, parseISO } from 'date-fns'; // To handle relative time formatting
import { FaEdit } from "react-icons/fa"; // Import the edit icon from react-icons
import API_BASE_URL from "../util/config";

export default function JobsList() {
    const router = useRouter();
    const { status } = router.query; // Get status from query parameters
    const [jobs, setJobs] = useState([]);
    const [vdIs, setVdIs] = useState([]); // State to store the VDI list
    const [loading, setLoading] = useState(true);

    // Helper function to format salary
    const formatSalary = (min, max) => {
        const minFormatted = (min / 1000).toFixed(0) + "k";
        const maxFormatted = (max / 1000).toFixed(0) + "k";
        return `${minFormatted}-${maxFormatted}`;
    };

    // Helper function to convert job_type to PascalCase
    const formatJobType = (jobType) => {
        return jobType
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(" ");
    };

    // Fetch jobs based on the status query parameter
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
            if (!token) {
                router.push("/login"); // Redirect to login if no token is available
                return;
            }

            let apiUrl = `${API_BASE_URL}jobs/list/all`; // Default to all jobs

            // Set the correct API URL based on the status
            if (status === "open") {
                apiUrl = `${API_BASE_URL}jobs/list/open`;
            } else if (status === "closed") {
                apiUrl = `${API_BASE_URL}jobs/list/closed`;
            }

            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // Format the job data as per the requirements
                    const formattedJobs = data.map(job => ({
                        ...job,
                        title: formatJobType(job.title),
                        location: formatJobType(job.location),
                        job_type: formatJobType(job.job_type),
                        salary: formatSalary(parseFloat(job.salary_min), parseFloat(job.salary_max)),
                        job_created: formatDistanceToNow(parseISO(job.job_created), { addSuffix: true }) // Display relative time
                    }));

                    setJobs(formattedJobs); // Set the formatted jobs
                } else {
                    console.error("Failed to fetch jobs");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [status, router]);

    // Fetch VDI list
    useEffect(() => {
        const fetchVdIs = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                console.log("Fetching VDIs...");
                const response = await fetch(`${API_BASE_URL}vdi/list`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("VDIs:", data);
                    setVdIs(data); // Set VDIs
                } else {
                    console.error("Failed to fetch VDIs");
                }
            } catch (error) {
                console.error("Error fetching VDIs:", error);
            }
        };

        fetchVdIs();
    }, [router]);

    // Function to navigate to job edit page
    const handleJobRowClick = (jobId) => {
        router.push(`/create-job?id=${jobId}`);
    };

    // Function to navigate to candidate grid page with job id as query parameter
    const handleApplicantsClick = (jobId) => {
        router.push(`/candidates-grid/${jobId}`);
    };

    // Function to handle status change from dropdown and update via API
    const handleStatusChange = async (jobId, newStatus) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`${API_BASE_URL}jobs/${jobId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Pass the token in the headers
                },
                body: JSON.stringify({ is_active: newStatus === 'Open' }), // Send new status
            });

            if (response.ok) {
                // Update the job status in the local state after success
                setJobs(prevJobs =>
                    prevJobs.map(job =>
                        job.id === jobId ? { ...job, is_active: newStatus === 'Open' } : job
                    )
                );
            } else {
                console.error("Failed to update job status");
            }
        } catch (error) {
            console.error("Error updating job status:", error);
        }
    };

    // Function to handle VDI change for a job
    const handleVdiChange = async (jobId, vdiId) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`${API_BASE_URL}jobs/vdi/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Pass the token in the headers
                },
                body: JSON.stringify({ job_id: jobId, vdi_id: vdiId }),
            });

            if (!response.ok) {
                console.error("Failed to update VDI for the job");
            }
        } catch (error) {
            console.error("Error updating VDI for the job:", error);
        }
    };

    return (
        <Layout>
            <div className="container">
                <h3 className="dashboard-section-title">Your Created Jobs ({status || "all"})</h3>
                {loading ? (
                    <p>Loading jobs...</p>
                ) : jobs.length > 0 ? (
                    <div className="dashboard-table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Posted</th>
                                    <th>Salary</th>
                                    <th>Status</th>
                                    <th>VDI</th> {/* New column for VDI selection */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.title}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.location}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.job_type}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.job_created}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.salary}</td>
                                        <td>
                                            <select
                                                value={job.is_active ? "Open" : "Closed"}
                                                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                                                style={{
                                                    paddingRight: '20px',
                                                    appearance: 'none',
                                                    background: 'url(data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="none" stroke="black" stroke-width=".5" d="M0 0l2 2 2-2"/></svg>) no-repeat right center',
                                                    backgroundColor: '#fff',
                                                    backgroundSize: '12px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    padding: '5px',
                                                    margin: 0,
                                                }}
                                            >
                                                <option value="Open">Open</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                        </td>
                                        <td>
                                            {/* Dropdown to select VDI */}
                                            <select
                                                onChange={(e) => handleVdiChange(job.id, e.target.value)}
                                                defaultValue=""
                                                style={{
                                                    appearance: 'none',
                                                    backgroundColor: '#fff',
                                                    padding: '5px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                <option value="" disabled>Select VDI</option>
                                                {vdIs.map(vdi => (
                                                    <option key={vdi.id} value={vdi.id}>
                                                        {vdi.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                            <span onClick={() => handleApplicantsClick(job.id)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                                View Applicants
                                            </span>
                                            <FaEdit onClick={() => handleJobRowClick(job.id)} style={{ cursor: 'pointer', color: 'blue' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No jobs found for {status || "all"}.</p>
                )}
            </div>
        </Layout>
    );
}
