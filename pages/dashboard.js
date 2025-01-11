import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Layout from "../components/Layout/Layout";

import JobStats from "../components/elements/JobStats";
import VdiStats from "../components/elements/VdiStats";
import API_BASE_URL from "../util/config";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardWithSidebar() {
    const router = useRouter();
    const [stats, setStats] = useState({
        total_jobs: 0,
        open_jobs: 0,
        closed_jobs: 0,
        jobs_over_week: [],
        total_vdi: 0,
        running_vdi: 0,
        closed_vdi: 0,
    });

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State to show/hide modal
    const [vdiName, setVdiName] = useState(""); // State for VDI name input
    const [isCreatingVDI, setIsCreatingVDI] = useState(false); // State to manage create VDI loading
    const [showBulkJobModal, setShowBulkJobModal] = useState(false);
    const [excelFile, setExcelFile] = useState(null); // State for uploaded file
    const [isUploading, setIsUploading] = useState(false);

    // Fetch stats from the API
    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}jobs/stats/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        total_jobs: data.total_jobs || 0,
                        open_jobs: data.active_jobs || 0,
                        closed_jobs: data.inactive_jobs || 0,
                        jobs_over_week: data.jobs_over_week || [0, 0, 0, 0, 0, 0, 0],
                        total_vdi: data.total_vdi || 0,
                        running_vdi: data.running_vdi || 0,
                        closed_vdi: data.closed_vdi || 0,
                    });
                } else {
                    console.error("Failed to fetch stats");
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    // Function to handle VDI creation
    const handleCreateVDI = async () => {
        setIsCreatingVDI(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}vdi/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: vdiName }),
            });

            if (response.ok) {
                setShowModal(false);
                setVdiName(""); // Reset input
            } else {
                console.error("Failed to create VDI");
            }
        } catch (error) {
            console.error("Error creating VDI:", error);
        } finally {
            setIsCreatingVDI(false);
        }
    };

    // Function to handle file upload for bulk jobs
    const handleFileUpload = async () => {
        if (!excelFile) {
            alert("Please select a file to upload.");
            return;
        }

        setIsUploading(true);

        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
            return;
        }

        const formData = new FormData();
        formData.append("file", excelFile);

        try {
            const response = await fetch(`${API_BASE_URL}jobs/bulk-upload/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert("Bulk jobs uploaded successfully!");
                setShowBulkJobModal(false);
                setExcelFile(null); // Reset file input
            } else {
                alert("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred during file upload.");
        } finally {
            setIsUploading(false);
        }
    };

    // Function to download the sample Excel file
    const handleDownloadSampleFile = () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
            return;
        }

        fetch(`${API_BASE_URL}jobs/sample-file/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error("Failed to download sample file.");
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "sample_jobs.xlsx"); // Set the file name
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.error("Error downloading sample file:", error);
            });
    };

    return (
        <Layout>
            <div className="px-4 py-6 md:px-0 md:py-0">
                <main className="py-3">
                    <div className="dashboard-header">
                        <h3 className="dashboard-title text-center md:text-left">Dashboard</h3>
                        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-4 mt-4">
                            <Link href="/create-job">
                                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-700 shadow-xl hover:-translate-y-1 transition-transform mb-2 md:mb-0">
                                    Create Job
                                </button>
                            </Link>
                            <button
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-700 shadow-xl hover:-translate-y-1 transition-transform"
                                onClick={() => setShowBulkJobModal(true)}
                            >
                                Add Bulk Job
                            </button>
                            {/* <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-700 shadow-xl hover:-translate-y-1 transition-transform" onClick={() => setShowModal(true)}>
                                Create VDI
                            </button> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div
                            className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => router.push("/admin-jobs?status=all")}
                        >
                            <h3 className="text-lg font-semibold">Total Jobs</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.total_jobs}</p>
                        </div>
                        <div
                            className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => router.push("/admin-jobs?status=open")}
                        >
                            <h3 className="text-lg font-semibold">Open Jobs</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.open_jobs}</p>
                        </div>
                        <div
                            className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => router.push("/admin-jobs?status=closed")}
                        >
                            <h3 className="text-lg font-semibold">Closed Jobs</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.closed_jobs}</p>
                        </div>
                        <div
                            className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => router.push("/admin-vdi?status=all")}
                        >
                            <h3 className="text-lg font-semibold">Total VDI</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.total_vdi}</p>
                        </div>
                        <div
                            className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => router.push("/admin-vdi?status=running")}
                        >
                            <h3 className="text-lg font-semibold">Running VDI</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.running_vdi}</p>
                        </div>
                        <div
                            className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => router.push("/admin-vdi?status=closed")}
                        >
                            <h3 className="text-lg font-semibold">Closed VDI</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.closed_vdi}</p>
                        </div>
                    </div>

                    {/* Graphs */}
                    <div className="p-4 md:flex gap-4">
                        <div className="w-full md:w-1/2 bg-white shadow-md shadow-blue-200 rounded-lg mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center md:text-left">Jobs Created Over the Week</h3>
                            <JobStats openJobs={stats.open_jobs} closedJobs={stats.closed_jobs} />
                        </div>
                        <div className="w-full md:w-1/2 bg-white shadow-md shadow-blue-200 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center md:text-left">VDIs Created Over the Week</h3>
                            <VdiStats runningvdi={5} closedvdi={4} />
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal for creating VDI */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Create VDI</h3>
                        <input
                            type="text"
                            value={vdiName}
                            onChange={(e) => setVdiName(e.target.value)}
                            placeholder="Enter VDI Name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                                    isCreatingVDI ? "cursor-not-allowed opacity-50" : ""
                                }`}
                                onClick={handleCreateVDI}
                                disabled={isCreatingVDI}
                            >
                                {isCreatingVDI ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for bulk job upload */}
            {showBulkJobModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Upload Bulk Jobs</h3>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={(e) => setExcelFile(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div className="flex justify-between items-center mb-4">
                            <a
                                onClick={handleDownloadSampleFile}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                Download Sample File
                            </a>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                onClick={() => setShowBulkJobModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                                    isUploading ? "cursor-not-allowed opacity-50" : ""
                                }`}
                                onClick={handleFileUpload}
                                disabled={isUploading}
                            >
                                {isUploading ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
