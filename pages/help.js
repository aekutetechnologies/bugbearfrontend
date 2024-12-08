/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function Help() {
    const faqs = [
        {
            question: "Are these jobs contractual?",
            answer: (
                <>
                    <p>
                        Yes. bugbear developer jobs are contractual in nature. 
                        However, unlike most contract roles, bugbear focuses on creating 
                        long-term, full-time, high-value engagements specifically in the 
                        cybersecurity domain. These engagements typically last between 9 to 18 months. 
                        Once you complete a project with a client, bugbear offers lifelong rematching 
                        opportunities. You won’t need to go through the vetting process again, as your 
                        performance, along with your previous results, will be factored 
                        into your profile to help match you with future cybersecurity roles. 
                        bugbear’s matching team actively works behind the scenes to pair 
                        you with another leading company.
                    </p>
                    <p>
                        Currently, bugbear developers have a rematch rate of 98%, 
                        highlighting the platform's effectiveness in providing continuous 
                        work for its developers.
                    </p>
                </>
            ),
        },
        {
            question: "Will I be bugbear's employee or the partner company's employee?",
            answer: (
                <>
                    <p>
                        Once you are hired for a role with a bugbear partner company, 
                        your contract will be with bugbear. You will be officially on 
                        bugbear’s payroll, even though your day-to-day work will be with 
                        a partner company in the cybersecurity field.
                    </p>
                    <p>
                        This ensures a seamless, stable payment process and a rewarding 
                        experience for developers, as bugbear handles all administrative 
                        aspects, such as payments and contracts, allowing you to focus 
                        on your work without disruptions.
                    </p>
                </>
            ),
        },
        {
            question: "How does bugbear find the perfect job for me after vetting?",
            answer: (
                <>
                    <p>
                        Once you have completed the vetting process, bugbear takes over 
                        to find you a suitable customer. Your work is done; now bugbear will 
                        bring cybersecurity jobs to you!
                    </p>
                    <p>So, how does it go?</p>
                    <ol>
                        <li>Your work experience and tech stack tests are considered.</li>
                        <li>Then results of the Coding Challenge are factored in as well.</li>
                        <li>This is combined with your resume to put together your bugbear Developer Profile.</li>
                        <li>After that, your bugbear Developer Profile is presented to multiple customers.</li>
                        <li>
                            When you are chosen as a possible candidate for a job, bugbear's onboarding team 
                            will reach out and schedule a call to discuss the job opportunity, required expertise, 
                            availability, preferred remuneration, and interest in the job. Once terms are established, 
                            you will be shortlisted for a job. If chosen, you will meet the customer in an interview.
                        </li>
                    </ol>
                    <p>
                        The terms discussed can be used for multiple jobs. Once established, they are valid for the 
                        first job with bugbear. Depending on your performance, your remuneration and role can be renegotiated. 
                        The minimum renegotiation period is 4 months, but it’s better to renegotiate between projects, 
                        not during an ongoing project.
                    </p>
                </>
            ),
        },
        {
            question: "Do we have to pay to join bugbear? Do I have to pay a fee or commission after I get hired?",
            answer: (
                <>
                    <p>
                        NO. Absolutely NOT. You don't need to pay anything in order to join bugbear and use our platform.
                    </p>
                    <p>
                        bugbear believes in the value of the world’s untapped potential. All developers are paid in FULL 
                        and DO NOT NEED TO PAY any amount before or after getting a job. bugbear developers negotiate 
                        their own remunerations. Furthermore, bugbear does not deduct any portion or percentage of your payments.
                    </p>
                    <p>
                        Join a network of the world's best cybersecurity developers & get full-time, long-term remote software jobs 
                        with better compensation and career growth. Apply now!
                    </p>
                </>
            ),
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Layout>
            <section className="section-box pt-100 login-register">
                <div className="container">
                    <div className="row login-register-cover">
                        <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
                            <h2 className="mb-30 text-center">Help & FAQs</h2>
                            <p className="text-center mb-50">
                                Find answers to common questions. Click on a question to reveal the answer.
                            </p>

                            {faqs.map((faq, index) => (
                                <div className="mb-20" key={index}>
                                    <div 
                                        className="d-flex justify-content-between align-items-center cursor-pointer" 
                                        onClick={() => toggleFAQ(index)}
                                        style={{borderBottom: '1px solid #ddd', padding: '10px 0'}}
                                    >
                                        <h4 className="m-0">{faq.question}</h4>
                                        <span>{openIndex === index ? '-' : '+'}</span>
                                    </div>
                                    {openIndex === index && (
                                        <div className="mt-10" style={{paddingLeft: '20px'}}>
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
