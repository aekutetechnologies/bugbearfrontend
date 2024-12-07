/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [agree, setAgree] = useState(false);

    const handleSubmit = () => {
        if (!agree) {
            toast.error('Please agree to our terms and policy.');
            return;
        }

        if (!name || !email || !message) {
            toast.error('Please fill out all required fields.');
            return;
        }

        toast.info('Sending...');

        // Replace these values with your EmailJS details
        const serviceId = 'YOUR_EMAILJS_SERVICE_ID';
        const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
        const userId = 'YOUR_EMAILJS_USER_ID'; 

        const templateParams = {
            name: name,
            email: email
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then((result) => {
                console.log('EmailJS result:', result.text);
                toast.success('Your message has been sent!');
                // Reset fields after success
                setName('');
                setCompany('');
                setEmail('');
                setPhone('');
                setMessage('');
                setAgree(false);
            }, (error) => {
                console.error('EmailJS error:', error.text);
                toast.error('Failed to send message. Please try again later.');
            });
    };

    return (
        <Layout>
            <div>
                <section className="section-box">
                    <div className="breacrumb-cover bg-img-about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-10">Contact</h2>
                                    <p className="font-lg color-text-paragraph-2">Reach out to the bugbear team anytime</p>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <ul className="breadcrumbs mt-40">
                                        <li>
                                            <Link href="/" className="home-icon">Home</Link>
                                        </li>
                                        <li>Contact</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mb-40">
                                <span className="font-md color-brand-2 mt-20 d-inline-block">Contact us</span>
                                <h2 className="mt-5 mb-10">Get in Touch with bugbear</h2>
                                <p className="font-md color-text-paragraph-2">
                                    We’re here to help you navigate the cybersecurity job market. 
                                    Whether you’re a seasoned professional or a newcomer to the field, 
                                    our team is ready to assist with your queries, provide guidance, 
                                    and help you find the right opportunity.
                                </p>
                                <div className="contact-form-style mt-30">
                                    <div className="row wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <input
                                                    className="font-sm color-text-paragraph-2"
                                                    placeholder="Enter your name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <input
                                                    className="font-sm color-text-paragraph-2"
                                                    placeholder="Company (optional)"
                                                    type="text"
                                                    value={company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <input
                                                    className="font-sm color-text-paragraph-2"
                                                    placeholder="Your email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <input
                                                    className="font-sm color-text-paragraph-2"
                                                    placeholder="Phone number"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="textarea-style mb-30">
                                                <textarea
                                                    className="font-sm color-text-paragraph-2"
                                                    placeholder="How can we help you?"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                />
                                            </div>
                                            <button className="submit btn btn-send-message" onClick={handleSubmit}>
                                                Send message
                                            </button>
                                            <label className="ml-20">
                                                <input
                                                    className="float-start mr-5 mt-6"
                                                    type="checkbox"
                                                    checked={agree}
                                                    onChange={(e) => setAgree(e.target.checked)}
                                                /> By contacting us, you agree to our terms and policy.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center d-none d-lg-block">
                                <img src="assets/imgs/page/contact/img.png" alt="bugbear" />
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </Layout>
    );
}
