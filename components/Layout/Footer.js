/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className=" text-white mt-12 bg-gray-200 px-4 py-8">
            {/* <div className="container mx-24 px-4 py-8"> */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="footer-col-1 col-span-1 md:col-span-2">
                        <Link legacyBehavior href="/">
                            {/* <img alt="bugbear" src="assets/imgs/template/jobhub-logo.svg" className="mb-4" /> */}
                            <img alt="bugbear" src="/assets/imgs/template/jobhub-logo.svg" className="mb-4" />
                        </Link>
                        <p className="mt-5 mb-5 text-sm text-gray-400">
                            bugbear is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.
                        </p>
                        <div className="footer-social flex space-x-4">
                            <span className="icon-socials icon-facebook cursor-pointer" aria-label="Facebook" />
                            <span className="icon-socials icon-twitter cursor-pointer" aria-label="Twitter" />
                            <span className="icon-socials icon-linkedin cursor-pointer" aria-label="LinkedIn" />
                        </div>
                    </div>

                    <div className="footer-col-2">
                        <h6 className="mb-4 font-semibold">Resources</h6>
                        <ul className="menu-footer space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:underline">About us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">Our Team</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">Products</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col-3">
                        <h6 className="mb-4 font-semibold">Community</h6>
                        <ul className="menu-footer space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:underline">Feature</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">Pricing</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">Credit</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col-5">
                        <h6 className="mb-4 font-semibold">More</h6>
                        <ul className="menu-footer space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:underline">Privacy</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">Help</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">Terms</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:underline">FAQ</Link></li>
                        </ul>
                    </div>
                </div>

                <hr className="border-t-2 border-black my-4 mx-auto w-3/4" />

                <div className="footer-bottom mt-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm text-gray-400">Copyright © 2024. bugbear all rights reserved</span>
                        </div>
                        <div className="footer-social flex space-x-6">
                            <Link className="text-sm text-gray-400 hover:underline" href="#">Privacy Policy</Link>
                            <Link className="text-sm text-gray-400 mx-3 hover:underline" href="#">Terms &amp; Conditions</Link>
                            <Link className="text-sm text-gray-400 hover:underline" href="#">Security</Link>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </footer>
    );
};

export default Footer;
