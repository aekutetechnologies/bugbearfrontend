import React from 'react';

const Sidebarr = () => {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-64 bg-gray-200 text-white transform transition-transform duration-300 ease-in-out `}
        >
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Sidebar Menu</h2>
                <ul>
                    <li className="mb-4 hover:text-blue-400">
                        <a href="#">Dashboard</a>
                    </li>
                    <li className="mb-4 hover:text-blue-400">
                        <a href="#">Profile</a>
                    </li>
                    <li className="mb-4 hover:text-blue-400">
                        <a href="#">Settings</a>
                    </li>
                    <li className="mb-4 hover:text-blue-400">
                        <a href="#">Logout</a>
                    </li>
                </ul>
            </div>

            {/* Close Button */}
            {/* <button
                className="absolute top-4 right-4 text-white"
                onClick={toggleSidebar}
            >
                Close
            </button> */}
        </div>
    );
};

export default Sidebarr;
