/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function Privacy() {
    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">Privacy Policy</h2>
                                    <p className="font-lg color-text-paragraph-2">Your privacy is important to us</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>Privacy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-80">
                    <div className="container">
                        <h3 className="mb-40">Introduction</h3>
                        <p className="font-sm color-text-paragraph">
                            We respect your privacy and are committed to protecting it through our compliance with this policy.
                        </p>
                        <h4 className="mt-40 mb-20">Information We Collect</h4>
                        <p className="font-sm color-text-paragraph">
                            Details on what information we collect about our users.
                        </p>
                        <h4 className="mt-40 mb-20">How We Use Your Information</h4>
                        <p className="font-sm color-text-paragraph">
                            Explanation of how we handle and utilize the collected information.
                        </p>
                        {/* Add more sections as necessary */}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
