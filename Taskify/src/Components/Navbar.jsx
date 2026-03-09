import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg shadow-lg px-4 py-3"
            style={{
                background: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }}>

            <div className="container-fluid d-flex justify-content-between align-items-center">

                {/* Logo */}
                <div>
                    <h2 className="text-white fw-bold mb-0"
                        style={{ letterSpacing: "1px" }}>
                        Taskify
                    </h2>
                </div>

                {/* Right Section */}
                <div className="d-flex align-items-center gap-4">

                    {/* User Name */}
                    <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-light d-flex justify-content-center align-items-center"
                            style={{ width: "40px", height: "40px", fontWeight: "bold" }}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-white fs-5 fw-semibold">
                            {user?.name}
                        </span>
                    </div>

                    {/* Logout Button */}
                    <button
                        className="btn btn-light px-4 fw-semibold"
                        style={{
                            borderRadius: "20px",
                            transition: "0.3s"
                        }}
                        onClick={handleLogout}
                        onMouseOver={(e) => e.target.style.background = "#ff4d4d"}
                        onMouseOut={(e) => e.target.style.background = "white"}
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar