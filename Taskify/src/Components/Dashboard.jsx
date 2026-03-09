import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Boards from './Boards'
import Popup from './Popup'
import axios from 'axios'

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBoards = boards.filter(board =>
        board.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchBoards = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/boards/user/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setBoards(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleDeleteBoard = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/boards/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            // Remove from UI instantly
            setBoards(prev =>
                prev.filter(board => board.id !== id)
            );

        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <>
            <Navbar />

            <div
                className="min-vh-100 py-5 px-4"
                style={{
                    background: "linear-gradient(to right, #eef2f3, #dfe9f3)"
                }}
            >

                <div className="container">

                    {/* Header Section */}
                    <div
                        className="d-flex justify-content-between align-items-center p-4 mb-4"
                        style={{
                            background: "white",
                            borderRadius: "16px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                        }}
                    >
                        <div>
                            <h3 className="fw-bold mb-1 text-dark">
                                Welcome, {user?.name} 👋
                            </h3>
                            <p className="text-muted mb-0">
                                Manage your boards efficiently
                            </p>
                        </div>

                        <button
                            className="btn px-4 py-2 fw-semibold"
                            style={{
                                background: "linear-gradient(45deg, #667eea, #764ba2)",
                                color: "white",
                                borderRadius: "25px",
                                border: "none",
                                transition: "0.3s",
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#createBoardModal"
                        >
                            + Create Board
                        </button>
                    </div>

                    {/* Search Box */}
                    <div
                        className="p-4 mb-4"
                        style={{
                            background: "white",
                            borderRadius: "16px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                            display: boards.length > 0 ?'block' : 'none'
                        }}
                    >
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="🔍 Search your boards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                borderRadius: "12px"
                            }}
                        />
                    </div>

                    {/* Boards Section */}
                    <div
                        className="p-4"
                        style={{
                            background: "white",
                            borderRadius: "16px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
                        }}
                    >
                        <Boards boards={filteredBoards} onDelete={handleDeleteBoard} />
                    </div>

                </div>

                {/* Popup Modal */}
                <Popup fetchBoards={fetchBoards} />

            </div>
        </>
    )
}

export default Dashboard