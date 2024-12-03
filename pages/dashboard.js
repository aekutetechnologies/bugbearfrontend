1/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Layout from "../components/Layout/Layout";

import JobStats from "../components/elements/JobStats";
import VdiStats from "../components/elements/VdiStats";
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


    return (
        <Layout>
            <div className="">
                <div className="">
                    <main className="py-3">
                        <div className="dashboard-header">
                            <h3 className="dashboard-title">Dashboard</h3>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <Link href="/create-job" className="">
                                    {/* <button className="px-4 py-2 rounded bg-blue-600 text-white text-lg">Create Job</button> */}
                                    <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-700 hover:text-black shadow-xl hover:-translate-y-1 transition-transorm ">Create Job</button>
                                </Link>
                                <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-700 hover:text-gray-200 shadow-xl hover:-translate-y-1 transition-transorm " onClick={() => setShowModal(true)}>
                                    Create VDI
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-jobs?status=all")}
                                >
                                    <h3 className="text-lg font-semibold">Total Jobs</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.total_jobs}</p>
                                    <span className="text-green-600">+25%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-jobs?status=open")}
                                >
                                    <h3 className="text-lg font-semibold">Open Jobs</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.open_jobs}</p>
                                    <span className="text-green-600">+5%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-jobs?status=closed")}
                                >
                                    <h3 className="text-lg font-semibold">Closed Jobs</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.closed_jobs}</p>
                                    <span className="text-green-600">+12%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-vdi?status=all")}
                                >
                                    <h3 className="text-lg font-semibold">Total VDI</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.total_vdi}</p>
                                    <span className="text-green-600">+10%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-vdi?status=running")}
                                >
                                    <h3 className="text-lg font-semibold">Running VDI</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.running_vdi}</p>
                                    <span className="text-green-600">+8%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-vdi?status=closed")}
                                >
                                    <h3 className="text-lg font-semibold">Closed VDI</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.closed_vdi}</p>
                                    <span className="text-green-600">+15%</span>
                                </div>
                            </div>
                        {/* {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                               
                                <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-10 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>

                               
                                <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-10 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>

                                <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-10 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>

                                <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-10 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>

                                <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-10 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>

                                <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-10 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-jobs?status=all")}
                                >
                                    <h3 className="text-lg font-semibold">Total Jobs</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.total_jobs}</p>
                                    <span className="text-green-600">+25%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-jobs?status=open")}
                                >
                                    <h3 className="text-lg font-semibold">Open Jobs</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.open_jobs}</p>
                                    <span className="text-green-600">+5%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-jobs?status=closed")}
                                >
                                    <h3 className="text-lg font-semibold">Closed Jobs</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.closed_jobs}</p>
                                    <span className="text-green-600">+12%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-vdi?status=all")}
                                >
                                    <h3 className="text-lg font-semibold">Total VDI</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.total_vdi}</p>
                                    <span className="text-green-600">+10%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-vdi?status=running")}
                                >
                                    <h3 className="text-lg font-semibold">Running VDI</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.running_vdi}</p>
                                    <span className="text-green-600">+8%</span>
                                </div>
                                <div
                                    className="bg-white shadow-md shadow-blue-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => router.push("/admin-vdi?status=closed")}
                                >
                                    <h3 className="text-lg font-semibold">Closed VDI</h3>
                                    <p className="text-2xl font-bold text-gray-800">{stats.closed_vdi}</p>
                                    <span className="text-green-600">+15%</span>
                                </div>
                            </div>
                        )} */}

                        {/* graph */}
                        <div className="p-6 flex gap-10">
                            <div className="w-1/2 p-4 bg-white shadow-md shadow-blue-200 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Jobs Created Over the Week</h3>
                                <JobStats
                                    openJobs={stats.open_jobs}
                                    closedJobs={stats.closed_jobs}
                                />
                            </div>
                            <div className="w-1/2 p-4 bg-white shadow-md shadow-blue-200 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">VDIs Created Over the Week</h3>
                                <VdiStats
                                    runningvdi={5}
                                    closedvdi={4}
                                />
                            </div>
                        </div>


                        {/* <div className="dashboard-graph">
                            <h3 className="dashboard-section-title">Jobs Created Over the Week</h3>
                            <Line data={chartData} options={chartOptions} />
                            <LineChart data={chartData} options={chartOptions} />
                        </div> */}
                    </main>
                </div>
            </div>

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
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isCreatingVDI ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={handleCreateVDI}
                                disabled={isCreatingVDI}
                            >
                                {isCreatingVDI ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
}
