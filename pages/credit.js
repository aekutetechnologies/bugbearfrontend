/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function Credit() {
    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">Credit</h2>
                                    <p className="font-lg color-text-paragraph-2">Acknowledgements &amp; Attributions</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>Credit</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-80">
                    <div className="container">
                        <h3 className="text-center mb-40">Thank You to Our Contributors</h3>
                        <p className="font-md color-text-paragraph-2 text-center">
                            We would like to acknowledge the following contributors and resources that helped build this project.
                        </p>
                        <div className="row justify-content-center mt-40">
                            <div className="col-lg-8">
                                <ul className="list-unstyled font-sm color-text-paragraph-2">
                                    <li>- Icons by XYZ</li>
                                    <li>- Illustrations by ABC</li>
                                    <li>- Open source libraries including React, Next.js, etc.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
