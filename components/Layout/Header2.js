import Link from "next/link";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { RxHamburgerMenu } from "react-icons/rx";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const AuthButtons = dynamic(() => import("../elements/AuthButtons"), { ssr: false });

const Header2 = () => {
  const [scroll, setScroll] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
      const userType = typeof window !== 'undefined' ? localStorage.getItem("userType") : null;
      
      setIsAuthenticated(!!token && !!userType);
    };

    // Check initial auth status
    checkAuthStatus();

    // Handle scroll effect
    const handleScroll = () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    // Add scroll event listener
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      
      // Add event listener for storage changes
      window.addEventListener('storage', checkAuthStatus);
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener('storage', checkAuthStatus);
      }
    };
  }, [scroll]);

  // Handle logo click based on token availability
  const handleLogoClick = () => {
    const token = localStorage.getItem("accessToken");
    const userType = localStorage.getItem("userType");

    if (token && userType === "3") {
      router.push("/dashboard/");
    } else if (token && (userType === "1" || userType === "2")) {
      router.push("/jobs-list/");
    } else {
      router.push("/");
    }
  };

  return (
    <header className={scroll ? "sticky-bar stick py-3 top-2" : "sticky-bar py-3"}>
      <div 
        className={
          scroll 
            ? "bg-neutral-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 backdrop-saturate-100 backdrop-contrast-125 py-2 mx-auto max-w-[1260px] flex justify-between rounded-xl top-2 shadow-lg shadow-sky-200" 
            : "py-2 flex justify-between"
        }
      >
        <div>
          <div 
            onClick={handleLogoClick} 
            className="cursor-pointer d-flex items-center"
          >
            <img 
              className="w-44" 
              alt="bugbear" 
              src="/assets/imgs/template/jobhub-logo.svg" 
            />
          </div>
        </div>
        <div className="lg:flex items-center gap-3">
          {isAuthenticated ? (
            <AuthButtons />
          ) : null}
        </div>
        <div className="flex lg:hidden items-center">
          <RxHamburgerMenu size={35} />
        </div>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
      />
    </header>
  );
};

export default Header2;