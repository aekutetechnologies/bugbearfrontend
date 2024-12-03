import { redirect } from 'next/dist/server/api-utils';
import React from 'react';
import { useRouter } from "next/router";

const ProfileModal = ({ isOpen, onClose }) => {
    const router = useRouter();
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Profile Incomplete</h2>
                <p className="mb-6">Please complete your profile before creating a job.</p>
                <button
                    onClick={() => router.push("/recruiter-profile")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default ProfileModal;
