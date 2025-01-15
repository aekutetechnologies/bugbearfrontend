import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FaUserCircle, FaSignOutAlt, FaSearch, FaBriefcase, FaBookmark, FaChevronDown } from "react-icons/fa";
import { fetchProfileData } from "../../util/api";

const AuthButtons = ({ isMobile, closeMobileMenu }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const data = await fetchProfileData(token);
          setProfileData(data);
          setIsLoggedIn(true);
          setUserType(localStorage.getItem("userType"));
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const handleStorageChange = () => checkAuthStatus();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.profile-dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    Cookies.remove("token");
    window.dispatchEvent(new Event('storage'));
    setIsLoggedIn(false);
    setProfileData(null);
    setUserType(null);
    router.push("/login");
    if (closeMobileMenu) closeMobileMenu();
  };

  const handleNavigate = (path) => {
    router.push(path);
    if (closeMobileMenu) closeMobileMenu();
    setDropdownOpen(false);
  };

  if (isLoading) return null;

  const NavigationLinks = ({ isMobileView }) => (
    <>
      {userType === "3" ? (
        <button
          onClick={() => handleNavigate("/dashboard")}
          className={`
            flex items-center space-x-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors
            ${isMobileView ? 'w-full px-4 py-3' : 'px-3 py-2'}
          `}
        >
          <FaBriefcase className={isMobileView ? 'w-5 h-5' : 'w-4 h-4'} />
          <span>Dashboard</span>
        </button>
      ) : (userType === "1" || userType === "2") && (
        <div className={`
          ${isMobileView
            ? 'flex flex-col space-y-1 w-full'
            : 'flex items-center space-x-1 md:space-x-2'
          }
        `}>
          <button
            onClick={() => handleNavigate("/jobs-list")}
            className={`
              flex items-center space-x-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors
              ${isMobileView ? 'w-full px-4 py-3' : 'px-3 py-2'}
            `}
          >
            <FaSearch className={isMobileView ? 'w-5 h-5' : 'w-4 h-4'} />
            <span>Search Jobs</span>
          </button>
          <button
            onClick={() => handleNavigate("/applied-jobs")}
            className={`
              flex items-center space-x-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors
              ${isMobileView ? 'w-full px-4 py-3' : 'px-3 py-2'}
            `}
          >
            <FaBriefcase className={isMobileView ? 'w-5 h-5' : 'w-4 h-4'} />
            <span>My Jobs</span>
          </button>
          <button
            onClick={() => handleNavigate("/saved-jobs")}
            className={`
              flex items-center space-x-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors
              ${isMobileView ? 'w-full px-4 py-3' : 'px-3 py-2'}
            `}
          >
            <FaBookmark className={isMobileView ? 'w-5 h-5' : 'w-4 h-4'} />
            <span>Saved Jobs</span>
          </button>
        </div>
      )}
    </>
  );

  if (!isLoggedIn) {
    return (
      <div className={`
        flex 
        ${isMobile
          ? 'flex-col space-y-4'
          : 'items-center space-x-4 md:space-x-6'
        }
      `}>
        <Link
          href="/choose-role"
          className="text-gray-700 hover:text-gray-900 font-medium"
          onClick={closeMobileMenu}
        >
          Register
        </Link>
        <Link
          href="/login"
          className="btn btn-default btn-shadow hover-up"
          onClick={closeMobileMenu}
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-3 px-4 py-3 border-b">
          <img
            src={profileData?.profile_pic_url || "/assets/imgs/default-profile-pic.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium">Hi, {profileData?.first_name || "User"}</span>
          </div>
        </div>

        <div className="py-2">
          <NavigationLinks isMobileView={true} />

          <button
            onClick={() => handleNavigate(userType === "1" ? "/candidate-profile" : userType === "2" ? "/organization-profile" : "/recruiter-profile")}
            className="w-full text-left flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaUserCircle className="w-5 h-5" />
            <span>View Profile</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex items-center space-x-2 md:space-x-4">
      <div className="hidden-laptop">
        <NavigationLinks isMobileView={false} />
      </div>

      <div className="relative profile-dropdown">
        <button
          className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={profileData?.profile_pic_url || "/assets/imgs/default-profile-pic.png"}
            alt="Profile"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
          <span className="hidden md:inline text-gray-700">
            Hi, {profileData?.first_name || "User"}
          </span>
          <FaChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
            <div className="md:hidden px-4 py-2 border-b">
              <NavigationLinks isMobileView={true} />
            </div>
            <button
              onClick={() => handleNavigate(userType === "1" ? "/candidate-profile" : userType === "2" ? "/organization-profile" : "/recruiter-profile")}
              className="w-full text-left flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              <FaUserCircle className="w-5 h-5" />
              <span>View Profile</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-gray-50"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
    <style jsx>{`
        .hidden-laptop {
  display: none;
}

@media (min-width: 1024px) {
  .hidden-laptop {
    display: block;
  }
}
      `}</style>
    </>
  );
};

export default AuthButtons;