// Header2.jsx
import Link from "next/link";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const AuthButtons = dynamic(() => import("../elements/AuthButtons"), { 
  ssr: false,
  loading: () => <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
});

const Header2 = () => {
  const [scroll, setScroll] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
      const userType = typeof window !== 'undefined' ? localStorage.getItem("userType") : null;
      setIsAuthenticated(!!token && !!userType);
    };

    checkAuthStatus();

    const handleScroll = () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener('storage', checkAuthStatus);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener('storage', checkAuthStatus);
      }
    };
  }, [scroll]);

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
    setMobileMenuOpen(false);
  };

  return (
    <header className={scroll ? "sticky-bar stick" : "sticky-bar"}>
      <div
        className={`
          ${scroll 
            ? "bg-neutral-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 backdrop-saturate-100 backdrop-contrast-125 shadow-lg shadow-sky-200" 
            : ""
          }
          px-4 py-2 mx-auto max-w-[1260px] rounded-xl transition-all duration-300
        `}
      >
        <div className="flex items-center justify-between">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <img 
              className="w-32 md:w-44" 
              alt="bugbear" 
              src="/assets/imgs/template/jobhub-logo.svg" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="lg:block">
            <AuthButtons isMobile={false} />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <RxCross2 size={24} className="text-gray-600" />
            ) : (
              <RxHamburgerMenu size={24} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4">
            <AuthButtons isMobile={true} closeMobileMenu={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </header>
  );
};

export default Header2;
