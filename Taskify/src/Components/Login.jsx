import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react";


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        // ✅ Frontend validation
        if (!email || !password) {
            setErrorMessage("All fields are required");
            return;
        }
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log(res.data);

            // Store token
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));


            setErrorMessage(""); // clear error
            // redirect to dashboard
            window.location.href = "/dashboard";

        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Login failed");
        }
    };
    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-brand">
                    Taskify
                </div>

                <div className="login-subtitle">
                    Organize your tasks, boost your productivity
                </div>

                <div className="login-title">
                    Login
                </div>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Enter your email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrorMessage("")
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control custom-input"
                            placeholder="Enter your password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErrorMessage("")
                            }}
                        />
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger mt-2">
                            {errorMessage}
                        </div>
                    )}

                    <button className="login-btn" type="submit">
                        Login
                    </button>

                </form>

                <div className="login-footer">
                    Don’t have an account?
                    <Link to="/signup" className="register-link">
                        Sign Up
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Login