/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import {ToastContainer, toast } from 'react-toastify';
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

                // toast.success(data.msg || "Login successful!");

                // Redirect to dashboard or another protected page
                if (data.user_type === 3) {
                    router.push('/dashboard');  // Redirect to dashboard if userType is 3
                    toast.success(data.msg || "Login successful!");
                } else {
                    router.push('/jobs-list');  // Redirect to jobs-list for other userTypes
                    toast.success(data.msg || "Login successful!");
                }
            } else {
                const errorData = await res.json();
                toast.error(errorData.detail || "Login failed");
                setError(errorData.detail || "Login failed");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again later.");
            setError("Something went wrong. Please try again later.");
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
                                    <p className="font-sm text-brand-2">Welcome back! </p>
                                    <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>
                                    <p className="font-sm text-muted mb-30">Access to all features. No credit card required.</p>
                                    {/* <button className="btn social-login hover-up mb-20">
                                        <img src="assets/imgs/template/icons/icon-google.svg" alt="bugbear" />
                                        <strong>Sign in with Google</strong>
                                    </button>
                                    <div className="divider-text-center">
                                        <span>Or continue with</span>
                                    </div> */}
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
                                        <input
                                            className="form-control"
                                            id="input-4"
                                            type="password"
                                            name="password"
                                            placeholder="************"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="login_footer form-group d-flex justify-content-between">
                                        <label className="cb-container">
                                            <input type="checkbox" />
                                            <span className="text-small">Remember me</span>
                                            <span className="checkmark" />
                                        </label>
                                        <Link legacyBehavior href="/page-contact">
                                            <a className="text-muted">Forgot Password</a>
                                        </Link>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-brand-1 hover-up w-100" type="submit">
                                            Login
                                        </button>
                                    </div>
                                    <div className="text-muted text-center">
                                        Don't have an Account?
                                        <Link legacyBehavior href="/choose-role">
                                            <a>Sign up</a>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                            <div className="img-1 d-none d-lg-block">
                                <img className="shape-1" src="assets/imgs/page/login-register/img-4.svg" alt="bugbear" />
                            </div>
                            <div className="img-2">
                                <img src="assets/imgs/page/login-register/img-3.svg" alt="bugbear" />
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

                {/* <div>
                    <button className="bg-blue-300 p-3" onClick={() => toast.success("Clicked")}>click</button>
                </div> */}
            </Layout>
        </>
    );
}
