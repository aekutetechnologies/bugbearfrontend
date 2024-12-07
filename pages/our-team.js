/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function OurTeam() {
    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">Our Team</h2>
                                    <p className="font-lg color-text-paragraph-2">Meet the brains behind our success</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>Our Team</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-80">
                    <div className="container">
                        <h3 className="text-center mb-40">The People Who Make It Happen</h3>
                        <div className="row">
                            {/* Example team member cards */}
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/team/member1.jpg" alt="Team Member" className="mb-20 rounded-circle" width="200" height="200"/>
                                <h5>John Doe</h5>
                                <p className="font-sm color-text-paragraph">CEO &amp; Founder</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/team/member2.jpg" alt="Team Member" className="mb-20 rounded-circle" width="200" height="200"/>
                                <h5>Jane Smith</h5>
                                <p className="font-sm color-text-paragraph">Head of Marketing</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/team/member3.jpg" alt="Team Member" className="mb-20 rounded-circle" width="200" height="200"/>
                                <h5>Michael Brown</h5>
                                <p className="font-sm color-text-paragraph">Lead Engineer</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
