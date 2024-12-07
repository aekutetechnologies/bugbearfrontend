/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function FAQ() {
    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">FAQ</h2>
                                    <p className="font-lg color-text-paragraph-2">Frequently Asked Questions</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>FAQ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 m-auto">
                                <h3 className="text-center mb-40">Common Queries</h3>
                                <div className="faq-item mb-30">
                                    <h5>How can I sign up?</h5>
                                    <p className="font-sm color-text-paragraph">
                                        You can sign up by clicking the “Sign Up” button at the top right corner and following the prompts.
                                    </p>
                                </div>
                                <div className="faq-item mb-30">
                                    <h5>What payment methods do you accept?</h5>
                                    <p className="font-sm color-text-paragraph">
                                        We accept all major credit cards, PayPal, and wire transfers for enterprise accounts.
                                    </p>
                                </div>
                                <div className="faq-item mb-30">
                                    <h5>Can I change my plan later?</h5>
                                    <p className="font-sm color-text-paragraph">
                                        Yes, you can upgrade or downgrade your plan anytime from your account settings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
