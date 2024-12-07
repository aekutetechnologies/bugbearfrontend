/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Link from "next/link";

export default function Reset() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { uid, token } = router.query; // Retrieve uid and token from URL query params

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!uid || !token) {
            setMessage({ type: "error", text: "Invalid UID or token." });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/reset-password/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid, // Include uid in the payload
                    token, // Include token in the payload
                    password,
                }),
            });

            if (response.ok) {
                setMessage({ type: "success", text: "Password reset successfully!" });
                setPassword("");
                setConfirmPassword("");
            } else {
                const errorData = await response.json();
                setMessage({ type: "error", text: errorData.detail || "Something went wrong." });
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
                                <p className="font-sm text-brand-2">Reset Password</p>
                                <h2 className="mt-10 mb-5 text-brand-1">Enter Your New Password</h2>
                                <p className="font-sm text-muted mb-30">
                                    Please enter your new password below to reset it.
                                </p>
                            </div>
                            <form className="login-register text-start mt-20" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">
                                        New Password *
                                    </label>
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        required
                                        name="password"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="confirm-password">
                                        Confirm Password *
                                    </label>
                                    <input
                                        className="form-control"
                                        id="confirm-password"
                                        type="password"
                                        required
                                        name="confirmPassword"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-brand-1 hover-up w-100"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Reset Password"}
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
                                <div className="text-muted text-center mt-20">
                                    Remembered your password?{" "}
                                    <Link href="/login">
                                        Sign in
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
