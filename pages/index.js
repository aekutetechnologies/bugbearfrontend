﻿/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout/Layout";
import CategorySlider from "../components/sliders/Category";
import TopRekruterSlider from "../components/sliders/TopRekruter";
import BlogSlider from "../components/sliders/Blog";
import CategoryTab from "../components/elements/CategoryTab";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import emailjs from 'emailjs-com';
import API_BASE_URL from "../util/config";

export default function Home() {
    const [keyword, setKeyword] = useState("");
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push({
            pathname: "/jobs-list",
            query: {
                keyword,
            },
        });
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE_URL}user/send-subscribe/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setEmail('');
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Layout>
                {/* Hero Section */}
                <section className="section-box ">
                    <div className="container mx-auto">
                        <div className="banner-hero hero-1  ">
                            <div className="banner-inner  ">
                                <div className="row ">
                                    <div className="col-xl-8 col-lg-12  ">
                                        <div className="block-banner ">
                                            <h1 className="heading-banner wow animate__animated animate__fadeInUp">
                                                The <span className="color-brand-2">Premier Platform </span>
                                                <br className="d-none d-lg-block" />
                                                for Cybersecurity Careers
                                            </h1>
                                            <div
                                                className="banner-description mt-20 wow animate__animated animate__fadeInUp"
                                                data-wow-delay=".1s"
                                            >
                                                Each month, over 1k+ cybersecurity professionals trust <br className="d-none d-lg-block" />
                                                our platform in their search for specialized roles, resulting in <br className="d-none d-lg-block" />
                                                10,000+ applications for critical security positions daily
                                            </div>
                                            <div
                                                className="form-find mt-40 wow animate__animated animate__fadeIn"
                                                data-wow-delay=".2s"
                                            >
                                                <form onSubmit={handleSearch}>
                                                    <input
                                                        className="form-input input-keysearch mr-10"
                                                        type="text"
                                                        placeholder="Your keyword..."
                                                        value={keyword}
                                                        onChange={(e) => setKeyword(e.target.value)}
                                                    />
                                                    <button className="btn btn-default btn-find font-sm" type="submit">
                                                        Search
                                                    </button>
                                                </form>
                                            </div>
                                            <div
                                                className="list-tags-banner mt-60 wow animate__animated animate__fadeInUp"
                                                data-wow-delay=".3s"
                                            >
                                                <strong>Popular Searches:</strong>
                                                <Link href={{ pathname: '/jobs-list', query: { category: 'devsecops' } }}>
                                                    DevSecOps,
                                                </Link>
                                                <Link href={{ pathname: '/jobs-list', query: { category: 'vpat' } }}>
                                                    VPAT,
                                                </Link>
                                                <Link href={{ pathname: '/jobs-list', query: { category: 'network-security' } }}>
                                                    Network Security,
                                                </Link>
                                                <Link href={{ pathname: '/jobs-list', query: { category: 'webproxy' } }}>
                                                    Web Proxy,
                                                </Link>
                                                <Link href={{ pathname: '/jobs-list', query: { category: 'socaas' } }}>
                                                    SOCaaS,
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-12 d-none d-xl-block col-md-6 ">
                                        <div className="banner-imgs">
                                            <div className="block-1 shape-1">
                                                <img
                                                    className="img-responsive"
                                                    alt="bugbear"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        borderLeft: "10px solid #3457D5",
                                                        borderBottom: "10px solid #3457D5",
                                                        borderTopLeftRadius: "40px",
                                                        borderTopRightRadius: "40px",
                                                        borderBottomRightRadius: "80px",
                                                    }}
                                                    src="assets/imgs/page/homepage1/nbanner1.jpeg"
                                                />
                                            </div>
                                            <div className="block-2 shape-2">
                                                <img
                                                    className="img-responsive"
                                                    alt="bugbear"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        borderLeft: "5px solid #3457D5",
                                                        borderBottom: "5px solid #3457D5",
                                                        borderTopLeftRadius: "30px",
                                                        borderTopRightRadius: "30px",
                                                        borderBottomRightRadius: "80px",
                                                    }}
                                                    src="assets/imgs/page/homepage1/nbanner2.jpeg"
                                                />
                                            </div>
                                            <div className="block-3 shape-3">
                                                <img
                                                    className="img-responsive"
                                                    alt="bugbear"
                                                    src="assets/imgs/page/homepage1/icon-top-banner.png"
                                                    style={{ width: "100%", height: "auto" }}
                                                />
                                            </div>
                                            <div className="block-4 shape-3">
                                                <img
                                                    className="img-responsive"
                                                    alt="bugbear"
                                                    src="assets/imgs/page/homepage1/icon-bottom-banner.png"
                                                    style={{ width: "100%", height: "auto" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Slider */}
                <section className="mt-20">
                    <div className="animate__animated animate__fadeIn">
                        <div className="container mx-auto">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-6 animate__animated animate__fadeInUp">
                                    Browse by security specialty
                                </h2>
                                <p className="text-lg text-gray-500 animate__animated animate__fadeInUp">
                                    Find specialized cybersecurity roles tailored to your expertise. Over 800+ new security positions daily.
                                </p>
                            </div>
                            <div className="mt-12 ">
                                <CategorySlider />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advertisement Section */}
                <div className="section-box mb-30">
                    <div className="container">
                        <div className="box-we-hiring">
                            <div className="text-1">
                                <span className="text-we-are">We are</span>
                                <span className="text-hiring">Hiring</span>
                            </div>
                            <div className="text-2">
                                Secure <span className="color-brand-1">Solutions</span> Need
                                <br /> <span className="color-brand-1">Expert</span> Defenders
                            </div>
                            <div className="text-3">
                                <div
                                    className="btn btn-apply btn-apply-icon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                >
                                    <Link href="/login" passHref>
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rating Section */}
                <section className="overflow-visible my-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <h1 className="text-brand-2 text-4xl font-bold">
                                <span className="count">25</span>
                                <span> K+</span>
                            </h1>
                            <h5 className="text-lg font-medium">Security Positions Filled</h5>
                            <p className="text-sm text-gray-500 mt-2">
                                We've successfully matched thousands
                                <br className="hidden lg:block" />
                                of cybersecurity professionals with
                                <br className="hidden lg:block" />
                                their ideal roles
                            </p>
                        </div>
                        <div className="text-center">
                            <h1 className="text-brand-2 text-4xl font-bold">
                                <span className="count">17</span>
                                <span> +</span>
                            </h1>
                            <h5 className="text-lg font-medium">Global Locations</h5>
                            <p className="text-sm text-gray-500 mt-2">
                                Our network spans continents to
                                <br className="hidden lg:block" />
                                connect security talent with leading
                                <br className="hidden lg:block" />
                                organizations worldwide
                            </p>
                        </div>
                        <div className="text-center">
                            <h1 className="text-brand-2 text-4xl font-bold">
                                <span className="count">86</span>
                                <span> +</span>
                            </h1>
                            <h5 className="text-lg font-medium">Security Specializations</h5>
                            <p className="text-sm text-gray-500 mt-2">
                                From threat intelligence to
                                <br className="hidden lg:block" />
                                compliance experts, we cover all
                                <br className="hidden lg:block" />
                                cybersecurity disciplines
                            </p>
                        </div>
                        <div className="text-center">
                            <h1 className="text-brand-2 text-4xl font-bold">
                                <span className="count">28</span>
                                <span> +</span>
                            </h1>
                            <h5 className="text-lg font-medium">Fortune 500 Clients</h5>
                            <p className="text-sm text-gray-500 mt-2">
                                Leading enterprises trust our
                                <br className="hidden lg:block" />
                                platform to secure their most
                                <br className="hidden lg:block" />
                                critical security talent needs
                            </p>
                        </div>
                    </div>
                </section>

                {/* Top Recruiters Slider */}
                <section className="mt-12">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4 animate__animated animate__fadeInUp">
                                Top Security Recruiters
                            </h2>
                            <p className="text-lg text-gray-600 animate__animated animate__fadeInUp">
                                Connect with leading cybersecurity employers and consultancies
                            </p>
                        </div>
                        <div className="mt-12">
                            <TopRekruterSlider />
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="section-box mt-12 mb-5">
                    <div className="container mx-auto">
                        <div className="box-newsletter">
                            <div className="flex flex-wrap justify-center">
                                {/* <div className="xl:flex flex-col items-center">
                                    <img
                                        src="assets/imgs/template/newsletter1.jpg"
                                        alt="joxBox"
                                        className="w-24 rounded-lg mt-4"
                                    />
                                    <img
                                        src="assets/imgs/template/newsletter3.jpg"
                                        alt="joxBox"
                                        className="w-36 rounded-lg mt-4"
                                    />
                                </div> */}
                                <div className="col-lg-12 col-xl-6 col-12">
                                    <h2 className="text-md-newsletter text-center">
                                        Stay Updated on Emerging
                                        <br /> Security Threats & Opportunities
                                    </h2>
                                    <div className="box-form-newsletter mt-40">
                                        <form className="form-newsletter" onSubmit={handleSubscribe}>
                                            <input
                                                className="input-newsletter"
                                                placeholder="Enter your email here"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className="btn btn-default font-heading icon-send-letter">
                                                Subscribe
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                {/* <div className="xl:flex flex-col items-center">
                                    <img
                                        src="assets/imgs/template/newsletter4.jpeg"
                                        alt="joxBox"
                                        className="w-36 rounded-lg relative -top-12 -left-2"
                                    />
                                    <img
                                        src="assets/imgs/template/newsletter1.jpg"
                                        alt="joxBox"
                                        className="w-20 rounded-lg relative top-20 -left-2 mt-4"
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popup for "Thanks for Subscribing" */}
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <p>Thank you for subscribing! 🎉</p>
                        </div>
                    </div>
                )}

                <style jsx>{`
                    .popup-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .popup-content {
                        background: white;
                        padding: 20px 40px;
                        border-radius: 8px;
                        text-align: center;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    /* Responsive Styles */
                    @media only screen and (max-width: 768px) {
                        .banner-hero .banner-imgs {
                            display: none;
                        }
                        // .banner-hero .block-banner {
                        //     text-align: center;
                        // }
                        .banner-hero .heading-banner {
                            font-size: 2.5rem;
                        }
                        .banner-hero .banner-description {
                            font-size: 0.9rem;
                        }
                        .list-tags-banner {
                            font-size: 0.9rem;
                        }
                    }

                    @media only screen and (max-width: 1024px) {
                        .banner-hero .banner-imgs {
                            display: none;
                        }
                    }
                `}</style>
            </Layout>
        </>
    );
}
