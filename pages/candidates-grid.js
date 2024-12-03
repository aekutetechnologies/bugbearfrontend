/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import BlogSlider from "./../components/sliders/Blog";
import cookie from "cookie";
import API_BASE_URL from "../util/config";

const AlphabetList = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return (
        <ul>
            {alphabets.map((letter, index) => (
                <li key={index}>
                    <Link legacyBehavior href="#">
                        <a>{letter}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const Pagination = () => {
    const pages = [1, 2, 3, 4, 5, 6, 7];
    return (
        <ul className="pager">
            <li>
                <a className="pager-prev" href="#" />
            </li>
            {pages.map((page) => (
                <li key={page}>
                    <Link legacyBehavior href="#">
                        <a className={`pager-number ${page === 6 ? 'active' : ''}`}>{page}</a>
                    </Link>
                </li>
            ))}
            <li>
                <a className="pager-next" href="#" />
            </li>
        </ul>
    );
};

const CandidateCard = ({ candidate }) => {
    return (
        <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card-grid-2 hover-up">
                <div className="card-grid-2-image-left">
                    <div className="card-grid-2-image-rd online">
                        <Link legacyBehavior href="/candidate-details">
                            <a>
                                <figure>
                                    <img alt="bugbear" src={candidate.imageUrl} />
                                </figure>
                            </a>
                        </Link>
                    </div>
                    <div className="card-profile pt-10">
                        <Link legacyBehavior href="/candidate-details">
                            <a>
                                <h5>{candidate.name}</h5>
                            </a>
                        </Link>
                        <span className="font-xs color-text-mutted">{candidate.role}</span>
                        <div className="rate-reviews-small pt-5">
                            {[...Array(candidate.rating)].map((_, i) => (
                                <span key={i}>
                                    <img src="assets/imgs/template/icons/star.svg" alt="bugbear" />
                                </span>
                            ))}
                            <span className="ml-10 color-text-mutted font-xs">({candidate.reviews})</span>
                        </div>
                    </div>
                </div>
                <div className="card-block-info">
                    <p className="font-xs color-text-paragraph-2">
                        | Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellendus magni, atque delectus molestias quis?
                    </p>
                    <div className="card-2-bottom card-2-bottom-candidate mt-30">
                        <div className="text-start">
                            {candidate.skills.map((skill, idx) => (
                                <Link legacyBehavior href="/jobs-grid" key={idx}>
                                    <a className="btn btn-tags-sm mb-10 mr-5">{skill}</a>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="employers-info align-items-center justify-content-center mt-15">
                        <div className="row">
                            <div className="col-6">
                                <span className="d-flex align-items-center">
                                    <i className="fi-rr-marker mr-5 ml-0" />
                                    <span className="font-sm color-text-mutted">{candidate.location}</span>
                                </span>
                            </div>
                            <div className="col-6">
                                <span className="d-flex justify-content-end align-items-center">
                                    <i className="fi-rr-clock mr-5" />
                                    <span className="font-sm color-brand-1">{candidate.rate}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CandidateGrid({ applicants, featuredJobs }) {
    return (
        <>
            <Layout>
                <div>
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-company">
                                <div className="block-banner text-center">
                                    <h3 className="wow animate__animated animate__fadeInUp">Browse Candidates</h3>
                                    <div className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellendus magni,
                                        <br className="d-none d-xl-block" />
                                        atque delectus molestias quis?
                                    </div>
                                    <div className="box-list-character">
                                        <AlphabetList />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-30">
                        <div className="container">
                            <div className="content-page">
                                <div className="row">
                                    {applicants.map((candidate, index) => (
                                        <CandidateCard candidate={candidate} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="paginations">
                                <Pagination />
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-50">
                        <div className="container">
                            <div className="text-start">
                                <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">News and Blog</h2>
                                <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Get the latest news, updates and tips</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="mt-50">
                                <div className="box-swiper style-nav-top">
                                    <BlogSlider />
                                </div>
                                <div className="text-center">
                                    <Link legacyBehavior href="blog-grid">
                                        <a className="btn btn-brand-1 btn-icon-load mt--30 hover-up">Load More Posts</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-20">
                        <div className="container">
                            <div className="box-newsletter">
                                <div className="row">
                                    <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                        <img src="assets/imgs/template/newsletter-left.png" alt="joxBox" />
                                    </div>
                                    <div className="col-lg-12 col-xl-6 col-12">
                                        <h2 className="text-md-newsletter text-center">
                                            New Things Will Always
                                            <br /> Update Regularly
                                        </h2>
                                        <div className="box-form-newsletter mt-40">
                                            <form className="form-newsletter">
                                                <input className="input-newsletter" type="text" placeholder="Enter your email here" />
                                                <button className="btn btn-default font-heading icon-send-letter">Subscribe</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                        <img src="assets/imgs/template/newsletter-right.png" alt="joxBox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}

// Fetch data from the API
export async function getServerSideProps(context) {
    const { id } = context.query;  // Get job_id from query parameters

    try {
        // Parse cookies from the request header
        const cookies = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};
        const token = cookies.accessToken; // Get the token from cookies

        // Fetch the applicants for the job
        const res = await fetch(`${API_BASE_URL}jobs/applicants/${id}/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch applicants: ${res.status}`);
        }

        const applicants = await res.json();

        console.log("Applicants:", applicants);
        

        return {
            props: { applicants },
        };
    } catch (error) {
        console.error("Error fetching job details:", error);

        return {
            props: { applicants: [], featuredJobs: [] }, // Return empty arrays if fetching fails
        };
    }
}
