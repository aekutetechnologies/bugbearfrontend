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
                                    <p className="font-lg color-text-paragraph-2">
                                        Your privacy is important to us
                                    </p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">
                                                Home
                                            </Link>
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
                            We, at Bugbear, are committed to respecting your online privacy and ensuring your
                            personal information is secure. "Personal Information" includes, but is not limited
                            to, your name, email address, phone number, and other details you provide to us.
                            This policy explains how we collect, use, and safeguard your information.
                        </p>

                        <h4 className="mt-40 mb-20">Cookies and Other Tracking Technologies</h4>
                        <p className="font-sm color-text-paragraph">
                            Bugbear uses "cookies" and tracking technologies to enhance your browsing experience.
                            Cookies allow us to monitor site usage and improve our services. You may disable cookies
                            in your browser settings, but doing so may limit your access to some features on our website.
                        </p>

                        <h4 className="mt-40 mb-20">Third-Party Services</h4>
                        <p className="font-sm color-text-paragraph">
                            Bugbear may share your information with trusted third-party service providers to deliver
                            better services. These providers are obligated to protect your data and use it only for
                            authorized purposes. We will never sell your personal information without your consent.
                        </p>

                        <h4 className="mt-40 mb-20">Your Consent</h4>
                        <p className="font-sm color-text-paragraph">
                            By using Bugbear's website, you consent to our Privacy Policy and agree to the collection
                            and use of your information as described herein.
                        </p>

                        <h4 className="mt-40 mb-20">Information Security</h4>
                        <p className="font-sm color-text-paragraph">
                            Bugbear employs industry-standard security measures to protect your personal information
                            from unauthorized access, alteration, or misuse. Only authorized personnel have access to
                            your data to ensure the highest level of confidentiality.
                        </p>

                        <h4 className="mt-40 mb-20">Children</h4>
                        <p className="font-sm color-text-paragraph">
                            Bugbear does not knowingly collect information from children under the age of 13. If you
                            believe a child has provided personal information to us, please contact us, and we will
                            take appropriate action.
                        </p>

                        <h4 className="mt-40 mb-20">Information Sharing and Disclosure</h4>
                        <p className="font-sm color-text-paragraph">
                            Bugbear will only share your personal information:
                        </p>
                        <ul className="list-disc ml-8">
                            <li>With your explicit consent.</li>
                            <li>To comply with legal obligations or court orders.</li>
                            <li>To investigate or prevent fraud, illegal activities, or potential threats to safety.</li>
                            <li>
                                With trusted partners who help us deliver services, under strict confidentiality agreements.
                            </li>
                        </ul>

                        <h4 className="mt-40 mb-20">Facebook Information Collection and Use</h4>
                        <p className="font-sm color-text-paragraph">
                            If you use Facebook features on Bugbear, we may collect your publicly shared Facebook
                            information. This data will only be used to improve your experience on our platform.
                        </p>

                        <h4 className="mt-40 mb-20">Changes to this Privacy Policy</h4>
                        <p className="font-sm color-text-paragraph">
                            Bugbear reserves the right to update this policy at any time. Changes will be posted
                            on this page, and your continued use of our services constitutes acceptance of these updates.
                        </p>

                        <h4 className="mt-40 mb-20">Contact Us</h4>
                        <p className="font-sm color-text-paragraph">
                            If you have any questions or concerns regarding this Privacy Policy, feel free to reach
                            out to us at <a href="mailto:support@bugbear.com">support@bugbear.com</a>.
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
