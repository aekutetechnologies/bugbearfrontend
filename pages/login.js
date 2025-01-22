/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import API_BASE_URL from "../util/config";

export default function Signin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE_URL}user/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();

                // Store tokens in local storage
                localStorage.setItem('accessToken', data.token.access);
                localStorage.setItem('refreshToken', data.token.refresh);
                localStorage.setItem('userType', data.user_type);
                Cookies.set('accessToken', data.token.access, { expires: 1 });

                // Redirect to dashboard or another protected page
                if (data.user_type === 3) {
                    router.push('/feed');  
                    toast.success(data.msg || "Login successful!");
                } else {
                    router.push('/feed');  
                    toast.success(data.msg || "Login successful!");
                }
            } else {
                const errorData = await res.json();
                setError(errorData.msg || "Login failed");
                toast.error(errorData.msg || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
            toast.error("Something went wrong. Please try again later.");
        }
    };

    return (
        <>
            <Layout>
                <section className="pt-100 login-register">
                    <div className="container">
                        <div className="row login-register-cover">
                            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                                <div className="text-center">
                                    <p className="font-sm text-brand-2">Welcome back!</p>
                                    <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>
                                    <p className="font-sm text-muted mb-30">
                                        Access to all features. No credit card required.
                                    </p>
                                </div>
                                <form className="login-register text-start mt-20" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="input-1">
                                            Email address *
                                        </label>
                                        <input
                                            className="form-control"
                                            id="input-1"
                                            type="email"
                                            name="email"
                                            placeholder="example@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="input-4">
                                            Password *
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                className="form-control"
                                                id="input-4"
                                                type={showPassword ? "text" : "password"} // Dynamically switch between "text" and "password"
                                                name="password"
                                                placeholder="************"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                                                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                                style={{ textDecoration: "none" }}
                                            >
                                                {showPassword ? "Hide" : "Show"} {/* Display "Hide" or "Show" */}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="login_footer form-group d-flex justify-content-between">
                                        <Link legacyBehavior href="/page-reset-password">
                                            <a className="text-muted">Forgot Password</a>
                                        </Link>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-brand-1 hover-up w-100"
                                            type="submit"
                                            disabled={!formData.email || !formData.password} // Prevent submission if fields are empty
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div className="text-muted text-center">
                                        Don't have an Account?{" "}
                                        <Link legacyBehavior href="/choose-role">
                                            <a>Sign up</a>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                            <div className="img-1 d-none d-lg-block">
                                <img
                                    className="shape-1"
                                    src="assets/imgs/page/login-register/img-4.svg"
                                    alt="bugbear"
                                />
                            </div>
                            <div className="img-2">
                                <img src="assets/imgs/page/login-register/img-3.svg" alt="bugbear" />
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer 
                    position="top-right" 
                    autoClose={3000} 
                    hideProgressBar={false} 
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Layout>
        </>
    );
}
