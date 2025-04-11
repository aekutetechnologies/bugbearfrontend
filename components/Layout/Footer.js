/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white mt-12 border-t border-gray-100 px-4 py-12">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link legacyBehavior href="/">
                            <img 
                                alt="bugbear" 
                                src="/assets/imgs/template/jobhub-logo.svg" 
                                className="mb-5 w-32 sm:w-40 md:w-44 cursor-pointer" 
                            />
                        </Link>
                        <p className="mt-5 mb-5 text-sm text-gray-600 leading-relaxed">
                            BugBear is the premier destination for cybersecurity professionals to discover cutting-edge career opportunities and connect with leading organizations in the rapidly evolving security landscape.
                        </p>
                        <div className="footer-social flex justify-center md:justify-start space-x-4">
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                                <span className="icon-socials icon-facebook cursor-pointer" aria-label="Facebook" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                                <span className="icon-socials icon-twitter cursor-pointer" aria-label="Twitter" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                                <span className="icon-socials icon-linkedin cursor-pointer" aria-label="LinkedIn" />
                            </a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="text-center sm:text-left md:text-left">
                        <h6 className="mb-4 font-semibold text-gray-800">Resources</h6>
                        <ul className="space-y-3">
                            <li>
                                <Link href="page-contact/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Our Mission
                                </Link>
                            </li>
                            <li>
                                <Link href="contact/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Security Partners
                                </Link>
                            </li>
                            <li>
                                <Link href="blog/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Threat Intelligence
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Professionals */}
                    <div className="text-center sm:text-left md:text-left">
                        <h6 className="mb-4 font-semibold text-gray-800">For Professionals</h6>
                        <ul className="space-y-3">
                            <li>
                                <Link href="certifications/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Certifications
                                </Link>
                            </li>
                            <li>
                                <Link href="training/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Training Resources
                                </Link>
                            </li>
                            <li>
                                <Link href="career-paths/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Career Paths
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="text-center sm:text-left md:text-left">
                        <h6 className="mb-4 font-semibold text-gray-800">Legal</h6>
                        <ul className="space-y-3">
                            <li>
                                <Link href="privacy/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="help/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Support Center
                                </Link>
                            </li>
                            <li>
                                <Link href="terms/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-center md:text-left text-sm text-gray-500">
                            © {new Date().getFullYear()} BugBear Security Jobs Portal. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6 justify-center">
                                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Sitemap</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Cookies</a></li>
                                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Accessibility</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                a:hover {
                    color: #3457D5;
                }
                .icon-socials:hover {
                    color: #3457D5;
                }
                @media (max-width: 768px) {
                    .footer-social {
                        justify-content: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
