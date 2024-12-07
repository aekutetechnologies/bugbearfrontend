/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";

export default function Reset() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        try {
            const response = await fetch("http://35.154.204.105/api/user/send-reset-password-email/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }), // Send email in the request body
            });

            if (response.ok) {
                const data = await response.json();
                setMessage({ type: "success", text: data.msg || "Reset link sent. Check your email." });
            } else {
                const errorData = await response.json();
                setMessage({ type: "error", text: errorData.error || "Something went wrong." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="pt-100 login-register">
                <div className="container">
                    <div className="row login-register-cover">
                        <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                            <div className="text-center">
                                <p className="font-sm text-brand-2">Forgot Password</p>
                                <h2 className="mt-10 mb-5 text-brand-1">Reset Your Password</h2>
                                <p className="font-sm text-muted mb-30">
                                    Enter email address associated with your account and we'll send you a link to reset your password
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
                                        required
                                        name="email"
                                        placeholder="stevenjob@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-brand-1 hover-up w-100" type="submit" disabled={loading}>
                                        {loading ? "Processing..." : "Continue"}
                                    </button>
                                </div>
                                {message && (
                                    <div
                                        className={`alert mt-20 ${
                                            message.type === "success" ? "alert-success" : "alert-danger"
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                )}
                                <div className="text-muted text-center">
                                    Don't have an Account?{" "}
                                    <Link legacyBehavior href="/choose-role">
                                        <a>Sign up</a>
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <div className="img-1 d-none d-lg-block">
                            <img className="shape-1" src="assets/imgs/page/login-register/img-5.svg" alt="bugbear" />
                        </div>
                        <div className="img-2">
                            <img src="assets/imgs/page/login-register/img-3.svg" alt="bugbear" />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
