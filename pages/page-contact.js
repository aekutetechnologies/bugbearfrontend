/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import BlogSlider from "./../components/sliders/Blog";
import TestimonialSlider1 from "./../components/sliders/Testimonial1";

export default function Contact() {
    return (
        <>
            <Layout>
                <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">About Us</h2>
                                    <p className="font-lg color-text-paragraph-2">
                                        Learn more about our mission, values, and the team 
                                        dedicated to helping cybersecurity professionals connect 
                                        with meaningful opportunities.
                                    </p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <a className="home-icon" href="/">
                                                Home
                                            </a>
                                        </li>
                                        <li>About Us</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                    <section className="section-box mt-80">
                        <div className="container">
                            <div className="box-info-contact">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                                        <a href="#">
                                            <img src="/assets/imgs/template/jobhub-logo.svg" alt="bugbear" />
                                        </a>
                                        <div className="font-sm color-text-paragraph">
                                            205 North Michigan Avenue, Suite 810 Chicago, 60601, USA
                                            <br /> Phone: (123) 456-7890
                                            <br /> Email: contact@bugbear.com
                                        </div>
                                        <a className="text-uppercase color-brand-2 link-map" href="#">
                                            View map
                                        </a>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                                        <h6>London</h6>
                                        <p className="font-sm color-text-paragraph mb-20">
                                            2118 Thornridge Cir. Syracuse,
                                            <br className="d-none d-lg-block" /> Connecticut 35624
                                        </p>
                                        <h6>New York</h6>
                                        <p className="font-sm color-text-paragraph mb-20">
                                            4517 Washington Ave.
                                            <br className="d-none d-lg-block" /> Manchester, Kentucky 39495
                                        </p>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                                        <h6>Chicago</h6>
                                        <p className="font-sm color-text-paragraph mb-20">
                                            3891 Ranchview Dr. Richardson,
                                            <br className="d-none d-lg-block" /> California 62639
                                        </p>
                                        <h6>San Francisco</h6>
                                        <p className="font-sm color-text-paragraph mb-20">
                                            4140 Parker Rd. Allentown,
                                            <br className="d-none d-lg-block" /> New Mexico 31134
                                        </p>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                                        <h6>Sysney</h6>
                                        <p className="font-sm color-text-paragraph mb-20">
                                            3891 Ranchview Dr. Richardson,
                                            <br className="d-none d-lg-block" /> California 62639
                                        </p>
                                        <h6>Singapore</h6>
                                        <p className="font-sm color-text-paragraph mb-20">
                                            4140 Parker Rd. Allentown,
                                            <br className="d-none d-lg-block" /> New Mexico 31134
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
