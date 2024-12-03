import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../util/config";

const MERI_PECHHAAN_AUTH_URL = "https://meripehchaan.gov.in/public/oauth2/1/authorize";
const MERI_PECHHAAN_TOKEN_URL = "https://meripehchaan.gov.in/public/oauth2/2/token";
const CLIENT_ID = "YOUR_CLIENT_ID"; // Replace with your Client ID
const CLIENT_SECRET = "YOUR_CLIENT_SECRET"; // Replace with your Client Secret
const REDIRECT_URI = "YOUR_REDIRECT_URI"; // Replace with your Redirect URI

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
        tc: false,
        user_type: 1, // Default user_type as Freelancer
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        const { usertype } = router.query;
        if (usertype) {
            setFormData((prevData) => ({
                ...prevData,
                user_type: parseInt(usertype),
            }));
        }

        // Handle authorization code if present in the query params
        if (router.query.code) {
            handleMeriPehchaanLogin(router.query.code);
        }
    }, [router.query]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            toast.error("Passwords do not match");
            return;
        }

        const body = {
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
            tc: formData.tc,
            user_type: formData.user_type,
        };

        try {
            const res = await fetch(`${API_BASE_URL}user/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast.success("Registration successful!");
                setError(null);
                router.push("/login");
            } else {
                const errorData = await res.json();
                toast.error(errorData.detail || "Registration failed");
                setError(errorData.detail || "Registration failed");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again later.");
            setError("Something went wrong. Please try again later.");
        }
    };

    const initiateMeriPehchaanLogin = () => {
        const state = "random_string"; // Replace with a generated random string for CSRF protection
        const authUrl = `${MERI_PECHHAAN_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=openid`;

        window.location.href = authUrl;
    };

    const handleMeriPehchaanLogin = async (code) => {
        try {
            const response = await fetch(MERI_PECHHAAN_TOKEN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    code,
                    grant_type: "authorization_code",
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            if (response.ok) {
                const tokenData = await response.json();
                console.log("Meri Pehchaan Token Data:", tokenData);

                // Handle registration or login after successful authentication
                toast.success("Meri Pehchaan login successful!");
                router.push("/dashboard"); // Redirect to dashboard or another page
            } else {
                throw new Error("Failed to authenticate with Meri Pehchaan.");
            }
        } catch (error) {
            console.error("Error during Meri Pehchaan login:", error);
            toast.error("Meri Pehchaan login failed. Please try again.");
        }
    };

    return (
        <Layout>
            <section className="pt-100 login-register">
                <div className="container">
                    <div className="row login-register-cover">
                        <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                            <div className="text-center">
                                <p className="font-sm text-brand-2">Register</p>
                                <h2 className="mt-10 mb-5 text-brand-1">Start for free Today</h2>
                                <p className="font-sm text-muted mb-30">
                                    Access to all features. No credit card required.
                                </p>
                                <button
                                    className="btn social-login hover-up mb-20 flex items-center justify-center gap-3"
                                    onClick={initiateMeriPehchaanLogin}
                                    style={{ padding: "10px 20px" }} // Adjust padding as needed
                                >
                                    <img
                                        src="assets/imgs/template/icons/icon-digilocker.svg"
                                        alt="bugbear"
                                        style={{ width: "24px", height: "24px" }} // Set the desired width and height for the image
                                    />
                                    <strong>Sign up with Meri Pehchaan</strong>
                                </button>
                                <div className="divider-text-center">
                                    <span>Or continue with</span>
                                </div>
                            </div>

                            <form
                                className="login-register text-start mt-20"
                                onSubmit={handleSubmit}
                            >
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">
                                        Email *
                                    </label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="stevenjob@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">
                                        Password *
                                    </label>
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="************"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password2">
                                        Confirm Password *
                                    </label>
                                    <input
                                        className="form-control"
                                        id="password2"
                                        type="password"
                                        name="password2"
                                        placeholder="************"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="login_footer form-group d-flex justify-content-between">
                                    <label className="cb-container">
                                        <input
                                            type="checkbox"
                                            name="tc"
                                            checked={formData.tc}
                                            onChange={handleChange}
                                        />
                                        <span className="text-small">
                                            Agree to our terms and policy
                                        </span>
                                        <span className="checkmark" />
                                    </label>
                                    <Link href="/page-contact">
                                        <span className="text-muted">Learn more</span>
                                    </Link>
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-brand-1 hover-up w-100"
                                        type="submit"
                                    >
                                        Submit &amp; Register
                                    </button>
                                </div>
                                <div className="text-muted text-center">
                                    Already have an account?
                                    <Link href="/login">
                                        <span>Sign in</span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <div className="img-1 d-none d-lg-block">
                            <img
                                className="shape-1"
                                src="assets/imgs/page/login-register/img-1.svg"
                                alt="bugbear"
                            />
                        </div>
                        <div className="img-2">
                            <img
                                src="assets/imgs/page/login-register/img-2.svg"
                                alt="bugbear"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </Layout>
    );
}
