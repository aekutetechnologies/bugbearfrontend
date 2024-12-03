import Link from "next/link";
import Layout from "../components/Layout/Layout";
import React, { useState } from "react";

export default function CandidateDetails() {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => setActiveIndex(index);

    return (
        <>
            <Layout>
                <section className="section-box-2">
                    <div className="container">
                        <div className="banner-hero banner-image-single">
                            <img src="assets/imgs/page/candidates/img.png" alt="bugbear" />
                        </div>
                        <div className="box-company-profile">
                            <div className="image-compay">
                                <img src="assets/imgs/page/candidates/candidate-profile.png" alt="bugbear" />
                            </div>
                            <div className="row mt-10">
                                <div className="col-lg-8 col-md-12">
                                    <h5 className="f-18">
                                        Steven Jobs <span className="card-location font-regular ml-20">New York, US</span>
                                    </h5>
                                    <p className="mt-0 font-md color-text-paragraph-2 mb-15">UI/UX Designer. Front end Developer</p>
                                    <div className="mt-10 mb-15">
                                        <img src="assets/imgs/template/icons/star.svg" alt="bugbear" />
                                        <img src="assets/imgs/template/icons/star.svg" alt="bugbear" />
                                        <img src="assets/imgs/template/icons/star.svg" alt="bugbear" />
                                        <img src="assets/imgs/template/icons/star.svg" alt="bugbear" />
                                        <img src="assets/imgs/template/icons/star.svg" alt="bugbear" />
                                        <span className="font-xs color-text-mutted ml-10">(66)</span>
                                        <img className="ml-30" src="assets/imgs/page/candidates/verified.png" alt="bugbear" />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 text-lg-end">
                                    <Link href="page-contact" legacyBehavior>
                                        <a className="btn btn-download-icon btn-apply btn-apply-big">Download CV</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="box-nav-tabs mt-40 mb-5">
                            <ul className="nav" role="tablist">
                                <li>
                                    <a className={`btn btn-border aboutus-icon mr-15 mb-5 ${activeIndex === 1 ? "active" : ""}`} onClick={() => handleOnClick(1)}>
                                        Short Bio
                                    </a>
                                </li>
                                <li>
                                    <a className={`btn btn-border recruitment-icon mr-15 mb-5 ${activeIndex === 2 ? "active" : ""}`} onClick={() => handleOnClick(2)}>
                                        Skills
                                    </a>
                                </li>
                                <li>
                                    <a className={`btn btn-border people-icon mb-5 ${activeIndex === 3 ? "active" : ""}`} onClick={() => handleOnClick(3)}>
                                        Working Experience
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="border-bottom pt-10 pb-10" />
                    </div>
                </section>

                <section className="section-box mt-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                                <div className="content-single">
                                    <div className="tab-content">
                                        {/* Short Bio */}
                                        <div className={`tab-pane fade ${activeIndex === 1 && "show active"}`}>
                                            <h4>About Me</h4>
                                            <p>
                                                Hello there! My name is Alan Walker. I am a graphic designer, and I’m very passionate and dedicated to my work. With 20 years experience as a professional graphic designer, I have acquired the skills and knowledge necessary to make your project a success.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!
                                            </p>
                                        </div>

                                        {/* Skills */}
                                        <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
                                            <h4>Skills</h4>
                                            <p>
                                                Hello there! My name is Alan Walker. I am a graphic designer, and I’m very passionate and dedicated to my work. With 20 years experience as a professional graphic designer, I have acquired the skills and knowledge necessary to make your project a success.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!
                                            </p>
                                        </div>

                                        {/* Working Experience */}
                                        <div className={`tab-pane fade ${activeIndex === 3 && "show active"}`}>
                                            <h4>Work Experience</h4>
                                            <p>
                                                Hello there! My name is Alan Walker. I am a graphic designer, and I’m very passionate and dedicated to my work. With 20 years experience as a professional graphic designer, I have acquired the skills and knowledge necessary to make your project a success.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Sidebar */}
                            <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
                                <div className="sidebar-border">
                                    <h5 className="f-18">Overview</h5>
                                    <div className="sidebar-list-job">
                                        <ul>
                                            <li>
                                                <div className="sidebar-icon-item">
                                                    <i className="fi-rr-briefcase" />
                                                </div>
                                                <div className="sidebar-text-info">
                                                    <span className="text-description">Experience</span>
                                                    <strong className="small-heading">12 years</strong>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="sidebar-icon-item">
                                                    <i className="fi-rr-dollar" />
                                                </div>
                                                <div className="sidebar-text-info">
                                                    <span className="text-description">Expected Salary</span>
                                                    <strong className="small-heading">$26k - $30k</strong>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="sidebar-icon-item">
                                                    <i className="fi-rr-marker" />
                                                </div>
                                                <div className="sidebar-text-info">
                                                    <span className="text-description">Language</span>
                                                    <strong className="small-heading">English, German</strong>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="sidebar-icon-item">
                                                    <i className="fi-rr-time-fast" />
                                                </div>
                                                <div className="sidebar-text-info">
                                                    <span className="text-description">Education Level</span>
                                                    <strong className="small-heading">Master Degree</strong>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-30">
                                        <Link href="page-contact" legacyBehavior>
                                            <a className="btn btn-send-message">Send Message</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="section-box mt-50 mb-20">
                    <div className="container">
                        <div className="box-newsletter">
                            <div className="row">
                                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                    <img src="assets/imgs/template/newsletter-left.png" alt="bugbear" />
                                </div>
                                <div className="col-lg-12 col-xl-6 col-12">
                                    <h2 className="text-md-newsletter text-center">
                                        New Things Will Always <br /> Update Regularly
                                    </h2>
                                    <div className="box-form-newsletter mt-40">
                                        <form className="form-newsletter">
                                            <input className="input-newsletter" type="text" placeholder="Enter your email here" />
                                            <button className="btn btn-default font-heading icon-send-letter">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                    <img src="assets/imgs/template/newsletter-right.png" alt="bugbear" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
