/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function About() {
  return (
    <>
      <Layout>
        <div>
          {/* About Section */}
          <section className="section-box">
            <div className="breacrumb-cover bg-img-about">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 className="mb-10">About Bugbear Secure Connect</h2>
                    <p className="font-lg color-text-paragraph-2">
                      Bugbear bridges organizations and cybersecurity experts through a secure VDI platform,
                      offering scalable, on-demand access to top-tier cybersecurity talent. Our mission is to enhance
                      digital security and trust for businesses across India.
                    </p>
                    <p className="font-lg color-text-paragraph-2">
                      <strong>Your Gateway to Trusted Cybersecurity Expertise</strong>
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

          {/* Team Section */}
          <section className="section-box mt-80" style={{ backgroundColor: "#f3f4f6", padding: "60px 0", borderRadius: "10px" }}>
            <div className="container">
              <h3 className="mb-40 text-center" style={{ color: "#333", fontWeight: "700" }}>The Team</h3>
              <div className="row">
                <div className="col-lg-4 text-center">
                  <div style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                    <h5 style={{ color: "#111", fontWeight: "600" }}>Sourav Das</h5>
                    <p className="font-sm color-text-paragraph">
                      B.Tech Engineer with 16 years of education and 8 years in cybersecurity. Specializes in DevSecOps,
                      Security Architecture, Application Security, VA/PT, SOC (SIEM), Cloud Security, and Compliance Audit.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 text-center">
                  <div style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                    <h5 style={{ color: "#111", fontWeight: "600" }}>Manoj K Korekka</h5>
                    <p className="font-sm color-text-paragraph">
                      Experienced cybersecurity leader with 10+ years implementing robust security architectures, driving
                      DevSecOps, conducting vulnerability assessments, penetration testing, and security audits.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 text-center">
                  <div style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                    <h5 style={{ color: "#111", fontWeight: "600" }}>Jagdish Pati</h5>
                    <p className="font-sm color-text-paragraph">
                      B.Tech Engineer with 18 years of education and 11+ years as a software professional specializing in
                      Banking & Financial Services, Functional Testing, and Automation Testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="section-box mt-80">
            <div className="container">
              <h3 className="mb-20">Join Us in Securing India's Digital Future</h3>
              <p>Contact us for more information:</p>
              <p>
                Phone: <a href="tel:+919861727532">+91-9861727532</a>
                <br /> Email: <a href="mailto:ceo@utkal.io">ceo@utkal.io</a>
                <br /> Website: <a href="https://utkal.io" target="_blank" rel="noopener noreferrer">utkal.io</a>
              </p>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
