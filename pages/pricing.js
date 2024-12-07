/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function Pricing() {
    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">Pricing</h2>
                                    <p className="font-lg color-text-paragraph-2">Find a plan that suits your needs</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>Pricing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-80">
                    <div className="container">
                        <h3 className="text-center mb-40">Choose Your Plan</h3>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-30 text-center">
                                <div className="pricing-card">
                                    <h4>Basic</h4>
                                    <p className="font-lg">$9/month</p>
                                    <p className="font-sm color-text-paragraph">Ideal for individuals</p>
                                    <button className="btn btn-brand-2 mt-20">Get Started</button>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-30 text-center">
                                <div className="pricing-card">
                                    <h4>Pro</h4>
                                    <p className="font-lg">$29/month</p>
                                    <p className="font-sm color-text-paragraph">For growing teams</p>
                                    <button className="btn btn-brand-2 mt-20">Get Started</button>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-30 text-center">
                                <div className="pricing-card">
                                    <h4>Enterprise</h4>
                                    <p className="font-lg">Contact Us</p>
                                    <p className="font-sm color-text-paragraph">Custom solutions</p>
                                    <button className="btn btn-brand-2 mt-20">Contact Sales</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
