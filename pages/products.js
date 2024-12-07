/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function Products() {
    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">Products</h2>
                                    <p className="font-lg color-text-paragraph-2">Discover our offerings</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>Products</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-80">
                    <div className="container">
                        <h3 className="text-center mb-40">Our Product Line</h3>
                        <div className="row">
                            {/* Example product cards */}
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/products/product1.png" alt="Product 1" className="mb-20" />
                                <h5>Product One</h5>
                                <p className="font-sm color-text-paragraph">A brief description of product one.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/products/product2.png" alt="Product 2" className="mb-20" />
                                <h5>Product Two</h5>
                                <p className="font-sm color-text-paragraph">A brief description of product two.</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-30 text-center">
                                <img src="/assets/imgs/products/product3.png" alt="Product 3" className="mb-20" />
                                <h5>Product Three</h5>
                                <p className="font-sm color-text-paragraph">A brief description of product three.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
