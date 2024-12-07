/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function Feature() {
    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">Features</h2>
                                    <p className="font-lg color-text-paragraph-2">Learn about our key features</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>Features</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-80">
                    <div className="container">
                        <h3 className="text-center mb-40">Why Choose Us</h3>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/icons/feature1.svg" alt="Feature 1" className="mb-20" />
                                <h5>Feature One</h5>
                                <p className="font-sm color-text-paragraph">Description of feature one.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/icons/feature2.svg" alt="Feature 2" className="mb-20" />
                                <h5>Feature Two</h5>
                                <p className="font-sm color-text-paragraph">Description of feature two.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/icons/feature3.svg" alt="Feature 3" className="mb-20" />
                                <h5>Feature Three</h5>
                                <p className="font-sm color-text-paragraph">Description of feature three.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
