/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="text-white mt-12 bg-gray-200 px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {/* Logo and Description */}
                <div className="col-span-1 md:col-span-2">
                    <Link legacyBehavior href="/">
                        <img 
                            alt="bugbear" 
                            src="/assets/imgs/template/jobhub-logo.svg" 
                            className="mb-4 w-32 sm:w-40 md:w-44" 
                        />
                    </Link>
                    <p className="mt-5 mb-5 text-sm text-gray-400">
                        bugbear is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.
                    </p>
                    <div className="footer-social flex justify-center md:justify-start space-x-4">
                        <span className="icon-socials icon-facebook cursor-pointer" aria-label="Facebook" />
                        <span className="icon-socials icon-twitter cursor-pointer" aria-label="Twitter" />
                        <span className="icon-socials icon-linkedin cursor-pointer" aria-label="LinkedIn" />
                    </div>
                </div>

                {/* Resources */}
                <div className="text-center sm:text-left md:text-right">
                    <h6 className="mb-4 font-semibold">Resources</h6>
                    <ul className="space-y-2">
                        <li>
                            <Link href="page-contact/" className="text-gray-400 hover:underline">
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link href="contact/" className="text-gray-400 hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* More */}
                <div className="text-center sm:text-left md:text-right">
                    <h6 className="mb-4 font-semibold">More</h6>
                    <ul className="space-y-2">
                        <li>
                            <Link href="privacy/" className="text-gray-400 hover:underline">
                                Privacy
                            </Link>
                        </li>
                        <li>
                            <Link href="help/" className="text-gray-400 hover:underline">
                                Help & FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="terms/" className="text-gray-400 hover:underline">
                                Terms
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} bugbear. All rights reserved.
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .footer-social {
                        justify-content: center;
                    }
                    .sm\\:text-left {
                        text-align: center;
                    }
                    .md\\:text-right {
                        text-align: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
