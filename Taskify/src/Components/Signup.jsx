import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        // ✅ Frontend validation
        if (!name || !email || !password) {
            setErrorMessage("All fields are required");
            return;
        }
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );


            // After successful signup go to login
            navigate("/");

        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-brand">
                    Taskify
                </div>
                <div className="login-subtitle">
                    Create an account to start managing your tasks
                </div>

                <div className="login-title">
                    Sign Up
                </div>

                <form onSubmit={handleSignup}>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Enter your name"
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrorMessage("");
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Enter your email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorMessage("");
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
                                setPassword(e.target.value);
                                setErrorMessage("");
                            }}
                        />
                    </div>

                    {errorMessage && (
                        <div className="alert alert-danger mt-2">
                            {errorMessage}
                        </div>
                    )}

                    <button className="login-btn" type="submit">
                        Create Account
                    </button>

                </form>

                <div className="login-footer">
                    Already have an account?
                    <Link to="/" className="register-link">
                        Login
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Signup